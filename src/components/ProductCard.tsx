import { MessageCircle } from 'lucide-react';
import { formatPrice, mensagemInteresse, type Product } from '../data/products';
import { buildWhatsAppUrl } from '../config/site';
import { SmartImage } from './ui/SmartImage';

type ProductCardProps = {
  product: Product;
  aoVerDetalhes: (product: Product) => void;
};

export function ProductCard({ product, aoVerDetalhes }: ProductCardProps) {
  const whatsappUrl = buildWhatsAppUrl(mensagemInteresse(product));

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-bege bg-creme transition-all duration-500 hover:-translate-y-1 hover:border-bege-escuro hover:shadow-[0_24px_44px_-30px_rgba(67,41,29,0.75)]">
      <div className="relative overflow-hidden bg-bege">
        <SmartImage
          src={product.image}
          alt={product.imageAlt}
          placeholderLabel="Foto da peça"
          className="aspect-4/5 w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        {product.badge && (
          <span className="absolute top-4 left-4 rounded-full bg-creme/90 px-3 py-1.5 font-sans text-[0.62rem] font-semibold tracking-[0.16em] text-terracota uppercase backdrop-blur-sm">
            {product.badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="font-sans text-[0.65rem] font-semibold tracking-[0.18em] text-terracota uppercase">
          {product.category}
        </p>
        <h3 className="mt-2 font-display text-xl font-normal text-marrom sm:text-[1.35rem]">
          {product.name}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-marrom-claro">
          {product.description}
        </p>

        <p className="mt-5 border-t border-bege pt-4 font-display text-lg text-barro">
          {formatPrice(product.price)}
        </p>

        {/* Empilhados sempre: em 4 colunas o card fica estreito demais para dois botões lado a lado. */}
        <div className="mt-5 flex flex-col gap-2.5">
          <button
            type="button"
            onClick={() => aoVerDetalhes(product)}
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full border border-marrom/25 px-4 font-sans text-[0.68rem] font-semibold tracking-[0.14em] text-marrom uppercase transition hover:border-marrom hover:bg-marrom hover:text-creme"
          >
            Ver detalhes
          </button>
          <a
            href={whatsappUrl ?? '#contato'}
            {...(whatsappUrl ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            aria-label={`Tenho interesse na peça ${product.name}`}
            className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full bg-terracota px-4 font-sans text-[0.68rem] font-semibold tracking-[0.14em] text-creme uppercase transition hover:bg-barro"
          >
            <MessageCircle className="size-3.5" aria-hidden="true" />
            Tenho interesse
          </a>
        </div>
      </div>
    </article>
  );
}
