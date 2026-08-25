import { Recycle } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import { SectionHeading } from './ui/SectionHeading';
import { SmartImage } from './ui/SmartImage';

const etapas = [
  { nome: 'Papel', detalhe: 'Papel de molho na água até amolecer por completo.' },
  { nome: 'Polpa', detalhe: 'A massa é triturada e recebe cola caseira e orgânica.' },
  { nome: 'Estrutura', detalhe: 'Arame e papelão formam o esqueleto da peça.' },
  { nome: 'Modelagem', detalhe: 'O papel-machê ganha volume, gesto e postura.' },
  { nome: 'Detalhes', detalhe: 'Acabamento, textura e pintura feitos à mão.' },
  { nome: 'Obra final', detalhe: 'Secagem lenta e a escultura pronta para durar.' },
];

const materiais = ['Garrafas PET', 'Papelão', 'Caixas', 'Resíduos sólidos', 'Arame'];

export function ProcessSection() {
  return (
    <section
      id="processo"
      aria-labelledby="processo-titulo"
      className="textura-papel bg-areia py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
          <div>
            <SectionHeading
              id="processo-titulo"
              eyebrow="O artesanato"
              title="Do papel à arte"
              align="left"
            />

            <div className="mt-8 space-y-5 text-base leading-relaxed text-marrom-claro sm:text-[1.05rem]">
              <Reveal as="p" delay={60}>
                O trabalho do Dindagó Atelier parte de uma técnica milenar: o papel-machê.
              </Reveal>
              <Reveal as="p" delay={120}>
                O papel é deixado de molho em água, transformado em polpa e posteriormente
                triturado. A essa mistura é acrescentada uma cola caseira e orgânica. Dessa
                matéria-prima nasce o papel-machê.
              </Reveal>
              <Reveal as="p" delay={180}>
                Antes de cada escultura existir, ela nasce na imaginação. A ideia é pesquisada,
                pensada e transformada em desenho. Depois começa a construção da estrutura da
                peça.
              </Reveal>
            </div>

            <Reveal delay={240} className="mt-10">
              <div className="rounded-2xl border border-verde/25 bg-creme/70 p-6 sm:p-7">
                <h3 className="flex items-center gap-3 font-sans text-[0.72rem] font-bold tracking-[0.18em] text-verde uppercase">
                  <Recycle className="size-4" strokeWidth={1.6} aria-hidden="true" />
                  Materiais reaproveitados
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-marrom-claro">
                  Boa parte do que sustenta cada escultura viria a ser descartado. No atelier,
                  vira estrutura, volume e forma.
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {materiais.map((material) => (
                    <li
                      key={material}
                      className="rounded-full border border-verde/25 bg-verde/8 px-3.5 py-1.5 font-sans text-xs tracking-[0.06em] text-verde"
                    >
                      {material}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Fluxo das etapas */}
          <Reveal delay={120}>
            <div className="rounded-[1.75rem] border border-bege-escuro/60 bg-creme p-6 sm:p-8">
              <h3 className="font-sans text-[0.7rem] font-bold tracking-[0.22em] text-terracota uppercase">
                As etapas da criação
              </h3>

              <ol className="mt-7 space-y-0">
                {etapas.map((etapa, indice) => (
                  <li key={etapa.nome} className="relative flex gap-5 pb-7 last:pb-0">
                    {/* linha vertical que conecta as etapas */}
                    {indice < etapas.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="absolute top-11 bottom-1 left-[1.24rem] w-px bg-gradient-to-b from-terracota/40 to-bege-escuro"
                      />
                    )}
                    <span className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border border-terracota/25 bg-areia font-sans text-[0.7rem] font-bold text-terracota">
                      {String(indice + 1).padStart(2, '0')}
                    </span>
                    <div className="pt-1.5">
                      <h4 className="font-sans text-[0.78rem] font-bold tracking-[0.16em] text-marrom uppercase">
                        {etapa.nome}
                      </h4>
                      <p className="mt-1.5 text-sm leading-relaxed text-marrom-claro">
                        {etapa.detalhe}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              <figure className="mt-8 overflow-hidden rounded-2xl bg-bege">
                <SmartImage
                  src="/images/gallery/processo-04.jpg"
                  alt="Mãos modelando o papel-machê sobre a estrutura de uma peça"
                  placeholderLabel="Foto do processo"
                  className="aspect-[16/9] w-full"
                />
              </figure>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
