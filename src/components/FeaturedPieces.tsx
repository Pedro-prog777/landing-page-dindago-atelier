import { useState } from 'react';
import { products, type Product } from '../data/products';
import { ProductCard } from './ProductCard';
import { ProductDialog } from './ProductDialog';
import { Button } from './ui/Button';
import { Reveal } from './ui/Reveal';
import { SectionHeading } from './ui/SectionHeading';

export function FeaturedPieces() {
  const [pecaSelecionada, setPecaSelecionada] = useState<Product | null>(null);

  return (
    <section
      id="pecas"
      aria-labelledby="pecas-titulo"
      className="bg-creme py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="pecas-titulo"
          eyebrow="Coleções"
          title="Peças em destaque"
          description="Esculturas em papel-machê que celebram a vida, a memória e a cultura popular."
        />

        <ul className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
          {products.map((product, indice) => (
            <Reveal as="li" key={product.id} delay={indice * 90} className="h-full">
              <ProductCard product={product} aoVerDetalhes={setPecaSelecionada} />
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-14 flex flex-col items-center gap-4 text-center">
          <p className="max-w-xl text-sm leading-relaxed text-marrom-claro">
            Trabalhamos com lojistas, arquitetos, decoradores e colecionadores. Peças em
            produção e coleções completas são apresentadas sob consulta.
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
