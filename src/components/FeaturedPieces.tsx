import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { ProductCard, type VarianteProduto } from './ProductCard';
import { ProductDialog } from './ProductDialog';
import { Reveal } from './ui/Reveal';
import { Ornament } from './ui/Decorations';
import { clientData, type Produto } from '../data/clientData';

/**
 * Peças em composição editorial.
 *
 * Em vez de uma fileira de cards iguais, a grade mistura proporções: a
 * primeira peça ocupa um bloco alto de duas colunas, duas seguem em blocos
 * quadrados na coluna lateral e a última se abre em faixa horizontal.
 * Se o cliente cadastrar mais peças, as excedentes entram como compactas.
 */
const composicao: { variante: VarianteProduto; posicao: string }[] = [
  {
    variante: 'destaque',
    posicao: 'lg:col-span-2 lg:col-start-1 lg:row-span-2 lg:row-start-1',
  },
  {
    variante: 'compacto',
    posicao: 'lg:col-span-1 lg:col-start-3 lg:row-start-1',
  },
  {
    variante: 'compacto',
    posicao: 'lg:col-span-1 lg:col-start-3 lg:row-start-2',
  },
  { variante: 'largo', posicao: 'lg:col-span-3 lg:col-start-1 lg:row-start-3' },
];

export function FeaturedPieces() {
  const [pecaSelecionada, setPecaSelecionada] = useState<Produto | null>(null);
  const { productsSection, products } = clientData;

  return (
    <section
      id="pecas"
      aria-labelledby="pecas-titulo"
      className="relative bg-creme py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-368 px-4 sm:px-6 lg:px-10">
        {/* Cabeçalho editorial: título grande à esquerda, apoio à direita */}
        <div className="flex flex-col gap-8 border-b border-marrom/12 pb-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <Reveal className="max-w-2xl">
            <p className="mb-5 flex items-center gap-3 font-sans text-[0.62rem] font-semibold tracking-[0.3em] text-terracota uppercase">
              <Ornament lado="esquerda" className="w-12 text-ocre/70" />
              {productsSection.eyebrow}
            </p>
            <h2
              id="pecas-titulo"
              className="font-display text-[clamp(2.2rem,6vw,4.2rem)] leading-[0.95] font-light text-marrom"
            >
              {productsSection.title}
            </h2>
          </Reveal>

          <Reveal delay={100} className="lg:max-w-sm lg:pb-2">
            <p className="text-base leading-relaxed text-marrom-claro">
              {productsSection.subtitle}
            </p>
            <a
              href="#galeria"
              className="group mt-6 inline-flex items-center gap-3 font-sans text-[0.66rem] font-semibold tracking-[0.2em] text-marrom uppercase transition-colors hover:text-terracota"
            >
              {productsSection.ctaLabel}
              <span className="flex size-9 items-center justify-center rounded-full border border-marrom/25 transition-all duration-300 group-hover:border-terracota group-hover:bg-terracota group-hover:text-creme">
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </span>
            </a>
          </Reveal>
        </div>

        {/* Grade de proporções variadas */}
        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {products.map((product, indice) => {
            const arranjo = composicao[indice] ?? {
              variante: 'compacto' as const,
              posicao: '',
            };
            return (
              <li key={product.id} className={`h-full ${arranjo.posicao}`}>
                <Reveal delay={indice * 90} className="h-full">
                  <ProductCard
                    product={product}
                    variante={arranjo.variante}
                    indice={String(indice + 1).padStart(2, '0')}
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
