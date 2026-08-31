import { useSite } from '../conteudo/useSite';
import { LinkEditorial } from './ui/Button';
import { Caderno, Fio } from './ui/Catalogo';
import { Reveal } from './ui/Reveal';
import { SmartImage } from './ui/SmartImage';

/**
 * Caderno da história — retrato e depoimento.
 *
 * A prancha da artista ocupa uma coluna estreita e alta, encostada na margem
 * esquerda, e o texto corre ao lado com a citação destacada em corpo grande.
 * Os pilares fecham a página numa faixa de três colunas separada por fios.
 */
export function AboutArtist() {
  const { conteudo: clientData, isConfigured, siteConfig } = useSite();
  const { about } = clientData;
  const { artist } = about;
  const nomeDefinido = isConfigured(artist.name);

  return (
    <section
      id="historia"
      aria-labelledby="historia-titulo"
      className="grao bg-papel py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Caderno numero={about.numero} titulo="Nossa história" nota="Retrato e depoimento" />

        <div className="grid gap-10 pt-10 lg:grid-cols-12 lg:gap-10 lg:pt-14">
          {/* Prancha da artista — coluna estreita e alta */}
          <Reveal className="group lg:col-span-4">
            <figure>
              <div className="overflow-hidden bg-areia">
                <SmartImage
                  src={artist.photo}
                  alt={artist.photoAlt}
                  placeholderLabel="Retrato da artista"
                  figura="03"
                  className="aspect-3/4 w-full transition-transform duration-[1.3s] ease-out group-hover:scale-[1.04]"
                />
              </div>
              <figcaption className="etiqueta pt-3 text-tinta/45">
                fig. 03 — {nomeDefinido ? artist.name : 'Artista do atelier'}
              </figcaption>
            </figure>
          </Reveal>

          {/* Texto */}
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal>
              <h2 id="historia-titulo" className="text-[clamp(1.7rem,3.4vw,2.7rem)]">
                {about.title}
              </h2>
            </Reveal>

            {/* Citação em corpo grande, recuada */}
            <Reveal delay={80} className="mt-10 border-l-2 border-tijolo/50 pl-6 sm:pl-8">
              <p className="font-display text-[clamp(1.3rem,2.4vw,2rem)] leading-[1.25] text-tinta italic">
                “{about.quote}”
              </p>
              <p className="etiqueta mt-5 text-tijolo">
                {nomeDefinido ? artist.name : `Artista do ${siteConfig.name}`}
              </p>
            </Reveal>

            <Reveal
              delay={140}
              className="mt-10 space-y-5 text-[0.98rem] leading-[1.75] text-tinta-suave"
            >
              {about.paragraphs.map((paragrafo) => (
                <p key={paragrafo.slice(0, 32)}>{paragrafo}</p>
              ))}
            </Reveal>

            <Reveal delay={200} className="mt-10">
              <LinkEditorial href="#galeria">Ver o processo na galeria</LinkEditorial>
            </Reveal>
          </div>
        </div>

        {/* Pilares — faixa de três colunas */}
        <div className="pt-14 lg:pt-20">
          <Fio />
          <ul className="grid grid-cols-1 sm:grid-cols-3">
            {about.pillars.map((pilar, indice) => (
              <li
                key={pilar.title}
                className="border-b border-tinta/10 sm:border-r sm:border-b-0 sm:last:border-r-0"
              >
                <Reveal delay={indice * 80} className="h-full py-8 sm:px-7 sm:first:pl-0">
                  <h3 className="etiqueta text-tijolo">{pilar.title}</h3>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-tinta-suave">
                    {pilar.text}
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>
          <Fio />
        </div>
      </div>
    </section>
  );
}
