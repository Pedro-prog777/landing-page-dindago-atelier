/**
 * ============================================================================
 * ACESSO AOS DADOS DO CLIENTE + AJUDANTES DE LINK
 * ----------------------------------------------------------------------------
 * ⚠️ NÃO EDITE DADOS AQUI.
 * Todo o conteúdo do cliente vive em `src/data/clientData.ts`.
 *
 * Este arquivo apenas:
 *   1. expõe recortes do clientData com nomes curtos para os componentes;
 *   2. monta os links (WhatsApp, e-mail, mapa) a partir desses dados;
 *   3. protege a interface contra campos ainda não preenchidos.
 * ============================================================================
 */

import { clientData } from '../data/clientData';

export type { NavLink } from '../data/clientData';

/** Identidade + contato reunidos, para os componentes não navegarem fundo demais. */
export const siteConfig = {
  name: clientData.company.name,
  segment: clientData.company.segment,
  tagline: clientData.company.slogan,
  shipping: clientData.company.shipping,

  whatsapp: clientData.contact.whatsapp,
  whatsappDisplay: clientData.contact.whatsappDisplay,
  phone: clientData.contact.phone,
  email: clientData.contact.email,

  instagram: clientData.social.instagram,
  facebook: clientData.social.facebook,

  address: clientData.contact.address,
  addressNote: clientData.contact.addressNote,
};

/** Dados da artista, usados na seção "Nossa História". */
export const artistConfig = clientData.about.artist;

/** Itens do menu principal. */
export const navLinks = clientData.nav;

/** Mensagem padrão do botão flutuante de WhatsApp. */
export const WHATSAPP_DEFAULT_MESSAGE = clientData.whatsappDefaultMessage;

/**
 * Um campo é considerado pendente enquanto estiver vazio ou começar com
 * "INSERIR_". Serve para a interface nunca exibir link quebrado ou dado falso.
 */
export function isConfigured(value: string | undefined | null): boolean {
  if (!value) return false;
  return value.trim().length > 0 && !value.startsWith('INSERIR_') && !value.startsWith('[');
}

/** Link do WhatsApp com a mensagem pré-preenchida. `null` se não configurado. */
export function buildWhatsAppUrl(message: string = WHATSAPP_DEFAULT_MESSAGE): string | null {
  if (!isConfigured(siteConfig.whatsapp)) return null;
  const digits = siteConfig.whatsapp.replace(/\D/g, '');
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

/** Link de e-mail com assunto padrão. `null` se não configurado. */
export function buildMailtoUrl(subject = 'Contato pelo site'): string | null {
  if (!isConfigured(siteConfig.email)) return null;
  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}`;
}

/** Link do Google Maps para o endereço configurado. */
export function buildMapsUrl(): string | null {
  if (!isConfigured(siteConfig.address)) return null;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.address)}`;
}

/** URL do mapa incorporado (não exige chave de API). */
export function buildMapEmbedUrl(): string | null {
  if (!isConfigured(siteConfig.address)) return null;
  return `https://www.google.com/maps?q=${encodeURIComponent(siteConfig.address)}&output=embed`;
}

/** Destino de um CTA: `"whatsapp"` vira link do WhatsApp; o resto passa direto. */
export function resolveCtaHref(href: string, message?: string): string {
  if (href === 'whatsapp') return buildWhatsAppUrl(message) ?? '#contato';
  return href;
}

/** Formata o preço respeitando a regra de não inventar valores. */
export function formatPrice(price: number | null): string {
  if (price === null) return 'Consultar valor';
  return price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });
}
