/**
 * ============================================================================
 * CONFIGURAÇÃO CENTRAL DO SITE — DINDAGÓ ATELIER
 * ----------------------------------------------------------------------------
 * Todos os dados comerciais ficam AQUI. Nenhum componente deve ter telefone,
 * e-mail, endereço ou URL escritos diretamente no código.
 *
 * Para colocar o site no ar, substitua os valores marcados com "INSERIR_".
 * Os campos ainda não preenchidos são detectados automaticamente e a interface
 * se adapta (o link vira texto, o mapa vira um aviso, etc.).
 * ============================================================================
 */

/** Número do WhatsApp no formato internacional, apenas dígitos. Ex.: "5581999999999" */
export const WHATSAPP_NUMBER = 'INSERIR_NUMERO';

/** Endereço completo do atelier. Ex.: "Rua Exemplo, 100 - Bairro, Cidade - UF" */
export const ATELIER_ADDRESS = 'INSERIR_ENDERECO';

export const siteConfig = {
  name: 'Dindagó Atelier',
  segment: 'Artesanato autoral em papel-machê',
  tagline: 'Arte que nasce da cultura popular e das mãos que transformam.',
  shipping: 'Frete para todo o Brasil',

  whatsapp: WHATSAPP_NUMBER,
  /** Como o telefone aparece na tela. Ex.: "(81) 99999-9999" */
  whatsappDisplay: 'INSERIR_NUMERO',

  email: 'INSERIR_EMAIL',
  instagram: 'INSERIR_INSTAGRAM',
  facebook: 'INSERIR_FACEBOOK',

  address: ATELIER_ADDRESS,
  /** Complemento opcional: horário de visitação, "atendimento com hora marcada", etc. */
  addressNote: 'Visitas ao atelier com agendamento prévio.',
} as const;

/**
 * Dados da artesã. Preencha o nome real e coloque a fotografia em
 * `public/images/artist/artesa.jpg` (de preferência trabalhando em uma peça).
 */
export const artistConfig = {
  name: 'INSERIR_NOME_DA_ARTESA',
  role: 'Artesã e criadora do Dindagó Atelier',
  photo: '/images/artist/artesa.jpg',
  photoAlt: 'Artesã do Dindagó Atelier trabalhando em uma peça de papel-machê',
} as const;

/** Mensagem que já vem escrita ao abrir o WhatsApp pelo botão flutuante. */
export const WHATSAPP_DEFAULT_MESSAGE =
  'Olá! Conheci o Dindagó Atelier pelo site e gostaria de saber mais sobre as peças.';

/**
 * Um campo é considerado pendente enquanto ainda estiver com o texto "INSERIR_".
 * Serve para a interface nunca exibir um link quebrado ou um dado inventado.
 */
export function isConfigured(value: string): boolean {
  return value.trim().length > 0 && !value.startsWith('INSERIR_');
}

/** Monta o link do WhatsApp com a mensagem pré-preenchida. */
export function buildWhatsAppUrl(message: string = WHATSAPP_DEFAULT_MESSAGE): string | null {
  if (!isConfigured(siteConfig.whatsapp)) return null;
  const digits = siteConfig.whatsapp.replace(/\D/g, '');
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

/** Link de e-mail com assunto padrão. */
export function buildMailtoUrl(subject = 'Contato pelo site'): string | null {
  if (!isConfigured(siteConfig.email)) return null;
  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}`;
}

/** URL do Google Maps para o endereço configurado. */
export function buildMapsUrl(): string | null {
  if (!isConfigured(siteConfig.address)) return null;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.address)}`;
}

/** URL do iframe de mapa incorporado (não exige chave de API). */
export function buildMapEmbedUrl(): string | null {
  if (!isConfigured(siteConfig.address)) return null;
  return `https://www.google.com/maps?q=${encodeURIComponent(siteConfig.address)}&output=embed`;
}

export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: 'Início', href: '#inicio' },
  { label: 'Artesanato', href: '#processo' },
  { label: 'Coleções', href: '#pecas' },
  { label: 'Nossa História', href: '#historia' },
  { label: 'Encomendas', href: '#encomendas' },
  { label: 'Contato', href: '#contato' },
];
