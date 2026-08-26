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
      filtro === 'Todas' ? galleryItems : galleryItems.filter((item) => item.category === filtro),
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
      className="textura-papel bg-papel-escuro py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="galeria-titulo"
          numero={clientData.gallery.numero}
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
                className={`min-h-10 border px-5 font-sans text-[0.7rem] font-semibold tracking-[0.14em] uppercase transition ${
                  ativo
                    ? 'border-tijolo bg-tijolo text-papel'
                    : 'border-tinta/20 text-tinta hover:border-tijolo hover:text-tijolo'
                }`}
              >
                {opcao}
              </button>
            );
          })}
        </Reveal>

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {itens.map((item, indice) => (
            <li
              key={item.id}
              /* Alterna alguns blocos maiores para quebrar a rigidez da grade */
              className={indice % 5 === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}
            >
              <Reveal delay={Math.min(indice, 6) * 60} className="h-full">
                <button
                  type="button"
                  onClick={() => setIndiceAberto(indice)}
                  aria-label={`Ampliar imagem: ${item.alt}`}
                  className="group relative block h-full w-full overflow-hidden bg-papel-escuro"
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
                    className="absolute inset-0 flex items-center justify-center bg-tinta/0 opacity-0 transition-all duration-300 group-hover:bg-tinta/35 group-hover:opacity-100 group-focus-visible:bg-tinta/35 group-focus-visible:opacity-100"
                  >
                    <Expand className="size-6 text-papel" />
                  </span>
                  <span className="absolute bottom-0 left-0 bg-papel/85 px-3 py-1.5 font-sans text-[0.6rem] font-semibold tracking-[0.16em] text-tinta uppercase">
                    {item.category}
                  </span>
                </button>
              </Reveal>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-center font-sans text-xs text-tinta-suave/70">
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
