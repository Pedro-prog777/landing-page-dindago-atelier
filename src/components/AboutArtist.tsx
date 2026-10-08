import { useSite } from '../conteudo/useSite';
import { Caderno, Fio } from './ui/Catalogo';
import { Reveal } from './ui/Reveal';
import { SmartImage } from './ui/SmartImage';
import { clientData as conteudoPadrao } from '../data/clientData';

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

        <div className="grid gap-10 pt-8 md:grid-cols-12 md:gap-8 lg:gap-10 lg:pt-14">
          {/* Prancha da artista — coluna estreita e alta */}
          <Reveal className="group md:col-span-5 lg:col-span-4">
            <figure>
              <div className="overflow-hidden bg-areia">
                <SmartImage
                  key={artist.photo}
                  src={artist.photo}
                  alt={artist.photoAlt}
                  alternativa={{
                    src: conteudoPadrao.about.artist.photo,
                    alt: conteudoPadrao.about.artist.photoAlt,
                  }}
                  placeholderLabel="Retrato da artista"
                  className="aspect-4/5 w-full object-[50%_30%] transition-transform md:aspect-3/4 duration-[1.3s] ease-out group-hover:scale-[1.04]"
                />
              </div>
              <figcaption className="pt-3">
                <span className="etiqueta block text-tinta-suave">
                  Retrato — {nomeDefinido ? artist.name : 'Artista do atelier'}
                </span>
                {isConfigured(artist.role) && (
                  <span className="mt-1 block font-display text-lg text-tinta">{artist.role}</span>
                )}
              </figcaption>
            </figure>
          </Reveal>

          {/* Texto */}
          <div className="md:col-span-7 lg:col-start-6">
            <Reveal>
              <h2 id="historia-titulo" className="text-[clamp(2.1rem,4.2vw,3.5rem)]">
                {about.title}
              </h2>
            </Reveal>

            {/* Citação em corpo grande, recuada */}
            <Reveal delay={80} className="mt-8 border-l-2 border-tijolo/50 pl-6 sm:mt-10 sm:pl-8">
              <p className="font-display text-[clamp(1.3rem,2.4vw,2rem)] leading-[1.25] text-tinta italic">
                “{about.quote}”
              </p>
              <p className="etiqueta mt-5 text-tijolo">
                {nomeDefinido ? artist.name : `Artista do ${siteConfig.name}`}
              </p>
            </Reveal>

            <Reveal
              delay={140}
              className="mt-8 space-y-5 text-base leading-[1.75] text-tinta-media sm:mt-10"
            >
              {about.paragraphs.map((paragrafo) => (
                <p key={paragrafo.slice(0, 32)}>{paragrafo}</p>
              ))}
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
                className="border-b border-tinta/10 sm:border-r sm:border-b-0 sm:px-7 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0"
              >
                <Reveal delay={indice * 80} className="h-full py-8">
                  <h3 className="etiqueta text-tijolo">{pilar.title}</h3>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-tinta-media">
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
