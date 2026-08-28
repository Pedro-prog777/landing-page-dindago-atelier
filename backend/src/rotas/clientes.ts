import { param, query } from '../lib/params.js';
import { Router } from 'express';
import { prisma } from '../db.js';
import { ErroApi, criado, ok, semConteudo } from '../lib/respostas.js';
import {
  conferirAcessoAoCliente,
  exigirDono,
  exigirLogin,
} from '../middleware/autenticar.js';
import { assincrono } from '../middleware/tratarErros.js';
import { validarCorpo } from '../middleware/validar.js';
import {
  clienteParcialSchema,
  clienteSchema,
  configuracoesSchema,
  contatoInfoSchema,
  heroSchema,
  processoSchema,
  sobreSchema,
  statusMensagemSchema,
} from '../schemas/index.js';

/**
 * ============================================================================
 * CLIENTES E CONTEÚDO — área autenticada
 * ----------------------------------------------------------------------------
 * Criar e apagar cliente é exclusivo do perfil OWNER. Um EDITOR enxerga e edita
 * apenas o cliente ao qual está vinculado — a checagem fica em
 * `conferirAcessoAoCliente`, chamada em toda rota que recebe um `clientId`.
 * ============================================================================
 */

export const rotasClientes = Router();

// ----------------------------------------------------------------------------
// Cliente
// ----------------------------------------------------------------------------

/** GET /api/clients — o EDITOR só vê o próprio. */
rotasClientes.get(
  '/clients',
  exigirLogin,
  assincrono(async (req, res) => {
    const sessao = req.sessao!;
    const clientes = await prisma.client.findMany({
      where: sessao.role === 'OWNER' ? {} : { id: sessao.clientId ?? '__nenhum__' },
      orderBy: { name: 'asc' },
      select: {
        id: true,
        slug: true,
        name: true,
        segment: true,
        active: true,
        updatedAt: true,
        _count: { select: { products: true, messages: true } },
      },
    });
    return ok(res, clientes);
  }),
);

/** GET /api/clients/:id — cliente com todo o conteúdo, para o painel. */
rotasClientes.get(
  '/clients/:id',
  exigirLogin,
  assincrono(async (req, res) => {
    const id = param(req, 'id');
    conferirAcessoAoCliente(req.sessao, id);

    const cliente = await prisma.client.findUnique({
      where: { id },
      include: {
        settings: true,
        contactInfo: true,
        hero: { include: { facts: { orderBy: { order: 'asc' } } } },
        about: { include: { pillars: { orderBy: { order: 'asc' } } } },
        process: { include: { steps: { orderBy: { order: 'asc' } } } },
        _count: { select: { products: true, galleryItems: true, messages: true } },
      },
    });
    if (!cliente) throw ErroApi.naoEncontrado('Cliente');
    return ok(res, cliente);
  }),
);

/** POST /api/clients — cria o cliente já com os blocos de conteúdo vazios. */
rotasClientes.post(
  '/clients',
  exigirLogin,
  exigirDono,
  validarCorpo(clienteSchema),
  assincrono(async (req, res) => {
    const dados = req.body as Record<string, unknown>;

    const cliente = await prisma.client.create({
      data: {
        ...dados,
        // Criar os blocos junto evita telas quebradas no painel logo depois.
        settings: { create: {} },
        contactInfo: { create: {} },
        hero: { create: { titleLine1: String(dados.name ?? 'Nova landing page') } },
        about: { create: {} },
        process: { create: {} },
      } as never,
      include: { settings: true, contactInfo: true, hero: true },
    });

    return criado(res, cliente);
  }),
);

/** PUT /api/clients/:id */
rotasClientes.put(
  '/clients/:id',
  exigirLogin,
  validarCorpo(clienteParcialSchema),
  assincrono(async (req, res) => {
    const id = param(req, 'id');
    conferirAcessoAoCliente(req.sessao, id);
    const cliente = await prisma.client.update({ where: { id }, data: req.body });
    return ok(res, cliente);
  }),
);

/** DELETE /api/clients/:id — leva junto todo o conteúdo (cascade no schema). */
rotasClientes.delete(
  '/clients/:id',
  exigirLogin,
  exigirDono,
  assincrono(async (req, res) => {
    await prisma.client.delete({ where: { id: param(req, 'id') } });
    return semConteudo(res);
  }),
);

// ----------------------------------------------------------------------------
// Blocos de conteúdo — sempre upsert: o painel salva sem se preocupar se o
// registro já existia.
// ----------------------------------------------------------------------------

const blocos = [
  { caminho: 'settings', modelo: 'clientSettings', schema: configuracoesSchema },
  { caminho: 'contact-info', modelo: 'contactInfo', schema: contatoInfoSchema },
  { caminho: 'hero', modelo: 'heroContent', schema: heroSchema },
  { caminho: 'about', modelo: 'aboutContent', schema: sobreSchema },
  { caminho: 'process', modelo: 'processContent', schema: processoSchema },
] as const;

type DelegateBloco = {
  upsert: (args: unknown) => Promise<unknown>;
};

for (const { caminho, modelo, schema } of blocos) {
  const delegate = (prisma as unknown as Record<string, DelegateBloco>)[modelo]!;

  rotasClientes.put(
    `/clients/:id/${caminho}`,
    exigirLogin,
    validarCorpo(schema as never),
    assincrono(async (req, res) => {
      const clientId = param(req, 'id');
      conferirAcessoAoCliente(req.sessao, clientId);

      const existe = await prisma.client.count({ where: { id: clientId } });
      if (!existe) throw ErroApi.naoEncontrado('Cliente');

      const registro = await delegate.upsert({
        where: { clientId },
        create: { ...req.body, clientId },
        update: req.body,
      });
      return ok(res, registro);
    }),
  );
}

// ----------------------------------------------------------------------------
// Mensagens recebidas pelo formulário
// ----------------------------------------------------------------------------

/** GET /api/clients/:id/messages */
rotasClientes.get(
  '/clients/:id/messages',
  exigirLogin,
  assincrono(async (req, res) => {
    const clientId = param(req, 'id');
    conferirAcessoAoCliente(req.sessao, clientId);

    const pagina = Math.max(1, Number(req.query.page ?? 1));
    const porPagina = Math.min(100, Math.max(1, Number(req.query.perPage ?? 20)));
    const status = query(req, 'status');

    const where = { clientId, ...(status ? { status } : {}) };

    const [itens, total] = await Promise.all([
      prisma.contactMessage.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (pagina - 1) * porPagina,
        take: porPagina,
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          subject: true,
          message: true,
          status: true,
          createdAt: true,
        },
      }),
      prisma.contactMessage.count({ where }),
    ]);

    return ok(res, { itens, total, pagina, porPagina });
  }),
);

/** PUT /api/messages/:id/status */
rotasClientes.put(
  '/messages/:id/status',
  exigirLogin,
  validarCorpo(statusMensagemSchema),
  assincrono(async (req, res) => {
    const id = param(req, 'id');
    const mensagem = await prisma.contactMessage.findUnique({
      where: { id },
      select: { clientId: true },
    });
    if (!mensagem) throw ErroApi.naoEncontrado('Mensagem');
    conferirAcessoAoCliente(req.sessao, mensagem.clientId);

    const atualizada = await prisma.contactMessage.update({
      where: { id },
      data: { status: (req.body as { status: string }).status },
    });
    return ok(res, atualizada);
  }),
);

/** DELETE /api/messages/:id */
rotasClientes.delete(
  '/messages/:id',
  exigirLogin,
  assincrono(async (req, res) => {
    const id = param(req, 'id');
    const mensagem = await prisma.contactMessage.findUnique({
      where: { id },
      select: { clientId: true },
    });
    if (!mensagem) throw ErroApi.naoEncontrado('Mensagem');
    conferirAcessoAoCliente(req.sessao, mensagem.clientId);

    await prisma.contactMessage.delete({ where: { id } });
    return semConteudo(res);
  }),
);
