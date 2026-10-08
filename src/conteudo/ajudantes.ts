import type { ConteudoDoSite } from './mesclar';

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
    /** "@perfil" extraído do link do Instagram; vazio se não houver link. */
    instagramHandle: string;
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

export function isConfigured(valor: string | undefined | null): boolean {
  if (!valor) return false;
  const v = valor.trim();
  return v.length > 0 && !v.startsWith('INSERIR_') && !v.startsWith('[');
}

/** "https://instagram.com/dindago.atelier" → "@dindago.atelier". */
function arrobaDoInstagram(url: string): string {
  if (!isConfigured(url)) return '';
  const perfil = url
    .trim()
    .replace(/^https?:\/\/(www\.)?instagram\.com\//i, '')
    .replace(/[/?#].*$/, '');
  return perfil ? `@${perfil.replace(/^@/, '')}` : 'Instagram';
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
    instagramHandle: arrobaDoInstagram(social.instagram),
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
