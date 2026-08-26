import { useRef } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { formatPrice, mensagemInteresse, type Product } from '../data/products';
import { buildWhatsAppUrl } from '../config/site';
import { useModalBehavior } from '../hooks/useModalBehavior';
import { SmartImage } from './ui/SmartImage';

type ProductDialogProps = {
  product: Product | null;
  aoFechar: () => void;
};

export function ProductDialog({ product, aoFechar }: ProductDialogProps) {
  const painelRef = useRef<HTMLDivElement>(null);
  useModalBehavior({ aberto: product !== null, aoFechar, containerRef: painelRef });

  if (!product) return null;

  const whatsappUrl = buildWhatsAppUrl(mensagemInteresse(product));

  return (
    <div className="fixed inset-0 z-70 flex items-end justify-center sm:items-center sm:p-6">
      <div
        className="absolute inset-0 bg-marrom/70 backdrop-blur-[2px]"
        onClick={aoFechar}
        aria-hidden="true"
      />

      <div
        ref={painelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="peca-titulo"
        className="relative flex max-h-[92dvh] w-full max-w-4xl flex-col overflow-hidden rounded-t-3xl bg-creme shadow-2xl sm:rounded-3xl"
      >
        <button
          type="button"
          onClick={aoFechar}
          aria-label="Fechar detalhes da peça"
          className="absolute top-4 right-4 z-10 flex size-10 items-center justify-center rounded-full bg-creme/90 text-marrom shadow-md transition hover:bg-terracota hover:text-creme"
        >
          <X className="size-5" aria-hidden="true" />
        </button>

        <div className="grid overflow-y-auto md:grid-cols-2">
          <div className="bg-bege">
            <SmartImage
              src={product.image}
              alt={product.imageAlt}
              placeholderLabel="Foto da peça"
              loading="eager"
              className="aspect-4/3 w-full md:aspect-auto md:h-full md:min-h-104"
            />
          </div>

          <div className="p-6 sm:p-8 lg:p-10">
            <p className="font-sans text-[0.65rem] font-semibold tracking-[0.18em] text-terracota uppercase">
              {product.category}
            </p>
            <h2
              id="peca-titulo"
              className="mt-3 font-display text-2xl font-light text-marrom sm:text-3xl"
            >
              {product.name}
            </h2>

            <p className="mt-5 text-base leading-relaxed text-marrom-claro">
              {product.description}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-marrom-claro/90">{product.story}</p>

            <dl className="mt-7 space-y-3 border-t border-bege pt-6">
              <div className="flex items-baseline justify-between gap-4">
                <dt className="font-sans text-[0.68rem] tracking-[0.16em] text-marrom-claro uppercase">
                  Valor
                </dt>
                <dd className="font-display text-xl text-barro">{formatPrice(product.price)}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="font-sans text-[0.68rem] tracking-[0.16em] text-marrom-claro uppercase">
                  Produção
                </dt>
                <dd className="text-right font-sans text-sm text-marrom">
                  Peça feita à mão, uma a uma
                </dd>
              </div>
            </dl>

            <a
              href={whatsappUrl ?? '#contato'}
              {...(whatsappUrl ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              onClick={aoFechar}
              className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-terracota px-6 font-sans text-xs font-semibold tracking-[0.14em] text-creme uppercase transition hover:bg-barro"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              {whatsappUrl ? 'Tenho interesse' : 'Falar com o atelier'}
            </a>

            <p className="mt-4 text-center font-sans text-xs text-marrom-claro/70">
              Cada peça é única — pequenas variações fazem parte do trabalho manual.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
