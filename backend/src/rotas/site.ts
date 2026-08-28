import { param } from '../lib/params.js';
import { Router } from 'express';
import { prisma } from '../db.js';
import { ErroApi, criado, ok } from '../lib/respostas.js';
import { limiteContato } from '../middleware/limitarTaxa.js';
import { assincrono } from '../middleware/tratarErros.js';
import { validarCorpo } from '../middleware/validar.js';
import { mensagemContatoSchema } from '../schemas/index.js';

/**
 * ============================================================================
 * API PÚBLICA
 * ----------------------------------------------------------------------------
 * Duas rotas apenas: ler o conteúdo de um site e receber uma mensagem do
 * formulário. Nada aqui exige sessão, então tudo que é devolvido passa por uma
 * seleção explícita de campos — o cliente nunca recebe hash de senha, e-mail de
 * quem escreveu para o atelier, IP ou registro desativado.
 * ============================================================================
 */

export const rotasSite = Router();

/** Quebra um texto em parágrafos separados por linha em branco. */
function paragrafos(texto: string | null): string[] {
  if (!texto) return [];
  return texto
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

/** Quebra um texto em itens, um por linha. */
function linhas(texto: string | null): string[] {
  if (!texto) return [];
  return texto
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
}

/**
 * GET /api/site/:slug
 *
 * Devolve o conteúdo inteiro de uma landing page numa única resposta. É uma
 * requisição só para a página toda: mais simples de consumir, mais fácil de
 * colocar em cache e sem cascata de chamadas no carregamento.
 */
rotasSite.get(
  '/site/:slug',
  assincrono(async (req, res) => {
    const slug = param(req, 'slug');

    const cliente = await prisma.client.findFirst({
      where: { slug, active: true },
      include: {
        settings: true,
        contactInfo: true,
        hero: { include: { facts: { orderBy: { order: 'asc' } } } },
        about: { include: { pillars: { orderBy: { order: 'asc' } } } },
        process: {
          include: {
            steps: { where: { active: true }, orderBy: { order: 'asc' } },
          },
        },
        products: { where: { active: true }, orderBy: [{ order: 'asc' }, { name: 'asc' }] },
        benefits: { where: { active: true }, orderBy: { order: 'asc' } },
        galleryItems: { where: { active: true }, orderBy: { order: 'asc' } },
        testimonials: { where: { active: true }, orderBy: { order: 'asc' } },
        socialLinks: { where: { active: true }, orderBy: { order: 'asc' } },
      },
    });

    if (!cliente) throw ErroApi.naoEncontrado('Site');

    const redes = Object.fromEntries(cliente.socialLinks.map((r) => [r.network, r.url]));

    return ok(res, {
      company: {
        slug: cliente.slug,
        name: cliente.name,
        segment: cliente.segment,
        slogan: cliente.slogan,
        description: cliente.description,
        logo: cliente.logoUrl,
        shipping: cliente.settings?.shippingNote ?? null,
      },
      colors: {
        primary: cliente.settings?.colorPrimary ?? null,
        secondary: cliente.settings?.colorSecondary ?? null,
        accent: cliente.settings?.colorAccent ?? null,
        background: cliente.settings?.colorBackground ?? null,
      },
      seo: {
        title: cliente.settings?.seoTitle ?? null,
        description: cliente.settings?.seoDescription ?? null,
        url: cliente.settings?.seoUrl ?? null,
        ogImage: cliente.settings?.seoOgImage ?? null,
      },
      hero: cliente.hero
        ? {
            titleLines: [cliente.hero.titleLine1, cliente.hero.titleLine2].filter(
              (l): l is string => Boolean(l),
            ),
            titleHighlight: cliente.hero.titleHighlight,
            subtitle: cliente.hero.subtitle,
            image: cliente.hero.imageUrl,
            imageAlt: cliente.hero.imageAlt,
            imageCaption: cliente.hero.imageCaption,
            primaryCta: {
              label: cliente.hero.primaryCtaLabel,
              href: cliente.hero.primaryCtaHref,
            },
            secondaryCta: {
              label: cliente.hero.secondaryCtaLabel,
              href: cliente.hero.secondaryCtaHref,
            },
            colofao: cliente.hero.facts.map((f) => ({ rotulo: f.label, valor: f.value })),
          }
        : null,
      about: cliente.about
        ? {
            eyebrow: cliente.about.eyebrow,
            title: cliente.about.title,
            intro: cliente.about.intro,
            quote: cliente.about.quote,
            paragraphs: paragrafos(cliente.about.body),
            ctaLabel: cliente.about.ctaLabel,
            pillars: cliente.about.pillars.map((p) => ({ title: p.title, text: p.text })),
            artist: {
              name: cliente.about.artistName,
              role: cliente.about.artistRole,
              photo: cliente.about.artistPhotoUrl,
              photoAlt: cliente.about.artistPhotoAlt,
            },
          }
        : null,
      process: cliente.process
        ? {
            eyebrow: cliente.process.eyebrow,
            title: cliente.process.title,
            paragraphs: paragrafos(cliente.process.body),
            materialsTitle: cliente.process.materialsTitle,
            materialsText: cliente.process.materialsText,
            materials: linhas(cliente.process.materials),
            image: cliente.process.imageUrl,
            imageAlt: cliente.process.imageAlt,
            steps: cliente.process.steps.map((e) => ({ name: e.name, detail: e.detail })),
          }
        : null,
      products: cliente.products.map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        category: p.category,
        description: p.description,
        story: p.story,
        price: p.price,
        image: p.imageUrl,
        imageAlt: p.imageAlt,
        badge: p.badge,
        featured: p.featured,
      })),
      benefits: cliente.benefits.map((b) => ({
        icon: b.icon,
        title: b.title,
        description: b.description,
      })),
      gallery: cliente.galleryItems.map((g) => ({
        id: g.id,
        category: g.category,
        src: g.imageUrl,
        alt: g.alt,
      })),
      testimonials: cliente.testimonials.map((d) => ({
        id: d.id,
        name: d.name,
        role: d.role,
        text: d.text,
      })),
      contact: {
        phone: cliente.contactInfo?.phone ?? null,
        whatsapp: cliente.contactInfo?.whatsapp ?? null,
        whatsappDisplay: cliente.contactInfo?.whatsappDisplay ?? null,
        email: cliente.contactInfo?.email ?? null,
        address: cliente.contactInfo?.address ?? null,
        addressNote: cliente.contactInfo?.addressNote ?? null,
      },
      social: {
        instagram: redes.instagram ?? null,
        facebook: redes.facebook ?? null,
        linkedin: redes.linkedin ?? null,
        youtube: redes.youtube ?? null,
      },
    });
  }),
);

/**
 * POST /api/site/:slug/contact
 *
 * Grava a mensagem do formulário. O campo-armadilha `website` é invisível para
 * humanos: se vier preenchido, respondemos sucesso e descartamos, para o robô
 * não perceber que foi barrado.
 */
rotasSite.post(
  '/site/:slug/contact',
  limiteContato,
  validarCorpo(mensagemContatoSchema),
  assincrono(async (req, res) => {
    const slug = param(req, 'slug');
    const dados = req.body as {
      name: string;
      email: string;
      phone: string | null;
      subject: string | null;
      message: string;
      website?: string;
    };

    const cliente = await prisma.client.findFirst({
      where: { slug, active: true },
      select: { id: true },
    });
    if (!cliente) throw ErroApi.naoEncontrado('Site');

    if (dados.website) {
      return criado(res, { message: 'Mensagem recebida.' });
    }

    await prisma.contactMessage.create({
      data: {
        clientId: cliente.id,
        name: dados.name,
        email: dados.email,
        phone: dados.phone,
        subject: dados.subject,
        message: dados.message,
        ip: req.ip ?? null,
        userAgent: req.get('user-agent')?.slice(0, 300) ?? null,
      },
    });

    return criado(res, {
      message: 'Mensagem recebida. O atelier responde em breve.',
    });
  }),
);
