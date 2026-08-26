import { useState } from 'react';
import { ProductCard } from './ProductCard';
import { ProductDialog } from './ProductDialog';
import { Reveal } from './ui/Reveal';
import { LinkEditorial } from './ui/Button';
import { Caderno } from './ui/Catalogo';
import { clientData, type Produto } from '../data/clientData';

/**
 * Caderno de coleções — espelho de catálogo.
 *
 * As pranchas não formam uma fileira: cada uma ocupa uma faixa de colunas
 * diferente e entra numa altura própria, como as imagens de um espelho de
 * revista. Se o cliente cadastrar mais peças, as excedentes seguem o último
 * arranjo da lista.
 */
const arranjos = [
  { posicao: 'lg:col-span-6 lg:col-start-1', proporcao: 'aspect-4/3' },
  { posicao: 'lg:col-span-4 lg:col-start-8 lg:mt-20', proporcao: 'aspect-3/4' },
  { posicao: 'lg:col-span-3 lg:col-start-1 lg:mt-2', proporcao: 'aspect-square' },
  { posicao: 'lg:col-span-6 lg:col-start-5 lg:mt-16', proporcao: 'aspect-[16/10]' },
];

export function FeaturedPieces() {
  const [pecaSelecionada, setPecaSelecionada] = useState<Produto | null>(null);
  const { productsSection, products } = clientData;

  return (
    <section
      id="pecas"
      aria-labelledby="pecas-titulo"
      className="grao bg-papel py-16 sm:py-20 lg:py-24"
    >
      <div className="px-4 sm:px-6 lg:px-10">
        <Caderno
          numero={productsSection.numero}
          titulo={productsSection.eyebrow}
          nota={`${products.length} pranchas`}
        />

        <div className="grid gap-8 pt-10 lg:grid-cols-12 lg:gap-10 lg:pt-14">
          <Reveal className="lg:col-span-7">
            <h2 id="pecas-titulo" className="text-[clamp(2.2rem,6vw,4.75rem)]">
              {productsSection.title}
            </h2>
          </Reveal>

          <Reveal delay={90} className="lg:col-span-4 lg:col-start-9 lg:pb-2">
            <p className="text-base leading-relaxed text-tinta-suave">{productsSection.subtitle}</p>
            <LinkEditorial href="#galeria" className="mt-5">
              {productsSection.ctaLabel}
            </LinkEditorial>
          </Reveal>
        </div>

        {/* Espelho de pranchas */}
        <ul className="grid grid-cols-1 gap-x-10 gap-y-16 pt-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-y-4 lg:pt-20">
          {products.map((product, indice) => {
            const arranjo = arranjos[indice] ?? arranjos[arranjos.length - 1];
            return (
              <li key={product.id} className={`h-full ${arranjo.posicao}`}>
                <Reveal delay={(indice % 2) * 90} className="h-full">
                  <ProductCard
                    product={product}
                    figura={String(indice + 1).padStart(2, '0')}
                    proporcao={arranjo.proporcao}
                    aoVerDetalhes={setPecaSelecionada}
                  />
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>

      <ProductDialog product={pecaSelecionada} aoFechar={() => setPecaSelecionada(null)} />
    </section>
  );
}
