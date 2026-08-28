import { useSite } from '../conteudo/useSite';
import { useRef } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { mensagemInteresse } from '../data/products';
import type { Produto as Product } from '../data/clientData';
import { useModalBehavior } from '../hooks/useModalBehavior';
import { SmartImage } from './ui/SmartImage';

type ProductDialogProps = {
  product: Product | null;
  aoFechar: () => void;
};

export function ProductDialog({ product, aoFechar }: ProductDialogProps) {
  const { buildWhatsAppUrl, formatPrice } = useSite();
  const painelRef = useRef<HTMLDivElement>(null);
  useModalBehavior({
    aberto: product !== null,
    aoFechar,
    containerRef: painelRef,
  });

  if (!product) return null;

  const whatsappUrl = buildWhatsAppUrl(mensagemInteresse(product));

  return (
    <div className="fixed inset-0 z-70 flex items-end justify-center sm:items-center sm:p-6">
      <div
        className="absolute inset-0 bg-tinta/70 backdrop-blur-[2px]"
        onClick={aoFechar}
        aria-hidden="true"
      />

      <div
        ref={painelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="peca-titulo"
        className="relative flex max-h-[92dvh] w-full max-w-4xl flex-col overflow-hidden bg-papel shadow-2xl sm:"
      >
        <button
          type="button"
          onClick={aoFechar}
          aria-label="Fechar detalhes da peça"
          className="absolute top-4 right-4 z-10 flex size-10 items-center justify-center bg-papel/90 text-tinta shadow-md transition hover:bg-tijolo hover:text-papel"
        >
          <X className="size-5" aria-hidden="true" />
        </button>

        <div className="grid overflow-y-auto md:grid-cols-2">
          <div className="bg-papel-escuro">
            <SmartImage
              src={product.image}
              alt={product.imageAlt}
              placeholderLabel="Foto da peça"
              loading="eager"
              className="aspect-4/3 w-full md:aspect-auto md:h-full md:min-h-104"
            />
          </div>

          <div className="p-6 sm:p-8 lg:p-10">
            <p className="font-sans text-[0.65rem] font-semibold tracking-[0.18em] text-tijolo uppercase">
              {product.category}
            </p>
            <h2
              id="peca-titulo"
              className="mt-3 font-display text-2xl font-light text-tinta sm:text-3xl"
            >
              {product.name}
            </h2>

            <p className="mt-5 text-base leading-relaxed text-tinta-suave">{product.description}</p>
            <p className="mt-4 text-sm leading-relaxed text-tinta-suave/90">{product.story}</p>

            <dl className="mt-7 space-y-3 border-t border-papel-escuro pt-6">
              <div className="flex items-baseline justify-between gap-4">
                <dt className="font-sans text-[0.68rem] tracking-[0.16em] text-tinta-suave uppercase">
                  Valor
                </dt>
                <dd className="font-display text-xl text-tinta-suave">
                  {formatPrice(product.price)}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="font-sans text-[0.68rem] tracking-[0.16em] text-tinta-suave uppercase">
                  Produção
                </dt>
                <dd className="text-right font-sans text-sm text-tinta">
                  Peça feita à mão, uma a uma
                </dd>
              </div>
            </dl>

            <a
              href={whatsappUrl ?? '#contato'}
              {...(whatsappUrl ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              onClick={aoFechar}
              className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 bg-tijolo px-6 font-sans text-xs font-semibold tracking-[0.14em] text-papel uppercase transition hover:bg-tinta-suave"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              {whatsappUrl ? 'Tenho interesse' : 'Falar com o atelier'}
            </a>

            <p className="mt-4 text-center font-sans text-xs text-tinta-suave/70">
              Cada peça é única — pequenas variações fazem parte do trabalho manual.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
