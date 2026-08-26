import { Recycle } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import { SmartImage } from './ui/SmartImage';
import { Birds, Ornament } from './ui/Decorations';
import { clientData } from '../data/clientData';

/**
 * O processo como percurso, não como timeline corporativa.
 *
 * As seis etapas se espalham em alturas diferentes, formando uma descida
 * irregular pela página — o número sai em corpo grande e a palavra pousa por
 * cima dele. Nenhuma etapa mora dentro de um card.
 */

/** Deslocamento vertical de cada etapa. Escalonamento desenhado, não automático. */
const alturas = ['lg:mt-0', 'lg:mt-20', 'lg:mt-40', 'lg:mt-4', 'lg:mt-24', 'lg:mt-44'];

export function ProcessSection() {
  const { process } = clientData;

  return (
    <section
      id="processo"
      aria-labelledby="processo-titulo"
      className="grao relative overflow-hidden bg-areia py-20 sm:py-24 lg:py-32"
    >
      <Birds
        className="pointer-events-none absolute top-16 right-8 w-20 text-barro/25 lg:right-24 lg:w-28"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-368 px-4 sm:px-6 lg:px-10">
        {/* ABERTURA — texto à esquerda, espaço de imagem descendo à direita */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="mb-5 flex items-center gap-3 font-sans text-[0.62rem] font-semibold tracking-[0.3em] text-terracota uppercase">
                <Ornament lado="esquerda" className="w-12 text-ocre/70" />
                {process.eyebrow}
              </p>
              <h2
                id="processo-titulo"
                className="font-display text-[clamp(2.4rem,7vw,5rem)] leading-[0.92] font-light text-marrom"
              >
                {process.title}
              </h2>
            </Reveal>

            <div className="mt-8 max-w-xl space-y-5 text-base leading-relaxed text-marrom-claro sm:text-[1.05rem]">
              {process.paragraphs.map((paragrafo, indice) => (
                <Reveal as="p" key={paragrafo.slice(0, 32)} delay={60 + indice * 60}>
                  {paragrafo}
                </Reveal>
              ))}
            </div>
          </div>

          {/* Espaço da fotografia do processo — proporção 4/3, deslocado */}
          <Reveal delay={140} className="lg:col-span-5 lg:col-start-8 lg:mt-16">
            <figure className="group relative">
              <div className="overflow-hidden rounded-[2.5rem] bg-bege shadow-[0_30px_60px_-38px_rgba(67,41,29,0.6)]">
                <SmartImage
                  src={process.image}
                  alt={process.imageAlt}
                  placeholderLabel="Imagem do processo"
                  className="aspect-4/3 w-full transition-transform duration-[1.1s] ease-out group-hover:scale-[1.04]"
                />
              </div>
              <figcaption className="texto-vertical absolute top-4 -left-7 hidden font-sans text-[0.58rem] tracking-[0.28em] text-barro/70 uppercase lg:block">
                No atelier
              </figcaption>
            </figure>
          </Reveal>
        </div>

        {/* AS ETAPAS — descida irregular, sem caixas */}
        <div className="mt-20 lg:mt-28">
          <Reveal>
            <p className="font-sans text-[0.62rem] font-semibold tracking-[0.3em] text-barro/70 uppercase">
              As etapas da criação
            </p>
            <div className="fio-editorial mt-5" />
          </Reveal>

          <ol className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-0">
            {process.steps.map((etapa, indice) => (
              <Reveal
                as="li"
                key={etapa.name}
                delay={indice * 80}
                className={`group relative ${alturas[indice] ?? ''}`}
              >
                {/* Número em corpo grande; a palavra pousa sobre ele */}
                <span
                  aria-hidden="true"
                  className="block font-display text-[clamp(3.5rem,7vw,5.5rem)] leading-[0.8] font-light text-terracota/25 transition-colors duration-500 group-hover:text-terracota/45"
                >
                  {String(indice + 1).padStart(2, '0')}
                </span>

                <h3 className="-mt-5 ml-1 font-display text-2xl leading-tight font-normal text-marrom sm:text-[1.7rem]">
                  {etapa.name}
                </h3>

                <p className="mt-3 ml-1 max-w-xs text-sm leading-relaxed text-marrom-claro">
                  {etapa.detail}
                </p>

                {/* Fio curto que cresce no hover, apontando para a etapa seguinte */}
                <span
                  aria-hidden="true"
                  className="mt-6 ml-1 block h-px w-12 bg-terracota/40 transition-all duration-500 group-hover:w-20"
                />
              </Reveal>
            ))}
          </ol>
        </div>

        {/* MATERIAIS — faixa horizontal, sem moldura de card */}
        <Reveal delay={120} className="mt-24 lg:mt-32">
          <div className="fio-editorial mb-10" />
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-10">
            <div className="lg:col-span-4">
              <h3 className="flex items-center gap-3 font-sans text-[0.72rem] font-bold tracking-[0.2em] text-verde uppercase">
                <Recycle className="size-4" strokeWidth={1.6} aria-hidden="true" />
                {process.materialsTitle}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-marrom-claro">
                {process.materialsText}
              </p>
            </div>

            <ul className="flex flex-wrap gap-2.5 lg:col-span-7 lg:col-start-6 lg:justify-end">
              {process.materials.map((material) => (
                <li
                  key={material}
                  className="rounded-full border border-verde/30 px-5 py-2.5 font-sans text-xs tracking-[0.08em] text-verde transition-colors duration-300 hover:bg-verde hover:text-creme"
                >
                  {material}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
