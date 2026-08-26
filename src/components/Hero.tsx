import { ArrowDown, ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from './ui/Button';
import { Reveal } from './ui/Reveal';
import { SmartImage } from './ui/SmartImage';
import { Birds, Cactus, SunRays, TornEdge } from './ui/Decorations';
import { Seal } from './ui/Seal';
import { clientData } from '../data/clientData';
import { resolveCtaHref } from '../config/site';

/**
 * Hero editorial e assimétrico.
 *
 * A composição não é de colunas: a palavra "Arte" entra em corpo gigante e
 * funciona quase como elemento gráfico, o restante da frase desce em manchete
 * e o espaço da fotografia sobe por cima da tipografia, escapando da margem
 * direita. Selo artesanal, indicador de rolagem e desenhos completam a página.
 */
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
      className="grao relative overflow-hidden bg-linear-to-b from-areia via-areia to-bege/60 pt-24 sm:pt-28 lg:pt-32"
    >
      {/* Desenhos e brilhos — nunca competem com o conteúdo */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 right-1/4 size-104 rounded-full bg-ocre/12 blur-3xl" />
        <div className="absolute -bottom-40 -left-24 size-88 rounded-full bg-terracota/8 blur-3xl" />
        <SunRays className="absolute top-20 left-3 w-14 text-ocre/60 sm:left-8 sm:w-20 lg:top-16 lg:left-14 lg:w-28" />
        <Birds className="absolute top-44 right-6 w-16 text-barro/30 sm:w-20 lg:top-36 lg:right-[42%] lg:w-24" />
        <Cactus className="absolute bottom-40 left-1 w-9 text-verde/40 sm:w-12 lg:bottom-52 lg:w-14" />
      </div>

      <div className="relative mx-auto max-w-368 px-4 sm:px-6 lg:px-10">
        {/* Linha editorial de abertura */}
        <Reveal className="flex items-center justify-between gap-6 border-b border-marrom/12 pb-5">
          <p className="font-sans text-[0.6rem] font-semibold tracking-[0.3em] text-terracota uppercase sm:text-[0.68rem]">
            {clientData.company.segment}
          </p>
          <p className="hidden font-sans text-[0.6rem] tracking-[0.3em] text-marrom-claro/60 uppercase sm:block">
            Est. Nordeste · Brasil
          </p>
        </Reveal>

        {/*
          Grade assimétrica: a tipografia ocupa as 7 primeiras colunas e o
          espaço da imagem entra a partir da coluna 6, criando a sobreposição.
        */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 lg:gap-x-6">
          {/* TIPOGRAFIA */}
          <div className="relative z-20 pt-10 lg:col-span-7 lg:col-start-1 lg:row-start-1 lg:pt-16">
            <h1 id="hero-titulo" className="font-display text-marrom">
              <span className="block text-[clamp(4.5rem,17vw,11rem)] leading-[0.8] font-light tracking-[-0.03em]">
                {hero.titleLead}
              </span>
              <span className="mt-3 block max-w-[15ch] text-[clamp(1.6rem,4.6vw,3.1rem)] leading-[1.05] font-light lg:mt-5">
                {hero.titleRest}{' '}
                <em className="font-normal text-terracota not-italic">{hero.titleHighlight}</em>
              </span>
            </h1>
          </div>

          {/*
            ESPAÇO DA FOTOGRAFIA
            Sobe sobre a tipografia no desktop e sangra na margem direita.
            A proporção 4/5 é a mesma da foto definitiva — ao trocar o
            arquivo, nada se desloca.
          */}
          <Reveal
            delay={120}
            className="relative z-10 mt-10 lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:-mr-10 lg:pt-20 xl:-mr-14"
          >
            <figure className="group relative mx-auto max-w-sm lg:max-w-none">
              <div className="relative overflow-hidden rounded-t-[14rem] rounded-b-3xl bg-bege shadow-[0_40px_80px_-40px_rgba(67,41,29,0.55)]">
                <SmartImage
                  src={hero.image}
                  alt={hero.imageAlt}
                  placeholderLabel="Imagem principal"
                  loading="eager"
                  className="aspect-4/5 w-full transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
                />
              </div>

              {/* Selo artesanal sobreposto na quina */}
              <Seal
                texto={hero.seal}
                className="absolute -bottom-8 -left-6 z-20 sm:-left-10 lg:-bottom-10 lg:-left-14"
              />
            </figure>
          </Reveal>

          {/* APOIO — desce abaixo da tipografia, alinhado à esquerda */}
          <div className="relative z-20 mt-16 lg:col-span-6 lg:col-start-1 lg:row-start-2 lg:mt-10">
            <Reveal delay={160}>
              <p className="max-w-md text-base leading-relaxed text-marrom-claro sm:text-lg">
                {hero.subtitle}
              </p>
            </Reveal>

            <Reveal delay={220}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button href={hrefPrimario} size="lg">
                  {hero.primaryCta.label}
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
                <Button href={hrefSecundario} variant="outline" size="lg">
                  <MessageCircle className="size-4" aria-hidden="true" />
                  {secundarioExterno ? hero.secondaryCta.label : 'Fale com o atelier'}
                </Button>
              </div>
            </Reveal>

            {/* Números editoriais, separados por fios verticais */}
            <Reveal delay={280}>
              <dl className="mt-14 flex flex-wrap gap-x-10 gap-y-6">
                {hero.highlights.map((item, indice) => (
                  <div
                    key={item.label}
                    className={indice > 0 ? 'border-l border-marrom/15 pl-10' : ''}
                  >
                    <dt className="font-display text-2xl leading-none font-light text-terracota sm:text-3xl">
                      {item.value}
                    </dt>
                    <dd className="mt-2 font-sans text-[0.62rem] tracking-[0.22em] text-marrom-claro/80 uppercase">
                      {item.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>

        {/* Indicador de rolagem, na vertical */}
        <div className="hidden justify-end pt-10 pb-6 lg:flex">
          <a
            href="#processo"
            className="group inline-flex items-center gap-3 font-sans text-[0.6rem] tracking-[0.3em] text-marrom-claro/70 uppercase transition-colors hover:text-terracota"
          >
            Explorar
            <span className="flex size-9 items-center justify-center rounded-full border border-marrom/20 transition-all duration-300 group-hover:border-terracota group-hover:bg-terracota group-hover:text-creme">
              <ArrowDown className="size-3.5" aria-hidden="true" />
            </span>
          </a>
        </div>
      </div>

      <div className="h-10 lg:h-4" />
      <TornEdge posicao="bottom" className="relative text-creme" />
    </section>
  );
}
