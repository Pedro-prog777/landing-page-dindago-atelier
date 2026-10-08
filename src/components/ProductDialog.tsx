import { useSite } from '../conteudo/useSite';
import { useCallback, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, MessageCircle, X } from 'lucide-react';
import { WhatsAppIcon } from './ui/BrandIcons';
import { mensagemInteresse } from '../data/products';
import type { Produto as Product } from '../data/clientData';
import { useModalBehavior } from '../hooks/useModalBehavior';
import { preencherContato } from '../lib/eventos';
import { SmartImage } from './ui/SmartImage';

type ProductDialogProps = {
  produtos: Product[];
  /** Índice da peça aberta; `null` com o diálogo fechado. */
  indice: number | null;
  aoNavegar: (indice: number) => void;
  aoFechar: () => void;
};

/**
 * Detalhe da peça.
 *
 * A fotografia aparece inteira (`object-contain`): no mosaico ela é recortada
 * para caber na grade, mas aqui o visitante precisa ver a escultura toda. As
 * setas — na tela e no teclado — percorrem a coleção sem fechar o diálogo.
 */
export function ProductDialog({ produtos, indice, aoNavegar, aoFechar }: ProductDialogProps) {
  const { buildWhatsAppUrl, conteudo, formatPrice } = useSite();
  const painelRef = useRef<HTMLDivElement>(null);
  const product = indice === null ? undefined : produtos[indice];
  const aberto = product !== undefined;
  const total = produtos.length;

  useModalBehavior({ aberto, aoFechar, containerRef: painelRef });

  const anterior = useCallback(() => {
    if (indice !== null) aoNavegar((indice - 1 + total) % total);
  }, [aoNavegar, indice, total]);

  const proxima = useCallback(() => {
    if (indice !== null) aoNavegar((indice + 1) % total);
  }, [aoNavegar, indice, total]);

  useEffect(() => {
    if (!aberto || total < 2) return;
    function aoPressionarTecla(evento: KeyboardEvent) {
      if (evento.key === 'ArrowLeft') anterior();
      if (evento.key === 'ArrowRight') proxima();
    }
    document.addEventListener('keydown', aoPressionarTecla);
    return () => document.removeEventListener('keydown', aoPressionarTecla);
  }, [aberto, anterior, proxima, total]);

  if (!product || indice === null) return null;

  const whatsappUrl = buildWhatsAppUrl(mensagemInteresse(product));
  const figura = String(indice + 1).padStart(2, '0');

  /** Sem WhatsApp, "Tenho interesse" leva ao formulário já preenchido. */
  function irParaContato() {
    preencherContato({
      assunto: conteudo.contact.subjects[0],
      mensagem: `Olá! Tenho interesse na peça “${product!.name}”. Poderia me contar mais sobre ela (dimensões, disponibilidade e valor)?`,
    });
    aoFechar();
  }

  const detalhes = [
    { rotulo: 'Técnica', valor: product.category },
    {
      rotulo: 'Produção',
      valor: product.badge ? `${product.badge}, feita à mão` : 'Feita à mão',
    },
    { rotulo: 'Valor', valor: formatPrice(product.price) },
  ];

  return (
    <div className="fixed inset-0 z-70 flex items-end justify-center sm:items-center sm:p-6">
      <div
        className="absolute inset-0 animate-surgir bg-tinta/75 backdrop-blur-[2px]"
        onClick={aoFechar}
        aria-hidden="true"
      />

      <div
        ref={painelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="peca-titulo"
        aria-describedby="peca-descricao"
        className="relative flex max-h-[94dvh] w-full max-w-5xl animate-subir flex-col overflow-hidden bg-papel shadow-2xl md:flex-row"
      >
        <button
          type="button"
          onClick={aoFechar}
          aria-label="Fechar detalhes da peça"
          className="absolute top-3 right-3 z-10 flex size-11 items-center justify-center bg-papel text-tinta shadow-md transition hover:bg-tijolo hover:text-papel"
        >
          <X className="size-5" aria-hidden="true" />
        </button>

        {/* Fotografia inteira + navegação */}
        <div className="relative shrink-0 bg-papel-escuro md:w-[52%]">
          <SmartImage
            key={product.id}
            src={product.image}
            alt={product.imageAlt}
            placeholderLabel="Foto da peça"
            figura={figura}
            loading="eager"
            className="h-[40dvh] w-full object-contain! p-4 sm:h-[46dvh] md:h-[min(84dvh,46rem)] md:p-6"
          />

          {total > 1 && (
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-3">
              <span className="etiqueta bg-papel/95 px-2.5 py-1.5 text-tinta-media">
                {figura} / {String(total).padStart(2, '0')}
              </span>
              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={anterior}
                  aria-label="Peça anterior"
                  className="flex size-11 items-center justify-center bg-papel text-tinta shadow-md transition hover:bg-tinta hover:text-papel"
                >
                  <ChevronLeft className="size-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={proxima}
                  aria-label="Próxima peça"
                  className="flex size-11 items-center justify-center bg-papel text-tinta shadow-md transition hover:bg-tinta hover:text-papel"
                >
                  <ChevronRight className="size-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Ficha da peça */}
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-6 sm:p-8 lg:p-10">
          <p className="etiqueta pr-12 text-tijolo">fig. {figura} — Coleção {conteudo.company.name}</p>
          <h2 id="peca-titulo" className="mt-3 pr-10 font-display text-3xl leading-[1.05] sm:text-4xl">
            {product.name}
          </h2>

          <p id="peca-descricao" className="mt-5 text-base leading-relaxed text-tinta-media">
            {product.description}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-tinta-suave">{product.story}</p>

          <dl className="mt-7 divide-y divide-tinta/10 border-y border-tinta/10">
            {detalhes.map((item) => (
              <div key={item.rotulo} className="flex items-baseline justify-between gap-4 py-3">
                <dt className="etiqueta text-tinta-suave">{item.rotulo}</dt>
                <dd className="text-right font-display text-lg text-tinta">{item.valor}</dd>
              </div>
            ))}
          </dl>

          {/* No celular a chamada fica presa ao pé do painel: sempre à mão, sem rolar. */}
          <div className="sticky bottom-0 -mx-6 mt-auto -mb-6 border-t border-tinta/10 bg-papel px-6 pt-4 pb-5 sm:-mx-8 sm:-mb-8 sm:px-8 md:static md:mx-0 md:mb-0 md:border-0 md:bg-transparent md:px-0 md:pt-7 md:pb-0">
            {whatsappUrl ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-13 w-full items-center justify-center gap-2.5 bg-cacto px-6 font-sans text-xs font-semibold tracking-[0.16em] text-papel uppercase transition hover:bg-tinta"
              >
                <WhatsAppIcon className="size-5" aria-hidden="true" />
                Tenho interesse — WhatsApp
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            ) : (
              <a
                href="#contato"
                onClick={irParaContato}
                className="inline-flex min-h-13 w-full items-center justify-center gap-2.5 bg-tijolo px-6 font-sans text-xs font-semibold tracking-[0.16em] text-papel uppercase transition hover:bg-tinta"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                Tenho interesse nesta peça
              </a>
            )}
            <p className="mt-3 text-center font-sans text-xs leading-relaxed text-tinta-suave">
              Cada peça é única — pequenas variações fazem parte do trabalho manual.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
