import type { ConteudoDoSite } from './mesclar';

/**
 * ============================================================================
 * AJUDANTES DE LINK, LIGADOS AO CONTEÚDO VIVO
 * ----------------------------------------------------------------------------
 * As mesmas funções que antes liam o arquivo estático agora são construídas a
 * partir do conteúdo que está em tela — venha ele da API ou do padrão local.
 * A assinatura de cada uma continua idêntica, então nenhum componente precisou
 * mudar a forma de chamar.
 * ============================================================================
 */

export type AjudantesDoSite = {
  siteConfig: {
    name: string;
    segment: string;
    tagline: string;
    shipping: string;
    whatsapp: string;
    whatsappDisplay: string;
    phone: string;
    email: string;
    instagram: string;
    facebook: string;
    address: string;
    addressNote: string;
  };
  artistConfig: ConteudoDoSite['about']['artist'];
  navLinks: ConteudoDoSite['nav'];
  isConfigured: (valor: string | undefined | null) => boolean;
  buildWhatsAppUrl: (mensagem?: string) => string | null;
  buildMailtoUrl: (assunto?: string) => string | null;
  buildMapsUrl: () => string | null;
  buildMapEmbedUrl: () => string | null;
  resolveCtaHref: (href: string, mensagem?: string) => string;
  formatPrice: (preco: number | null) => string;
};

/**
 * Um campo é considerado pendente enquanto estiver vazio, começar com
 * "INSERIR_" ou for um marcador entre colchetes. Serve para a interface nunca
 * exibir link quebrado nem dado de exemplo.
 */
export function isConfigured(valor: string | undefined | null): boolean {
  if (!valor) return false;
  const v = valor.trim();
  return v.length > 0 && !v.startsWith('INSERIR_') && !v.startsWith('[');
}

export function criarAjudantes(conteudo: ConteudoDoSite): AjudantesDoSite {
  const { company, contact, social, about } = conteudo;

  const siteConfig = {
    name: company.name,
    segment: company.segment,
    tagline: company.slogan,
    shipping: company.shipping,
    whatsapp: contact.whatsapp,
    whatsappDisplay: contact.whatsappDisplay,
    phone: contact.phone,
    email: contact.email,
    instagram: social.instagram,
    facebook: social.facebook,
    address: contact.address,
    addressNote: contact.addressNote,
  };

  const mensagemPadrao = conteudo.whatsappDefaultMessage;

  function buildWhatsAppUrl(mensagem: string = mensagemPadrao): string | null {
    if (!isConfigured(siteConfig.whatsapp)) return null;
    const digitos = siteConfig.whatsapp.replace(/\D/g, '');
    return `https://wa.me/${digitos}?text=${encodeURIComponent(mensagem)}`;
  }

  function buildMailtoUrl(assunto = 'Contato pelo site'): string | null {
    if (!isConfigured(siteConfig.email)) return null;
    return `mailto:${siteConfig.email}?subject=${encodeURIComponent(assunto)}`;
  }

  function buildMapsUrl(): string | null {
    if (!isConfigured(siteConfig.address)) return null;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.address)}`;
  }

  function buildMapEmbedUrl(): string | null {
    if (!isConfigured(siteConfig.address)) return null;
    return `https://www.google.com/maps?q=${encodeURIComponent(siteConfig.address)}&output=embed`;
  }

  /** `"whatsapp"` vira o link do WhatsApp; qualquer outro href passa direto. */
  function resolveCtaHref(href: string, mensagem?: string): string {
    if (href === 'whatsapp') return buildWhatsAppUrl(mensagem) ?? '#contato';
    return href;
  }

  /** Preço nulo vira "Consultar valor" — nunca um número inventado. */
  function formatPrice(preco: number | null): string {
    if (preco === null || preco === undefined) return 'Consultar valor';
    return preco.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    });
  }

  return {
    siteConfig,
    artistConfig: about.artist,
    navLinks: conteudo.nav,
    isConfigured,
    buildWhatsAppUrl,
    buildMailtoUrl,
    buildMapsUrl,
    buildMapEmbedUrl,
    resolveCtaHref,
    formatPrice,
  };
}
