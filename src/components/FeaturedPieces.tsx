import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { ProductDialog } from './ProductDialog';
import { Button } from './ui/Button';
import { Reveal } from './ui/Reveal';
import { SectionHeading } from './ui/SectionHeading';
import { clientData, type Produto } from '../data/clientData';

export function FeaturedPieces() {
  const [pecaSelecionada, setPecaSelecionada] = useState<Produto | null>(null);
  const { productsSection, products } = clientData;

  return (
    <section id="pecas" aria-labelledby="pecas-titulo" className="bg-creme py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="pecas-titulo"
            eyebrow={productsSection.eyebrow}
            title={productsSection.title}
            description={productsSection.subtitle}
            ornamentos
            className="mx-auto lg:mx-0"
          />

          <Reveal delay={120} className="flex justify-center lg:shrink-0 lg:pb-2">
            <Button href="#galeria" variant="outline">
              {productsSection.ctaLabel}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </Reveal>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
          {products.map((product, indice) => (
            <Reveal as="li" key={product.id} delay={indice * 90} className="h-full">
              <ProductCard product={product} aoVerDetalhes={setPecaSelecionada} />
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-14 flex flex-col items-center gap-4 text-center">
          <p className="max-w-xl text-sm leading-relaxed text-marrom-claro">
            Trabalhamos com lojistas, arquitetos, decoradores e colecionadores. Peças em produção
            e coleções completas são apresentadas sob consulta.
          </p>
          <Button href="#encomendas" variant="outline">
            Quero uma peça personalizada
          </Button>
        </Reveal>
      </div>

      <ProductDialog product={pecaSelecionada} aoFechar={() => setPecaSelecionada(null)} />
    </section>
  );
}
