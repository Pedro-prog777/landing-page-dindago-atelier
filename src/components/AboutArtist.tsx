import { Quote } from 'lucide-react';
import { isConfigured, siteConfig } from '../config/site';
import { clientData } from '../data/clientData';
import { Button } from './ui/Button';
import { Reveal } from './ui/Reveal';
import { SmartImage } from './ui/SmartImage';

export function AboutArtist() {
  const { about } = clientData;
  const { artist } = about;
  const nomeDefinido = isConfigured(artist.name);

  return (
    <section
      id="historia"
      aria-labelledby="historia-titulo"
      className="bg-creme py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          {/* Retrato da artista */}
          <Reveal className="lg:col-span-5">
            <figure className="relative mx-auto max-w-md lg:max-w-none">
              <div
                aria-hidden="true"
                className="absolute -right-4 -bottom-4 h-full w-full rounded-[2rem] bg-areia sm:-right-5 sm:-bottom-5"
              />
              <div className="relative overflow-hidden rounded-[2rem] bg-bege">
                <SmartImage
                  src={artist.photo}
                  alt={artist.photoAlt}
                  placeholderLabel="Foto da artista"
                  className="aspect-[4/5] w-full"
                />
              </div>
              {nomeDefinido && (
                <figcaption className="mt-5 text-center font-sans text-[0.7rem] tracking-[0.18em] text-barro uppercase lg:text-left">
                  {artist.name} — {artist.role}
                </figcaption>
              )}
            </figure>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal>
              <span className="mb-4 inline-flex items-center gap-3 font-sans text-[0.68rem] font-semibold tracking-[0.28em] text-terracota uppercase">
                <span className="h-px w-8 bg-terracota/50" aria-hidden="true" />
                Nossa história
              </span>
              <h2
                id="historia-titulo"
                className="max-w-2xl font-display text-3xl leading-[1.14] font-light text-marrom sm:text-4xl lg:text-[2.7rem]"
              >
                {about.title}
              </h2>
            </Reveal>

            <Reveal delay={80}>
              <blockquote className="mt-8 border-l-2 border-terracota/40 pl-5 sm:pl-6">
                <Quote className="mb-3 size-5 text-terracota/60" aria-hidden="true" />
                <p className="font-display text-lg leading-relaxed font-light text-marrom italic sm:text-xl">
                  {about.quote}
                </p>
                <footer className="mt-4 font-sans text-[0.7rem] tracking-[0.18em] text-barro uppercase">
                  {nomeDefinido ? artist.name : `Artista do ${siteConfig.name}`}
                </footer>
              </blockquote>
            </Reveal>

            <Reveal delay={140}>
              <div className="mt-8 space-y-4 text-base leading-relaxed text-marrom-claro">
                {about.paragraphs.map((paragrafo) => (
                  <p key={paragrafo.slice(0, 32)}>{paragrafo}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={200}>
              <ul className="mt-10 grid gap-6 sm:grid-cols-3">
                {about.pillars.map((pilar) => (
                  <li key={pilar.title}>
                    <h3 className="font-sans text-[0.72rem] font-bold tracking-[0.16em] text-terracota uppercase">
                      {pilar.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-marrom-claro">{pilar.text}</p>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={260} className="mt-10">
              <Button href="#galeria" variant="outline">
                Ver o processo na galeria
              </Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
