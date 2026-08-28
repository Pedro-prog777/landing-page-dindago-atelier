import { z } from 'zod';

/**
 * ============================================================================
 * VALIDAÇÃO DE ENTRADA
 * ----------------------------------------------------------------------------
 * Nada que chega do frontend é gravado sem passar por aqui. Os limites de
 * tamanho existem tanto para proteger o banco quanto para manter a composição
 * da landing page: um título de 500 caracteres quebraria o layout editorial.
 * ============================================================================
 */

const texto = (max: number) => z.string().trim().max(max);
const textoObrigatorio = (max: number, campo: string) =>
  z.string().trim().min(1, `${campo} é obrigatório.`).max(max, `${campo} é longo demais.`);

/** Aceita string vazia como "não preenchido", virando null no banco. */
const opcional = (max: number) =>
  texto(max)
    .optional()
    .transform((v) => (v === '' ? null : (v ?? null)));

const urlOpcional = z
  .string()
  .trim()
  .max(500)
  .optional()
  .transform((v) => (v === '' ? null : (v ?? null)))
  .refine(
    (v) => v === null || v === undefined || /^(https?:\/\/|\/)/.test(v),
    'Informe uma URL http(s) ou um caminho começando com "/".',
  );

const corHex = z
  .string()
  .trim()
  .regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, 'Use uma cor no formato #a1b2c3.');

// ============================================================================
// AUTENTICAÇÃO
// ============================================================================

export const loginSchema = z.object({
  email: z.email('Informe um e-mail válido.').trim().toLowerCase(),
  password: z.string().min(8, 'A senha precisa de pelo menos 8 caracteres.').max(200),
});

export const trocarSenhaSchema = z.object({
  senhaAtual: z.string().min(1, 'Informe a senha atual.').max(200),
  novaSenha: z.string().min(8, 'A nova senha precisa de pelo menos 8 caracteres.').max(200),
});

// ============================================================================
// CLIENTE
// ============================================================================

export const clienteSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(2, 'O identificador precisa de pelo menos 2 caracteres.')
    .max(60)
    .regex(/^[a-z0-9-]+$/, 'Use apenas letras minúsculas, números e hífen.'),
  name: textoObrigatorio(120, 'O nome'),
  segment: opcional(160),
  slogan: opcional(240),
  description: opcional(600),
  logoUrl: urlOpcional,
  active: z.boolean().default(true),
});

export const clienteParcialSchema = clienteSchema.partial();

export const configuracoesSchema = z.object({
  colorPrimary: corHex,
  colorSecondary: corHex,
  colorAccent: corHex,
  colorBackground: corHex,
  seoTitle: opcional(70),
  seoDescription: opcional(180),
  seoUrl: urlOpcional,
  seoOgImage: urlOpcional,
  shippingNote: opcional(80),
});

export const contatoInfoSchema = z.object({
  phone: opcional(40),
  whatsapp: opcional(20),
  whatsappDisplay: opcional(40),
  email: z
    .string()
    .trim()
    .max(160)
    .optional()
    .transform((v) => (v === '' ? null : (v ?? null)))
    .refine((v) => v === null || z.email().safeParse(v).success, 'Informe um e-mail válido.'),
  address: opcional(240),
  addressNote: opcional(160),
});

// ============================================================================
// SEÇÕES
// ============================================================================

export const heroSchema = z.object({
  titleLine1: textoObrigatorio(80, 'A primeira linha do título'),
  titleLine2: opcional(80),
  titleHighlight: opcional(60),
  subtitle: opcional(300),
  imageUrl: urlOpcional,
  imageAlt: opcional(240),
  imageCaption: opcional(160),
  primaryCtaLabel: opcional(40),
  primaryCtaHref: opcional(200),
  secondaryCtaLabel: opcional(40),
  secondaryCtaHref: opcional(200),
});

export const heroFactSchema = z.object({
  label: textoObrigatorio(30, 'O rótulo'),
  value: textoObrigatorio(40, 'O valor'),
  order: z.coerce.number().int().min(0).default(0),
});

export const sobreSchema = z.object({
  eyebrow: opcional(60),
  title: opcional(160),
  intro: opcional(600),
  quote: opcional(400),
  body: opcional(4000),
  ctaLabel: opcional(40),
  artistName: opcional(120),
  artistRole: opcional(120),
  artistPhotoUrl: urlOpcional,
  artistPhotoAlt: opcional(240),
});

export const pilarSchema = z.object({
  title: textoObrigatorio(60, 'O título'),
  text: textoObrigatorio(300, 'O texto'),
  order: z.coerce.number().int().min(0).default(0),
});

export const processoSchema = z.object({
  eyebrow: opcional(60),
  title: opcional(120),
  body: opcional(4000),
  materialsTitle: opcional(80),
  materialsText: opcional(600),
  materials: opcional(600),
  imageUrl: urlOpcional,
  imageAlt: opcional(240),
});

export const etapaSchema = z.object({
  name: textoObrigatorio(60, 'O nome da etapa'),
  detail: opcional(300),
  order: z.coerce.number().int().min(0).default(0),
  active: z.boolean().default(true),
});

// ============================================================================
// COLEÇÕES
// ============================================================================

export const produtoSchema = z.object({
  name: textoObrigatorio(120, 'O nome da peça'),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(140)
    .regex(/^[a-z0-9-]+$/, 'Use apenas letras minúsculas, números e hífen.'),
  category: opcional(80),
  description: opcional(400),
  story: opcional(2000),
  /**
   * `null` é intencional: o atelier pode trabalhar só com encomenda, e a
   * interface exibe "Consultar valor" em vez de um preço inventado.
   */
  price: z
    /*
     * `z.null()` precisa vir PRIMEIRO: a união testa na ordem, e
     * `z.coerce.number()` converteria null em 0 — a peça passaria a exibir
     * "R$ 0,00" onde deveria dizer "Consultar valor".
     */
    .union([z.null(), z.coerce.number().nonnegative('O preço não pode ser negativo.')])
    .optional()
    .transform((v) => (v === undefined ? null : v)),
  imageUrl: urlOpcional,
  imageAlt: opcional(240),
  badge: opcional(40),
  featured: z.boolean().default(false),
  order: z.coerce.number().int().min(0).default(0),
  active: z.boolean().default(true),
});

export const beneficioSchema = z.object({
  icon: z.enum(['maos', 'folha', 'sol', 'cacto', 'presente', 'flor', 'passaro']).default('sol'),
  title: textoObrigatorio(60, 'O título'),
  description: opcional(300),
  order: z.coerce.number().int().min(0).default(0),
  active: z.boolean().default(true),
});

export const galeriaSchema = z.object({
  category: textoObrigatorio(40, 'A categoria'),
  imageUrl: z.string().trim().min(1, 'Informe a imagem.').max(500),
  alt: textoObrigatorio(240, 'A descrição da imagem'),
  order: z.coerce.number().int().min(0).default(0),
  active: z.boolean().default(true),
});

export const depoimentoSchema = z.object({
  name: textoObrigatorio(120, 'O nome'),
  role: opcional(120),
  text: textoObrigatorio(600, 'O depoimento'),
  order: z.coerce.number().int().min(0).default(0),
  active: z.boolean().default(true),
});

export const redeSocialSchema = z.object({
  network: z.enum(['instagram', 'facebook', 'whatsapp', 'linkedin', 'youtube']),
  url: z.url('Informe uma URL válida.').max(500),
  order: z.coerce.number().int().min(0).default(0),
  active: z.boolean().default(true),
});

// ============================================================================
// FORMULÁRIO PÚBLICO
// ============================================================================

export const mensagemContatoSchema = z.object({
  name: textoObrigatorio(120, 'O nome'),
  email: z.email('Informe um e-mail válido.').trim().toLowerCase().max(160),
  phone: opcional(40),
  subject: opcional(120),
  message: z
    .string()
    .trim()
    .min(10, 'Escreva um pouco mais para o atelier entender seu pedido.')
    .max(3000, 'A mensagem é longa demais.'),
  /**
   * Campo-armadilha: fica escondido no formulário, então só um robô preenche.
   *
   * Aceita qualquer texto de propósito — quem decide o que fazer é a rota, que
   * responde sucesso e descarta. Rejeitar aqui devolveria um erro citando o
   * campo "website", ensinando o robô exatamente qual deixar em branco.
   */
  website: z.string().max(500).optional(),
});

export const statusMensagemSchema = z.object({
  status: z.enum(['novo', 'lido', 'respondido', 'arquivado']),
});
