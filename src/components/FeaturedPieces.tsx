import { useSite } from '../conteudo/useSite';
import { useCallback, useEffect, useState } from 'react';
import { ProductCard } from './ProductCard';
import { ProductDialog } from './ProductDialog';
import { Reveal } from './ui/Reveal';
import { LinkEditorial } from './ui/Button';
import { Caderno } from './ui/Catalogo';
import { Arabesco } from './ui/Decorations';
import { aoAbrirPeca } from '../lib/eventos';

function arranjo(indice: number): { destaque: boolean; classe: string } {
  const posicao = indice % 10;
  if (posicao === 0) return { destaque: true, classe: 'col-span-2 md:row-span-2' };
  if (posicao === 5) return { destaque: true, classe: 'col-span-2 md:col-start-3 md:row-span-2' };
  return { destaque: false, classe: '' };
}

export function FeaturedPieces() {
  const { conteudo: clientData } = useSite();
  const { productsSection, products } = clientData;
  const [aberta, setAberta] = useState<number | null>(null);
  const fechar = useCallback(() => setAberta(null), []);

  // Um resultado da busca pode pedir para abrir uma peça específica.
  useEffect(
    () =>
      aoAbrirPeca((id) => {
        const indice = products.findIndex((peca) => peca.id === id);
        if (indice >= 0) setAberta(indice);
      }),
    [products],
  );

  return (
    <section
      id="pecas"
      aria-labelledby="pecas-titulo"
      className="grao bg-papel py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Caderno
          numero={productsSection.numero}
          titulo={productsSection.eyebrow}
          nota={`${products.length} obras`}
        />

        <div className="grid gap-6 pt-8 lg:grid-cols-12 lg:items-end lg:gap-10 lg:pt-12">
          <Reveal className="lg:col-span-7">
            <h2
              id="pecas-titulo"
              className="flex flex-wrap items-center gap-5 text-[clamp(2.1rem,4.6vw,3.75rem)]"
            >
              <Arabesco className="hidden w-14 shrink-0 text-ocre/70 sm:block" />
              {productsSection.title}
            </h2>
          </Reveal>

          <Reveal delay={90} className="lg:col-span-4 lg:col-start-9 lg:pb-2">
            <p className="text-base leading-relaxed text-tinta-suave">{productsSection.subtitle}</p>
            <LinkEditorial href="#encomendas" className="mt-3">
              {productsSection.ctaLabel}
            </LinkEditorial>
          </Reveal>
        </div>

        {/* Mosaico de pranchas */}
        <ul className="grid grid-flow-row-dense grid-cols-2 gap-x-3 gap-y-9 pt-10 sm:gap-x-5 md:grid-cols-4 md:gap-y-10 lg:gap-x-8 lg:gap-y-12 lg:pt-14">
          {products.map((product, indice) => {
            const { destaque, classe } = arranjo(indice);
            return (
              <li key={product.id} className={classe}>
                <Reveal delay={(indice % 4) * 70} className="h-full">
                  <ProductCard
                    product={product}
                    figura={String(indice + 1).padStart(2, '0')}
                    destaque={destaque}
                    aoVerDetalhes={() => setAberta(indice)}
                  />
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>

      <ProductDialog produtos={products} indice={aberta} aoNavegar={setAberta} aoFechar={fechar} />
    </section>
  );
}
