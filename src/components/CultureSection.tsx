import { ArrowRight } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import { Cactus } from './ui/Decorations';
import { iconesAtelier, type NomeIcone } from './ui/iconMap';
import { clientData } from '../data/clientData';

/**
 * Faixa "Sobre o Atelier": apresentação curta da marca à esquerda e os valores
 * (`clientData.culture`) em colunas com ícones à direita.
 */
export function CultureSection() {
  const { about, culture } = clientData;

  return (
    <section
      aria-labelledby="cultura-titulo"
      className="textura-papel relative overflow-hidden bg-kraft py-20 sm:py-24 lg:py-28"
    >
      {/* Cactos nas bordas, como na identidade visual */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Cactus className="absolute bottom-8 left-2 w-12 text-verde/30 lg:w-16" />
        <Cactus className="absolute right-3 bottom-12 hidden w-10 text-verde/25 lg:block" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-14">
          {/* Apresentação */}
          <div className="lg:col-span-4">
            <Reveal>
              <h2
                id="cultura-titulo"
                className="font-display text-3xl leading-[1.15] font-light text-marrom sm:text-4xl"
              >
                {about.eyebrow}
              </h2>
              <p className="mt-6 text-base leading-relaxed text-marrom-claro">{about.intro}</p>

              <a
                href="#historia"
                className="mt-8 inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-terracota px-7 font-sans text-[0.7rem] font-semibold tracking-[0.14em] text-creme uppercase transition hover:-translate-y-0.5 hover:bg-barro active:translate-y-0"
              >
                {about.ctaLabel}
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </Reveal>
          </div>

          {/* Valores da marca */}
          <ul className="grid gap-8 sm:grid-cols-2 lg:col-span-8 lg:gap-6 xl:grid-cols-4">
            {culture.map((bloco, indice) => {
              const Icone = iconesAtelier[bloco.icon as NomeIcone] ?? iconesAtelier.sol;
              return (
                <Reveal
                  as="li"
                  key={bloco.title}
                  delay={indice * 80}
                  className="group border-marrom/12 text-center sm:px-4 xl:border-l xl:first:border-l-0"
                >
                  <span className="inline-block text-ocre transition-transform duration-500 group-hover:scale-110">
                    <Icone className="size-12" strokeWidth={1.4} />
                  </span>
                  <h3 className="mt-4 font-sans text-[0.76rem] font-bold tracking-[0.14em] text-terracota uppercase">
                    {bloco.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-marrom-claro">
                    {bloco.description}
                  </p>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
