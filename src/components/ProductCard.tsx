import { formatPrice } from '../config/site';
import { buildWhatsAppUrl } from '../config/site';
import { mensagemInteresse, type Product } from '../data/products';
import { LinkEditorial } from './ui/Button';
import { SmartImage } from './ui/SmartImage';

type ProductCardProps = {
  product: Product;
  /** Numeração da prancha, no padrão "02". */
  figura: string;
  /** Proporção da prancha — cada peça ocupa a sua na composição. */
  proporcao?: string;
  aoVerDetalhes: (product: Product) => void;
};

/**
 * Prancha de peça.
 *
 * A peça deixou de morar num card: não há moldura, sombra nem botão dentro de
 * caixa. Existe a prancha e, abaixo dela, a legenda impressa — numeração,
 * nome, técnica, valor e as chamadas em forma de link editorial. O conjunto
 * inteiro é a peça; o que muda entre elas é só a proporção da prancha.
 */
export function ProductCard({
  product,
  figura,
  proporcao = 'aspect-4/5',
  aoVerDetalhes,
}: ProductCardProps) {
  const whatsappUrl = buildWhatsAppUrl(mensagemInteresse(product));

  return (
    <article className="group flex h-full flex-col">
      <button
        type="button"
        onClick={() => aoVerDetalhes(product)}
        aria-label={`Ver detalhes da peça ${product.name}`}
        className="block w-full cursor-pointer overflow-hidden bg-areia text-left"
      >
        <SmartImage
          src={product.image}
          alt={product.imageAlt}
          placeholderLabel="Peça"
          figura={figura}
          className={`w-full ${proporcao} transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]`}
        />
      </button>

      {/* Legenda impressa */}
      <div className="flex flex-1 flex-col border-t border-tinta/15 pt-4">
        <div className="flex items-baseline justify-between gap-4">
          <span className="etiqueta text-tinta/40">fig. {figura}</span>
          {product.badge && <span className="etiqueta text-tijolo">{product.badge}</span>}
        </div>

        <h3 className="mt-2.5 font-display text-2xl leading-tight sm:text-[1.7rem]">
          {product.name}
        </h3>
        <p className="mt-1 text-[0.82rem] text-tinta/50">{product.category}</p>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-tinta-suave">
          {product.description}
        </p>

        <p className="mt-4 font-display text-lg text-tijolo">{formatPrice(product.price)}</p>

        <div className="mt-3 flex flex-wrap items-center gap-x-8">
          <button
            type="button"
            onClick={() => aoVerDetalhes(product)}
            className="group/l inline-flex items-center gap-4 py-2 text-tinta transition-colors duration-300 hover:text-tijolo"
          >
            <span className="etiqueta sublinhado">Ver detalhes</span>
            <span
              aria-hidden="true"
              className="h-px w-8 bg-current transition-all duration-500 group-hover/l:w-14"
            />
          </button>

          <LinkEditorial
            href={whatsappUrl ?? '#contato'}
            aria-label={`Tenho interesse na peça ${product.name}`}
          >
            Tenho interesse
          </LinkEditorial>
        </div>
      </div>
    </article>
  );
}
