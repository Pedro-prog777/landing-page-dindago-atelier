import { clientData } from '../data/clientData';

/**
 * ============================================================================
 * MESCLA DO CONTEÚDO
 * ----------------------------------------------------------------------------
 * O `clientData` estático continua sendo a base do site. O que vem da API é
 * sobreposto campo a campo — e só quando tem valor.
 *
 * A regra existe para proteger a composição: se o backend estiver fora do ar,
 * ou se um campo ainda não tiver sido preenchido no painel, a landing page
 * continua exibindo o conteúdo padrão em vez de abrir um buraco no layout.
 * ============================================================================
 */

export type ConteudoDoSite = typeof clientData;

/** Considera preenchido apenas o que realmente tem conteúdo. */
function temValor(v: unknown): boolean {
  if (v === null || v === undefined) return false;
  if (typeof v === 'string') return v.trim().length > 0;
  if (Array.isArray(v)) return v.length > 0;
  return true;
}

/** Devolve o valor da API quando preenchido; caso contrário, mantém o padrão. */
function preferir<T>(daApi: unknown, padrao: T): T {
  return temValor(daApi) ? (daApi as T) : padrao;
}

/** Resposta da API pública, com todos os campos possivelmente nulos. */
type RespostaSite = {
  company?: Record<string, unknown>;
  colors?: Record<string, unknown>;
  seo?: Record<string, unknown>;
  hero?: Record<string, unknown> | null;
  about?: Record<string, unknown> | null;
  process?: Record<string, unknown> | null;
  products?: unknown[];
  benefits?: unknown[];
  gallery?: unknown[];
  testimonials?: unknown[];
  contact?: Record<string, unknown>;
  social?: Record<string, unknown>;
};

export function mesclarConteudo(resposta: RespostaSite | null): ConteudoDoSite {
  if (!resposta) return clientData;

  const base = clientData;
  const c = resposta.company ?? {};
  const cor = resposta.colors ?? {};
  const seo = resposta.seo ?? {};
  const hero = resposta.hero ?? {};
  const sobre = resposta.about ?? {};
  const processo = resposta.process ?? {};
  const contato = resposta.contact ?? {};
  const social = resposta.social ?? {};
  const artista = (sobre.artist as Record<string, unknown>) ?? {};

  return {
    ...base,

    company: {
      ...base.company,
      name: preferir(c.name, base.company.name),
      segment: preferir(c.segment, base.company.segment),
      slogan: preferir(c.slogan, base.company.slogan),
      description: preferir(c.description, base.company.description),
      logo: preferir(c.logo, base.company.logo),
      shipping: preferir(c.shipping, base.company.shipping),
    },

    colors: {
      primary: preferir(cor.primary, base.colors.primary),
      secondary: preferir(cor.secondary, base.colors.secondary),
      accent: preferir(cor.accent, base.colors.accent),
      background: preferir(cor.background, base.colors.background),
    },

    seo: {
      title: preferir(seo.title, base.seo.title),
      description: preferir(seo.description, base.seo.description),
      url: preferir(seo.url, base.seo.url),
      ogImage: preferir(seo.ogImage, base.seo.ogImage),
    },

    hero: {
      ...base.hero,
      titleLines: preferir(hero.titleLines, base.hero.titleLines),
      titleHighlight: preferir(hero.titleHighlight, base.hero.titleHighlight),
      subtitle: preferir(hero.subtitle, base.hero.subtitle),
      image: preferir(hero.image, base.hero.image),
      imageAlt: preferir(hero.imageAlt, base.hero.imageAlt),
      imageCaption: preferir(hero.imageCaption, base.hero.imageCaption),
      primaryCta: {
        label: preferir(
          (hero.primaryCta as Record<string, unknown>)?.label,
          base.hero.primaryCta.label,
        ),
        href: preferir(
          (hero.primaryCta as Record<string, unknown>)?.href,
          base.hero.primaryCta.href,
        ),
      },
      secondaryCta: {
        label: preferir(
          (hero.secondaryCta as Record<string, unknown>)?.label,
          base.hero.secondaryCta.label,
        ),
        href: preferir(
          (hero.secondaryCta as Record<string, unknown>)?.href,
          base.hero.secondaryCta.href,
        ),
      },
      colofao: preferir(hero.colofao, base.hero.colofao),
    },

    benefits: preferir(resposta.benefits, base.benefits),

    process: {
      ...base.process,
      eyebrow: preferir(processo.eyebrow, base.process.eyebrow),
      title: preferir(processo.title, base.process.title),
      paragraphs: preferir(processo.paragraphs, base.process.paragraphs),
      materialsTitle: preferir(processo.materialsTitle, base.process.materialsTitle),
      materialsText: preferir(processo.materialsText, base.process.materialsText),
      materials: preferir(processo.materials, base.process.materials),
      image: preferir(processo.image, base.process.image),
      imageAlt: preferir(processo.imageAlt, base.process.imageAlt),
      steps: preferir(processo.steps, base.process.steps),
    },

    products: preferir(resposta.products, base.products),

    gallery: {
      ...base.gallery,
      items: preferir(resposta.gallery, base.gallery.items),
      // As categorias vêm das próprias imagens cadastradas, sem lista fixa.
      categories: temValor(resposta.gallery)
        ? ([
            ...new Set((resposta.gallery as { category: string }[]).map((g) => g.category)),
          ] as never)
        : base.gallery.categories,
    },

    about: {
      ...base.about,
      eyebrow: preferir(sobre.eyebrow, base.about.eyebrow),
      title: preferir(sobre.title, base.about.title),
      intro: preferir(sobre.intro, base.about.intro),
      quote: preferir(sobre.quote, base.about.quote),
      paragraphs: preferir(sobre.paragraphs, base.about.paragraphs),
      ctaLabel: preferir(sobre.ctaLabel, base.about.ctaLabel),
      pillars: preferir(sobre.pillars, base.about.pillars),
      artist: {
        ...base.about.artist,
        name: preferir(artista.name, base.about.artist.name),
        role: preferir(artista.role, base.about.artist.role),
        photo: preferir(artista.photo, base.about.artist.photo),
        photoAlt: preferir(artista.photoAlt, base.about.artist.photoAlt),
      },
    },

    testimonials: preferir(resposta.testimonials, base.testimonials),

    contact: {
      ...base.contact,
      phone: preferir(contato.phone, base.contact.phone),
      whatsapp: preferir(contato.whatsapp, base.contact.whatsapp),
      whatsappDisplay: preferir(contato.whatsappDisplay, base.contact.whatsappDisplay),
      email: preferir(contato.email, base.contact.email),
      address: preferir(contato.address, base.contact.address),
      addressNote: preferir(contato.addressNote, base.contact.addressNote),
    },

    social: {
      instagram: preferir(social.instagram, base.social.instagram),
      facebook: preferir(social.facebook, base.social.facebook),
      linkedin: preferir(social.linkedin, base.social.linkedin),
      youtube: preferir(social.youtube, base.social.youtube),
    },
  } as ConteudoDoSite;
}
