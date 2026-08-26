import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl } from '../config/site';
import { Reveal } from './ui/Reveal';
import { Ornament } from './ui/Decorations';
import { clientData } from '../data/clientData';

/**
 * Encomendas em linhas editoriais.
 *
 * Cada etapa ocupa uma faixa da largura inteira, com o número em corpo muito
 * grande à esquerda e a indentação crescendo a cada passo — a leitura desce
 * como uma escada, não como quatro colunas iguais.
 */

/** Indentação de cada etapa. Cresce a cada passo, formando a escada. */
const recuos = ['lg:pl-0', 'lg:pl-12', 'lg:pl-24', 'lg:pl-36'];

export function OrdersSection() {
  const { orders } = clientData;
  const whatsappUrl = buildWhatsAppUrl(
    `Olá! Gostaria de conversar sobre uma encomenda personalizada com o ${clientData.company.name}.`,
  );

  return (
    <section
      id="encomendas"
      aria-labelledby="encomendas-titulo"
      className="grao relative overflow-hidden bg-creme py-20 sm:py-24 lg:py-32"
    >
      <div className="relative mx-auto max-w-368 px-4 sm:px-6 lg:px-10">
        {/* Título deslocado para a direita, abrindo espaço negativo à esquerda */}
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7 lg:col-start-5">
            <p className="mb-5 flex items-center gap-3 font-sans text-[0.62rem] font-semibold tracking-[0.3em] text-terracota uppercase">
              <Ornament lado="esquerda" className="w-12 text-ocre/70" />
              {orders.eyebrow}
            </p>
            <h2
              id="encomendas-titulo"
              className="max-w-2xl font-display text-[clamp(2.1rem,5.6vw,4rem)] leading-[0.98] font-light text-marrom"
            >
              {orders.title}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-marrom-claro sm:text-lg">
              {orders.subtitle}
            </p>
          </Reveal>
        </div>

        {/* ETAPAS — faixas de largura inteira com indentação crescente */}
        <ol className="mt-16 lg:mt-20">
          {orders.steps.map((etapa, indice) => (
            <li key={etapa.number} className="group border-t border-marrom/12 last:border-b">
              <Reveal delay={indice * 80}>
                <div
                  className={`flex flex-col gap-3 py-8 transition-colors duration-500 group-hover:bg-areia/40 sm:flex-row sm:items-baseline sm:gap-10 lg:py-10 ${recuos[indice] ?? ''}`}
                >
                  <span
                    aria-hidden="true"
                    className="font-display text-[clamp(2.6rem,6vw,4.5rem)] leading-[0.8] font-light text-terracota/25 transition-colors duration-500 group-hover:text-terracota/50 sm:w-32 sm:shrink-0"
                  >
                    {etapa.number}
                  </span>

                  <div className="flex-1">
                    <h3 className="font-display text-2xl leading-tight font-normal text-marrom sm:text-[1.8rem]">
                      {etapa.title}
                    </h3>
                    <p className="mt-2.5 max-w-lg text-sm leading-relaxed text-marrom-claro sm:text-base">
                      {etapa.text}
                    </p>
                  </div>

                  <ArrowUpRight
                    className="hidden size-5 shrink-0 self-center text-transparent transition-colors duration-500 group-hover:text-terracota lg:block"
                    aria-hidden="true"
                  />
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        {/* CHAMADA FINAL — composição tipográfica sobre terracota */}
        <Reveal delay={120} className="mt-20 lg:mt-24">
          <div className="grao relative overflow-hidden rounded-bloco bg-terracota px-7 py-14 sm:px-12 lg:px-16 lg:py-20">
            <div className="relative grid gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <h3 className="font-display text-[clamp(1.9rem,4.2vw,3.2rem)] leading-[1.04] font-light text-creme">
                  {orders.ctaTitle}
                </h3>
                <p className="mt-5 max-w-lg text-sm leading-relaxed text-creme/75 sm:text-base">
                  {orders.ctaText}
                </p>
              </div>

              <div className="lg:col-span-4 lg:col-start-9 lg:justify-self-end">
                <a
                  href={whatsappUrl ?? '#contato'}
                  {...(whatsappUrl ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-creme px-9 font-sans text-xs font-semibold tracking-[0.16em] text-marrom uppercase transition hover:-translate-y-0.5 hover:bg-amarelo active:translate-y-0"
                >
                  <MessageCircle className="size-4" aria-hidden="true" />
                  {orders.ctaLabel}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
