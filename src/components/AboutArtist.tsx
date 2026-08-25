import { Quote } from 'lucide-react';
import { artistConfig, isConfigured } from '../config/site';
import { Button } from './ui/Button';
import { Reveal } from './ui/Reveal';
import { SmartImage } from './ui/SmartImage';

const pilares = [
  {
    titulo: 'A pesquisa',
    texto:
      'Cada peça começa em um caderno: referências, conversas, memórias de festa, de feira e de casa.',
  },
  {
    titulo: 'O desenho',
    texto:
      'A ideia vira traço antes de virar volume. É no desenho que a figura ganha postura e gesto.',
  },
  {
    titulo: 'As mãos',
    texto:
      'Nada é moldado em série. O tempo de secagem do papel dita o ritmo do trabalho.',
  },
];

export function AboutArtist() {
  const nomeDefinido = isConfigured(artistConfig.name);

  return (
    <section
      id="historia"
      aria-labelledby="historia-titulo"
      className="bg-creme py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          {/* Retrato da artesã */}
          <Reveal className="lg:col-span-5">
            <figure className="relative mx-auto max-w-md lg:max-w-none">
              <div
                aria-hidden="true"
                className="absolute -right-4 -bottom-4 h-full w-full rounded-[2rem] bg-areia sm:-right-5 sm:-bottom-5"
              />
              <div className="relative overflow-hidden rounded-[2rem] bg-bege">
                <SmartImage
                  src={artistConfig.photo}
                  alt={artistConfig.photoAlt}
                  placeholderLabel="Foto da artesã"
                  className="aspect-[4/5] w-full"
                />
              </div>
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
                className="max-w-2xl text-3xl leading-[1.14] font-light text-marrom sm:text-4xl lg:text-[2.7rem]"
              >
                Por trás de cada peça, existe uma história.
              </h2>
            </Reveal>

            <Reveal delay={80}>
              <blockquote className="mt-8 border-l-2 border-terracota/40 pl-5 sm:pl-6">
                <Quote className="mb-3 size-5 text-terracota/60" aria-hidden="true" />
                <p className="font-display text-lg leading-relaxed font-light text-marrom italic sm:text-xl">
                  Cada peça começa muito antes das mãos tocarem o papel. Começa na imaginação,
                  na pesquisa e na memória.
                </p>
                <footer className="mt-4 font-sans text-[0.7rem] tracking-[0.18em] text-barro uppercase">
                  {nomeDefinido ? artistConfig.name : 'Artesã do Dindagó Atelier'}
                  <span className="sr-only">
                    {nomeDefinido ? '' : ' — nome a ser preenchido na configuração do site'}
                  </span>
                </footer>
              </blockquote>
            </Reveal>

            <Reveal delay={140}>
              <div className="mt-8 space-y-4 text-base leading-relaxed text-marrom-claro">
                <p>
                  O Dindagó Atelier nasce do encontro entre pesquisa e trabalho manual. As
                  esculturas em papel-machê partem de histórias vividas e ouvidas — festas,
                  ofícios, personagens do cotidiano nordestino — e ganham forma no tempo lento
                  do papel.
                </p>
                <p>
                  {/* Espaço reservado para a biografia completa da artesã. */}
                  Este parágrafo está reservado para a biografia da artesã: formação, trajetória,
                  o começo do atelier e o que a levou ao papel-machê. Substitua por suas próprias
                  palavras — é o texto que mais aproxima quem chega ao site.
                </p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <ul className="mt-10 grid gap-6 sm:grid-cols-3">
                {pilares.map((pilar) => (
                  <li key={pilar.titulo}>
                    <h3 className="font-sans text-[0.72rem] font-bold tracking-[0.16em] text-terracota uppercase">
                      {pilar.titulo}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-marrom-claro">
                      {pilar.texto}
                    </p>
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
