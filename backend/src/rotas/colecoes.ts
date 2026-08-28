import { param } from '../lib/params.js';
import { Router } from 'express';
import type { ZodType } from 'zod';
import { prisma } from '../db.js';
import { ErroApi, criado, ok, semConteudo } from '../lib/respostas.js';
import { assincrono } from '../middleware/tratarErros.js';
import { conferirAcessoAoCliente, exigirLogin } from '../middleware/autenticar.js';
import type { Sessao } from '../lib/token.js';
import { validarCorpo } from '../middleware/validar.js';
import {
  beneficioSchema,
  depoimentoSchema,
  etapaSchema,
  galeriaSchema,
  heroFactSchema,
  pilarSchema,
  produtoSchema,
  redeSocialSchema,
} from '../schemas/index.js';

/**
 * ============================================================================
 * CRUD DAS COLEÇÕES
 * ----------------------------------------------------------------------------
 * Peças, diferenciais, galeria, depoimentos e redes compartilham exatamente a
 * mesma forma: pertencem a um cliente, têm ordem e podem ser desativados. Em
 * vez de repetir cinco arquivos quase idênticos, o roteador é gerado por uma
 * fábrica — o que também garante que a regra de permissão seja a mesma em
 * todos eles.
 *
 * Etapas do processo, fatos da capa e pilares da história seguem a mesma ideia,
 * mas penduram num conteúdo intermediário (processo, hero, sobre) em vez de
 * pendurar direto no cliente.
 * ============================================================================
 */

/** Recorte mínimo do delegate do Prisma que a fábrica precisa. */
type Delegate = {
  findMany: (args: unknown) => Promise<unknown[]>;
  findUnique: (args: unknown) => Promise<unknown>;
  create: (args: unknown) => Promise<unknown>;
  update: (args: unknown) => Promise<unknown>;
  delete: (args: unknown) => Promise<unknown>;
};

const delegates = prisma as unknown as Record<string, Delegate>;

type ConfigColecao = {
  /** Caminho na URL, ex.: "products". */
  caminho: string;
  /** Nome do model no Prisma, ex.: "product". */
  modelo: string;
  /** Nome legível usado nas mensagens de erro. */
  rotulo: string;
  schema: ZodType<Record<string, unknown>>;
};

const colecoesDoCliente: ConfigColecao[] = [
  { caminho: 'products', modelo: 'product', rotulo: 'Peça', schema: produtoSchema },
  { caminho: 'benefits', modelo: 'benefit', rotulo: 'Diferencial', schema: beneficioSchema },
  { caminho: 'gallery', modelo: 'galleryItem', rotulo: 'Imagem', schema: galeriaSchema },
  {
    caminho: 'testimonials',
    modelo: 'testimonial',
    rotulo: 'Depoimento',
    schema: depoimentoSchema,
  },
  { caminho: 'social', modelo: 'socialLink', rotulo: 'Rede social', schema: redeSocialSchema },
];

type ConfigAninhada = ConfigColecao & {
  pai: { modelo: string; campo: string; relacao: string };
};

/** Conteúdos intermediários: a coleção pendura neles, não no cliente. */
const colecoesAninhadas: ConfigAninhada[] = [
  {
    caminho: 'process-steps',
    modelo: 'processStep',
    rotulo: 'Etapa',
    schema: etapaSchema,
    pai: { modelo: 'processContent', campo: 'processId', relacao: 'process' },
  },
  {
    caminho: 'hero-facts',
    modelo: 'heroFact',
    rotulo: 'Ficha técnica',
    schema: heroFactSchema,
    pai: { modelo: 'heroContent', campo: 'heroId', relacao: 'hero' },
  },
  {
    caminho: 'about-pillars',
    modelo: 'aboutPillar',
    rotulo: 'Pilar',
    schema: pilarSchema,
    pai: { modelo: 'aboutContent', campo: 'aboutId', relacao: 'about' },
  },
];

/** Confirma que o cliente existe e que a sessão pode mexer nele. */
async function garantirCliente(clientId: string, sessao: Sessao | undefined) {
  const cliente = await prisma.client.findUnique({ where: { id: clientId } });
  if (!cliente) throw ErroApi.naoEncontrado('Cliente');
  conferirAcessoAoCliente(sessao, clientId);
  return cliente;
}

export const rotasColecoes = Router();

// ----------------------------------------------------------------------------
// Coleções que pendem direto do cliente
// ----------------------------------------------------------------------------
for (const { caminho, modelo, rotulo, schema } of colecoesDoCliente) {
  const delegate = delegates[modelo]!;

  rotasColecoes.get(
    `/clients/:clientId/${caminho}`,
    exigirLogin,
    assincrono(async (req, res) => {
      const clientId = param(req, 'clientId');
      await garantirCliente(clientId, req.sessao);
      const itens = await delegate.findMany({
        where: { clientId },
        orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
      });
      return ok(res, itens);
    }),
  );

  rotasColecoes.post(
    `/clients/:clientId/${caminho}`,
    exigirLogin,
    validarCorpo(schema),
    assincrono(async (req, res) => {
      const clientId = param(req, 'clientId');
      await garantirCliente(clientId, req.sessao);
      const item = await delegate.create({ data: { ...req.body, clientId } });
      return criado(res, item);
    }),
  );

  rotasColecoes.put(
    `/${caminho}/:id`,
    exigirLogin,
    validarCorpo(schema),
    assincrono(async (req, res) => {
      const id = param(req, 'id');
      const atual = (await delegate.findUnique({ where: { id } })) as {
        clientId: string;
      } | null;
      if (!atual) throw ErroApi.naoEncontrado(rotulo);
      conferirAcessoAoCliente(req.sessao, atual.clientId);

      const item = await delegate.update({ where: { id }, data: req.body });
      return ok(res, item);
    }),
  );

  rotasColecoes.delete(
    `/${caminho}/:id`,
    exigirLogin,
    assincrono(async (req, res) => {
      const id = param(req, 'id');
      const atual = (await delegate.findUnique({ where: { id } })) as {
        clientId: string;
      } | null;
      if (!atual) throw ErroApi.naoEncontrado(rotulo);
      conferirAcessoAoCliente(req.sessao, atual.clientId);

      await delegate.delete({ where: { id } });
      return semConteudo(res);
    }),
  );
}

// ----------------------------------------------------------------------------
// Coleções que pendem de um conteúdo intermediário
// ----------------------------------------------------------------------------
for (const { caminho, modelo, rotulo, schema, pai } of colecoesAninhadas) {
  const delegate = delegates[modelo]!;
  const delegatePai = delegates[pai.modelo]!;

  /** Busca o conteúdo intermediário do cliente, criando-o se ainda não existir. */
  async function obterPai(clientId: string) {
    const existente = (await delegatePai.findUnique({ where: { clientId } })) as {
      id: string;
    } | null;
    if (existente) return existente;
    return (await delegatePai.create({ data: { clientId } })) as { id: string };
  }

  rotasColecoes.get(
    `/clients/:clientId/${caminho}`,
    exigirLogin,
    assincrono(async (req, res) => {
      const clientId = param(req, 'clientId');
      await garantirCliente(clientId, req.sessao);
      const conteudoPai = await obterPai(clientId);
      const itens = await delegate.findMany({
        where: { [pai.campo]: conteudoPai.id },
        orderBy: [{ order: 'asc' }],
      });
      return ok(res, itens);
    }),
  );

  rotasColecoes.post(
    `/clients/:clientId/${caminho}`,
    exigirLogin,
    validarCorpo(schema),
    assincrono(async (req, res) => {
      const clientId = param(req, 'clientId');
      await garantirCliente(clientId, req.sessao);
      const conteudoPai = await obterPai(clientId);
      const item = await delegate.create({
        data: { ...req.body, [pai.campo]: conteudoPai.id },
      });
      return criado(res, item);
    }),
  );

  rotasColecoes.put(
    `/${caminho}/:id`,
    exigirLogin,
    validarCorpo(schema),
    assincrono(async (req, res) => {
      const id = param(req, 'id');
      const atual = await delegate.findUnique({
        where: { id },
        include: { [pai.relacao]: true },
      });
      if (!atual) throw ErroApi.naoEncontrado(rotulo);

      const relacao = atual as Record<string, { clientId?: string } | undefined>;
      const clientIdDoPai =
        relacao.process?.clientId ?? relacao.hero?.clientId ?? relacao.about?.clientId;
      if (!clientIdDoPai) throw ErroApi.naoEncontrado(rotulo);
      conferirAcessoAoCliente(req.sessao, clientIdDoPai);

      const item = await delegate.update({ where: { id }, data: req.body });
      return ok(res, item);
    }),
  );

  rotasColecoes.delete(
    `/${caminho}/:id`,
    exigirLogin,
    assincrono(async (req, res) => {
      const id = param(req, 'id');
      const atual = await delegate.findUnique({
        where: { id },
        include: { [pai.relacao]: true },
      });
      if (!atual) throw ErroApi.naoEncontrado(rotulo);

      const relacao = atual as Record<string, { clientId?: string } | undefined>;
      const clientIdDoPai =
        relacao.process?.clientId ?? relacao.hero?.clientId ?? relacao.about?.clientId;
      if (!clientIdDoPai) throw ErroApi.naoEncontrado(rotulo);
      conferirAcessoAoCliente(req.sessao, clientIdDoPai);

      await delegate.delete({ where: { id } });
      return semConteudo(res);
    }),
  );
}
