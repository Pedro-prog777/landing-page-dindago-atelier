import { useMemo, useState } from 'react';
import { Expand } from 'lucide-react';
import { galleryCategories, galleryItems, type GalleryCategory } from '../data/gallery';
import { Lightbox } from './Lightbox';
import { Reveal } from './ui/Reveal';
import { SectionHeading } from './ui/SectionHeading';
import { SmartImage } from './ui/SmartImage';
import { clientData } from '../data/clientData';

type Filtro = GalleryCategory | 'Todas';

const filtros: Filtro[] = ['Todas', ...galleryCategories];

export function Gallery() {
  const [filtro, setFiltro] = useState<Filtro>('Todas');
  const [indiceAberto, setIndiceAberto] = useState<number | null>(null);

  const itens = useMemo(
    () =>
      filtro === 'Todas'
        ? galleryItems
        : galleryItems.filter((item) => item.category === filtro),
    [filtro],
  );

  function trocarFiltro(novo: Filtro) {
    setFiltro(novo);
    setIndiceAberto(null);
  }

  return (
    <section
      id="galeria"
      aria-labelledby="galeria-titulo"
      className="textura-papel bg-areia py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="galeria-titulo"
          eyebrow={clientData.gallery.eyebrow}
          title={clientData.gallery.title}
          description={clientData.gallery.subtitle}
        />

        <Reveal className="mt-10 flex flex-wrap justify-center gap-2.5" delay={80}>
          {filtros.map((opcao) => {
            const ativo = filtro === opcao;
            return (
              <button
                key={opcao}
                type="button"
                onClick={() => trocarFiltro(opcao)}
                aria-pressed={ativo}
                className={`min-h-10 rounded-full border px-5 font-sans text-[0.7rem] font-semibold tracking-[0.14em] uppercase transition ${
                  ativo
                    ? 'border-terracota bg-terracota text-creme'
                    : 'border-marrom/20 text-marrom hover:border-terracota hover:text-terracota'
                }`}
              >
                {opcao}
              </button>
            );
          })}
        </Reveal>

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {itens.map((item, indice) => (
            <Reveal
              as="li"
              key={item.id}
              delay={Math.min(indice, 6) * 60}
              /* Alterna alguns cards maiores para quebrar a rigidez da grade */
              className={indice % 5 === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}
            >
              <button
                type="button"
                onClick={() => setIndiceAberto(indice)}
                aria-label={`Ampliar imagem: ${item.alt}`}
                className="group relative block h-full w-full overflow-hidden rounded-xl bg-bege"
              >
                <SmartImage
                  src={item.src}
                  alt={item.alt}
                  className={`w-full transition-transform duration-700 ease-out group-hover:scale-105 ${
                    indice % 5 === 0 ? 'aspect-square lg:aspect-[4/3.4]' : 'aspect-square'
                  }`}
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center justify-center bg-marrom/0 opacity-0 transition-all duration-300 group-hover:bg-marrom/35 group-hover:opacity-100 group-focus-visible:bg-marrom/35 group-focus-visible:opacity-100"
                >
                  <Expand className="size-6 text-creme" />
                </span>
                <span className="absolute bottom-0 left-0 rounded-tr-xl bg-creme/85 px-3 py-1.5 font-sans text-[0.6rem] font-semibold tracking-[0.16em] text-marrom uppercase">
                  {item.category}
                </span>
              </button>
            </Reveal>
          ))}
        </ul>

        <p className="mt-8 text-center font-sans text-xs text-marrom-claro/70">
          As fotografias reais das peças e do atelier substituem estes espaços assim que forem
          adicionadas à pasta de imagens.
        </p>
      </div>

      <Lightbox
        itens={itens}
        indice={indiceAberto}
        aoFechar={() => setIndiceAberto(null)}
        aoNavegar={setIndiceAberto}
      />
    </section>
  );
}
