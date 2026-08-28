import { useSite } from '../conteudo/useSite';
import { Reveal } from './ui/Reveal';
import { SmartImage } from './ui/SmartImage';
import { Caderno, Fio, Numeral } from './ui/Catalogo';
import { Cacto } from './ui/Decorations';

/**
 * Caderno do artesanato — ensaio impresso.
 *
 * O texto corre em duas colunas com capitular, como o corpo de um artigo de
 * revista. As seis etapas descem depois numa faixa horizontal separada por
 * fios verticais, e os materiais fecham a seção sobre tinta chapada.
 */
export function ProcessSection() {
  const { conteudo: clientData } = useSite();
  const { process } = clientData;

  return (
    <section
      id="processo"
      aria-labelledby="processo-titulo"
      className="grao relative overflow-hidden bg-papel py-16 sm:py-20 lg:py-24"
    >
      <Cacto
        className="pointer-events-none absolute top-1/3 right-2 hidden w-14 text-cacto/25 lg:block"
        aria-hidden="true"
      />

      <div className="relative px-4 sm:px-6 lg:px-10">
        <Caderno numero={process.numero} titulo={process.eyebrow} nota="Técnica milenar" />

        <div className="grid gap-10 pt-10 lg:grid-cols-12 lg:gap-10 lg:pt-14">
          {/* Manchete do caderno */}
          <Reveal className="lg:col-span-5">
            <h2 id="processo-titulo" className="text-[clamp(2.2rem,6vw,4.75rem)]">
              {process.title}
            </h2>
          </Reveal>

          {/* Ensaio em duas colunas, com capitular na primeira */}
          <Reveal delay={90} className="lg:col-span-7">
            <div className="text-[0.98rem] leading-[1.75] text-tinta-suave sm:columns-2 sm:gap-9">
              {process.paragraphs.map((paragrafo, indice) => (
                <p
                  key={paragrafo.slice(0, 32)}
                  className={
                    indice === 0
                      ? 'mb-5 first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-[4.2rem] first-letter:leading-[0.72] first-letter:text-tijolo'
                      : 'mb-5 break-inside-avoid'
                  }
                >
                  {paragrafo}
                </p>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Prancha do processo, em faixa larga */}
        <Reveal delay={120} className="group pt-12 lg:pt-16">
          <figure>
            <div className="overflow-hidden bg-areia">
              <SmartImage
                src={process.image}
                alt={process.imageAlt}
                placeholderLabel="Prancha do processo"
                figura="02"
                className="aspect-4/3 w-full transition-transform duration-[1.3s] ease-out group-hover:scale-[1.03] sm:aspect-[21/8]"
              />
            </div>
            <figcaption className="etiqueta pt-3 text-tinta/45">
              fig. 02 — {process.imageAlt}
            </figcaption>
          </figure>
        </Reveal>

        {/* AS ETAPAS — faixa horizontal dividida por fios verticais */}
        <div className="pt-16 lg:pt-20">
          <Reveal>
            <Fio />
            <p className="etiqueta py-3 text-tinta/45">As etapas da criação</p>
            <Fio />
          </Reveal>

          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6">
            {process.steps.map((etapa, indice) => (
              <li
                key={etapa.name}
                className="group border-b border-tinta/10 sm:border-r sm:last:border-r-0 lg:border-b-0"
              >
                <Reveal delay={indice * 70} className="h-full px-0 py-7 sm:px-5 lg:px-4">
                  <Numeral className="text-4xl transition-colors duration-500 group-hover:text-tijolo/60">
                    {String(indice + 1).padStart(2, '0')}
                  </Numeral>
                  <h3 className="mt-4 font-display text-xl leading-tight">{etapa.name}</h3>
                  <p className="mt-2.5 text-[0.82rem] leading-relaxed text-tinta-suave">
                    {etapa.detail}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* MATERIAIS — faixa de tinta, em sangria */}
      <Reveal delay={100} className="grao grao-claro mt-16 bg-tinta-media lg:mt-20">
        <div className="grid gap-8 px-4 py-12 sm:px-6 lg:grid-cols-12 lg:items-center lg:gap-10 lg:px-10 lg:py-14">
          <div className="lg:col-span-4">
            <p className="etiqueta text-ambar">{process.materialsTitle}</p>
            <p className="mt-4 text-sm leading-relaxed text-papel/70">{process.materialsText}</p>
          </div>

          <ul className="flex flex-wrap gap-x-8 gap-y-4 lg:col-span-7 lg:col-start-6 lg:justify-end">
            {process.materials.map((material) => (
              <li
                key={material}
                className="font-display text-xl text-papel/85 transition-colors duration-300 hover:text-ambar sm:text-2xl"
              >
                {material}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
