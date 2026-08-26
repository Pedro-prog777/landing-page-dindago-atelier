import { ArrowUpRight } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import { Cactus, SunRays } from './ui/Decorations';
import { iconesAtelier, type NomeIcone } from './ui/iconMap';
import { clientData } from '../data/clientData';

/**
 * Diferenciais em Bento Grid assimétrico.
 *
 * Não são cinco blocos iguais: a composição mistura 2×2, 1×1, 2×1 e 3×1, e
 * cada peça recebe um tratamento visual diferente — manifesto tipográfico,
 * bloco com ilustração, bloco com número em marca-d'água e faixa com chamada.
 * O que muda por bloco é só a apresentação; o conteúdo continua vindo de
 * `clientData.benefits`.
 */

/** Posição de cada diferencial no bento. Composição desenhada, não automática. */
const posicoes = [
  'sm:col-span-1 lg:col-span-1 lg:col-start-3 lg:row-start-1',
  'sm:col-span-1 lg:col-span-1 lg:col-start-4 lg:row-start-1',
  'sm:col-span-2 lg:col-span-2 lg:col-start-3 lg:row-start-2',
  'sm:col-span-1 lg:col-span-1 lg:col-start-1 lg:row-start-3',
  'sm:col-span-1 lg:col-span-3 lg:col-start-2 lg:row-start-3',
];

/** Cada bloco tem fundo e tratamento próprios. */
const estilos = [
  'bg-creme border border-bege-escuro/50',
  'bg-kraft/70',
  'bg-areia',
  'bg-creme border border-bege-escuro/50',
  'bg-marrom text-creme',
];

export function ValuesSection() {
  const { benefits, company } = clientData;

  return (
    <section
      aria-label="Diferenciais do atelier"
      className="relative bg-creme pt-6 pb-20 sm:pb-24 lg:pb-28"
    >
      <div className="mx-auto max-w-368 px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[13.5rem] lg:gap-4">
          {/* MANIFESTO — bloco tipográfico 2×2, sem ícone */}
          <Reveal className="grao relative overflow-hidden rounded-3xl bg-terracota p-8 sm:col-span-2 lg:col-span-2 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:p-10">
            <SunRays
              className="absolute -top-6 -right-4 w-28 text-creme/15 lg:w-36"
              aria-hidden="true"
            />
            <div className="relative flex h-full flex-col justify-between gap-8">
              <p className="font-sans text-[0.6rem] font-semibold tracking-[0.3em] text-creme/70 uppercase">
                O que sustenta o trabalho
              </p>
              <p className="font-display text-[clamp(1.7rem,3.4vw,2.9rem)] leading-[1.06] font-light text-creme">
                {company.slogan}
              </p>
            </div>
          </Reveal>

          {/* DIFERENCIAIS — cada um com sua composição */}
          {benefits.map((valor, indice) => {
            const Icone = iconesAtelier[valor.icon as NomeIcone] ?? iconesAtelier.sol;
            const horizontal = indice === 2;
            const faixa = indice === 4;

            return (
              <Reveal
                key={valor.title}
                delay={indice * 70}
                className={`group relative overflow-hidden rounded-3xl p-7 transition-transform duration-500 hover:-translate-y-1 ${estilos[indice]} ${posicoes[indice]}`}
              >
                {/* Número em marca-d'água, só no bloco "Autoral" */}
                {indice === 3 && (
                  <span
                    aria-hidden="true"
                    className="absolute right-5 bottom-4 font-display text-7xl leading-none text-terracota/10"
                  >
                    0{indice + 1}
                  </span>
                )}

                {/* Cacto ilustrado no bloco largo de identidade */}
                {horizontal && (
                  <Cactus
                    className="absolute -right-2 bottom-0 w-16 text-verde/25 lg:w-20"
                    aria-hidden="true"
                  />
                )}

                <div
                  className={`relative flex h-full ${
                    horizontal
                      ? 'flex-col justify-center gap-4 sm:flex-row sm:items-center sm:gap-7'
                      : faixa
                        ? 'flex-col justify-between gap-5 sm:flex-row sm:items-end'
                        : 'flex-col justify-between gap-5'
                  }`}
                >
                  <span
                    className={`shrink-0 transition-transform duration-500 group-hover:scale-110 ${
                      faixa ? 'text-amarelo' : 'text-ocre'
                    }`}
                  >
                    <Icone
                      className={horizontal ? 'size-14 lg:size-16' : 'size-10'}
                      strokeWidth={1.3}
                    />
                  </span>

                  <div className={horizontal ? 'sm:max-w-md' : ''}>
                    <h3
                      className={`font-sans text-[0.72rem] font-bold tracking-[0.16em] uppercase ${
                        faixa ? 'text-amarelo' : 'text-terracota'
                      }`}
                    >
                      {valor.title}
                    </h3>
                    <p
                      className={`mt-2 text-sm leading-relaxed ${
                        faixa ? 'text-creme/75' : 'text-marrom-claro'
                      } ${horizontal ? 'sm:text-base' : ''}`}
                    >
                      {valor.description}
                    </p>
                  </div>

                  {/* A faixa de encomendas leva direto para a seção */}
                  {faixa && (
                    <a
                      href="#encomendas"
                      className="inline-flex min-h-11 shrink-0 items-center gap-2 self-start rounded-full border border-creme/30 px-5 font-sans text-[0.65rem] font-semibold tracking-[0.16em] text-creme uppercase transition hover:bg-creme hover:text-marrom sm:self-auto"
                    >
                      Encomendar
                      <ArrowUpRight className="size-3.5" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
