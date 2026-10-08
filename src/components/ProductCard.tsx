import { Plus } from 'lucide-react';
import { useSite } from '../conteudo/useSite';
import type { Produto as Product } from '../data/clientData';
import { SmartImage } from './ui/SmartImage';

type ProductCardProps = {
  product: Product;
  /** Numeração da prancha, no padrão "02". */
  figura: string;
  /** Prancha grande do mosaico: ganha a descrição curta e o selo. */
  destaque?: boolean;
  aoVerDetalhes: () => void;
};

/**
 * Prancha de peça.
 *
 * Sem moldura nem sombra: a fotografia e, abaixo dela, a legenda impressa —
 * numeração, nome e, nas pranchas grandes, a descrição curta. A prancha
 * inteira é clicável: o botão fica no nome (é ele que o leitor de tela anuncia)
 * e um pseudo-elemento estende a área de clique sobre a imagem.
 */
export function ProductCard({ product, figura, destaque = false, aoVerDetalhes }: ProductCardProps) {
  const { formatPrice } = useSite();

  return (
    <article className="group/peca relative flex h-full flex-col">
      <div
        className={`relative overflow-hidden bg-areia ${
          destaque ? 'aspect-square sm:aspect-4/5 md:aspect-auto md:min-h-0 md:flex-1' : 'aspect-4/5'
        }`}
      >
        <SmartImage
          src={product.image}
          alt={product.imageAlt}
          placeholderLabel="Peça"
          figura={figura}
          className="absolute inset-0 size-full object-[50%_30%] transition-transform duration-[1.2s] ease-out group-hover/peca:scale-[1.05]"
        />

        {/* Véu leve no hover: a prancha "acende" sem mudar de lugar */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-tinta/0 transition-colors duration-500 group-hover/peca:bg-tinta/10"
        />

        {destaque && product.badge && (
          <span className="etiqueta absolute top-3 left-3 bg-papel/95 px-2.5 py-1 text-tijolo">
            {product.badge}
          </span>
        )}

        {/* Sinal de "ver detalhes": sempre visível no toque, revelado no hover */}
        <span
          aria-hidden="true"
          className="absolute right-2.5 bottom-2.5 flex size-9 items-center justify-center bg-papel text-tinta shadow-md transition duration-300 group-hover/peca:bg-tijolo group-hover/peca:text-papel sm:right-3 sm:bottom-3 sm:size-10 [@media(hover:hover)]:translate-y-1.5 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover/peca:translate-y-0 [@media(hover:hover)]:group-hover/peca:opacity-100 [@media(hover:hover)]:group-focus-within/peca:translate-y-0 [@media(hover:hover)]:group-focus-within/peca:opacity-100"
        >
          <Plus className="size-4" strokeWidth={2} />
        </span>
      </div>

      {/* Legenda impressa */}
      <div className="pt-3">
        <p className="etiqueta flex flex-wrap gap-x-2 text-tinta-suave">
          <span>fig. {figura}</span>
          {!destaque && product.badge && (
            <span className="hidden text-tijolo sm:inline">· {product.badge}</span>
          )}
        </p>

        <h3
          className={`mt-1.5 font-display leading-[1.1] text-tinta transition-colors duration-300 group-hover/peca:text-tijolo ${
            destaque ? 'text-[1.6rem] sm:text-3xl lg:text-[2.2rem]' : 'text-lg sm:text-xl lg:text-[1.45rem]'
          }`}
        >
          <button
            type="button"
            onClick={aoVerDetalhes}
            aria-haspopup="dialog"
            className="cursor-pointer text-left after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-tijolo"
          >
            {product.name}
            <span className="sr-only"> — ver detalhes</span>
          </button>
        </h3>

        {destaque && (
          <p className="mt-2 hidden max-w-md text-sm leading-relaxed text-tinta-suave sm:block">
            {product.description}
          </p>
        )}

        {/* Preço só aparece quando definido; "Consultar valor" fica no detalhe. */}
        {product.price !== null && (
          <p className="mt-1.5 font-display text-base text-tijolo">{formatPrice(product.price)}</p>
        )}
      </div>
    </article>
  );
}
