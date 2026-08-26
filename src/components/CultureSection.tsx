import { ArrowRight } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import { Cactus, SunRays } from './ui/Decorations';
import { iconesAtelier, type NomeIcone } from './ui/iconMap';
import { clientData } from '../data/clientData';

/**
 * Sobre o atelier — composição tipográfica em fundo escuro.
 *
 * É o ponto de virada da narrativa: depois de duas seções claras, a página
 * escurece e a apresentação da marca ganha corpo grande. Os valores entram
 * como uma lista numerada de fios finos, sem card nenhum.
 */
export function CultureSection() {
  const { about, culture } = clientData;

  return (
    <section
      aria-labelledby="cultura-titulo"
      className="grao relative overflow-hidden bg-marrom py-20 sm:py-24 lg:py-32"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/3 size-104 rounded-full bg-terracota/25 blur-3xl" />
        <div className="absolute -right-32 -bottom-40 size-88 rounded-full bg-ocre/12 blur-3xl" />
        <SunRays className="absolute top-14 right-6 w-24 text-amarelo/20 lg:right-16 lg:w-32" />
        <Cactus className="absolute bottom-10 left-3 w-12 text-amarelo/12 lg:w-16" />
      </div>

      <div className="relative mx-auto max-w-368 px-4 sm:px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* MANIFESTO — tipografia em corpo grande */}
          <div className="lg:col-span-6">
            <Reveal>
              <p className="font-sans text-[0.62rem] font-semibold tracking-[0.3em] text-amarelo uppercase">
                {about.eyebrow}
              </p>
              <h2
                id="cultura-titulo"
                className="mt-7 font-display text-[clamp(1.9rem,4.4vw,3.5rem)] leading-[1.08] font-light text-creme"
              >
                {about.intro}
              </h2>
            </Reveal>

            <Reveal delay={120}>
              <a
                href="#historia"
                className="group mt-10 inline-flex items-center gap-3 font-sans text-[0.66rem] font-semibold tracking-[0.2em] text-creme uppercase transition-colors hover:text-amarelo"
              >
                {about.ctaLabel}
                <span className="flex size-10 items-center justify-center rounded-full border border-creme/30 transition-all duration-300 group-hover:border-amarelo group-hover:bg-amarelo group-hover:text-marrom">
                  <ArrowRight className="size-4" aria-hidden="true" />
                </span>
              </a>
            </Reveal>
          </div>

          {/* VALORES — lista numerada de fios finos, deslocada */}
          <ul className="lg:col-span-5 lg:col-start-8 lg:mt-6">
            {culture.map((bloco, indice) => {
              const Icone = iconesAtelier[bloco.icon as NomeIcone] ?? iconesAtelier.sol;
              return (
                <li key={bloco.title} className="group border-t border-creme/15 py-7 last:border-b">
                  <Reveal delay={indice * 90}>
                    <div className="flex items-start gap-5">
                      <span className="pt-1 font-display text-lg leading-none font-light text-amarelo/50 transition-colors duration-500 group-hover:text-amarelo">
                        0{indice + 1}
                      </span>

                      <div className="flex-1">
                        <h3 className="font-display text-xl leading-tight font-normal text-creme sm:text-2xl">
                          {bloco.title}
                        </h3>
                        <p className="mt-2.5 max-w-sm text-sm leading-relaxed text-creme/65">
                          {bloco.description}
                        </p>
                      </div>

                      <span className="shrink-0 text-amarelo/40 transition-all duration-500 group-hover:scale-110 group-hover:text-amarelo/80">
                        <Icone className="size-9" strokeWidth={1.2} />
                      </span>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
