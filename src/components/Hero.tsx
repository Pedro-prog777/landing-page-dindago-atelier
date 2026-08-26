import { ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from './ui/Button';
import { Reveal } from './ui/Reveal';
import { SmartImage } from './ui/SmartImage';
import { Birds, Cactus, SunRays, TornEdge } from './ui/Decorations';
import { clientData } from '../data/clientData';
import { resolveCtaHref } from '../config/site';

export function Hero() {
  const { hero } = clientData;
  const hrefPrimario = resolveCtaHref(hero.primaryCta.href);
  const hrefSecundario = resolveCtaHref(
    hero.secondaryCta.href,
    `Olá! Vim pelo site do ${clientData.company.name} e gostaria de conhecer as peças disponíveis.`,
  );
  const secundarioExterno = hrefSecundario.startsWith('http');

  return (
    <section
      id="inicio"
      aria-labelledby="hero-titulo"
      className="relative overflow-hidden bg-linear-to-b from-areia via-areia to-bege/70 pt-28 pb-0 sm:pt-32 lg:pt-40"
    >
      {/* Camadas decorativas — sol, pássaros, cactos e brilhos de fundo */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -right-24 size-104 rounded-full bg-bege/70 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 size-88 rounded-full bg-ocre/10 blur-3xl" />
        <SunRays className="absolute top-24 left-4 w-16 text-ocre/70 sm:top-28 sm:left-10 sm:w-20 lg:left-16 lg:w-24" />
        <Birds className="absolute top-32 right-8 w-16 text-barro/40 sm:right-24 sm:w-20 lg:right-1/3 lg:w-24" />
        <Cactus className="absolute bottom-24 left-2 w-10 text-verde/50 sm:w-14 lg:bottom-32 lg:w-16" />
        <Cactus className="absolute right-3 bottom-16 hidden w-8 text-verde/35 lg:block" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-10 px-4 pb-16 sm:px-6 lg:flex-row lg:gap-16 lg:px-8 lg:pb-24">
        {/* Texto — segundo no mobile, primeiro no desktop */}
        <div className="order-2 w-full max-w-2xl lg:order-1 lg:w-[52%]">
          <Reveal>
            <p className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-terracota/25 bg-creme/70 px-4 py-2 font-sans text-[0.65rem] font-semibold tracking-[0.24em] text-terracota uppercase">
              {clientData.company.segment}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1
              id="hero-titulo"
              className="font-display text-[2.1rem] leading-[1.08] font-light text-marrom sm:text-5xl lg:text-[3.6rem]"
            >
              {hero.title}{' '}
              <em className="font-normal text-terracota not-italic">{hero.titleHighlight}</em>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-marrom-claro sm:text-lg">
              {hero.subtitle}
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href={hrefPrimario} size="lg">
                {hero.primaryCta.label}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
              <Button href={hrefSecundario} variant="outline" size="lg">
                <MessageCircle className="size-4" aria-hidden="true" />
                {secundarioExterno ? hero.secondaryCta.label : 'Fale com o atelier'}
              </Button>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <dl className="mt-12 grid max-w-lg grid-cols-2 gap-x-6 gap-y-6 border-t border-marrom/10 pt-8 sm:grid-cols-3">
              {hero.highlights.map((item) => (
                <div key={item.label}>
                  <dt className="font-display text-xl font-normal text-terracota sm:text-2xl">
                    {item.value}
                  </dt>
                  <dd className="mt-1 font-sans text-[0.72rem] leading-snug tracking-[0.14em] text-marrom-claro uppercase">
                    {item.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Imagem — primeira no mobile */}
        <Reveal className="order-1 w-full lg:order-2 lg:w-[48%]" delay={120}>
          <figure className="relative mx-auto max-w-md lg:max-w-none">
            <div
              aria-hidden="true"
              className="absolute -top-4 -left-4 h-full w-full rounded-4xl border border-terracota/30 sm:-top-5 sm:-left-5"
            />
            <div className="relative overflow-hidden rounded-4xl bg-bege shadow-[0_30px_60px_-32px_rgba(67,41,29,0.6)]">
              <SmartImage
                src={hero.image}
                alt={hero.imageAlt}
                placeholderLabel="Fotografia da peça"
                loading="eager"
                className="aspect-4/5 w-full"
              />
            </div>
            <figcaption className="mt-5 flex items-center gap-3 font-sans text-xs tracking-[0.12em] text-barro uppercase lg:absolute lg:-bottom-7 lg:left-8 lg:mt-0 lg:rounded-full lg:bg-creme lg:px-5 lg:py-3 lg:shadow-lg">
              <span className="h-px w-6 bg-terracota lg:hidden" aria-hidden="true" />
              Do papel à arte, peça por peça
            </figcaption>
          </figure>
        </Reveal>
      </div>

      {/* Transição de papel rasgado para a seção seguinte */}
      <TornEdge posicao="bottom" className="relative text-creme" />
    </section>
  );
}
