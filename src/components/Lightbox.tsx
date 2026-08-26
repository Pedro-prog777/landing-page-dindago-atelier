import { useCallback, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { GalleryItem } from '../data/gallery';
import { useModalBehavior } from '../hooks/useModalBehavior';
import { SmartImage } from './ui/SmartImage';

type LightboxProps = {
  itens: GalleryItem[];
  /** Índice da imagem aberta, ou `null` quando o lightbox está fechado. */
  indice: number | null;
  aoFechar: () => void;
  aoNavegar: (novoIndice: number) => void;
};

export function Lightbox({ itens, indice, aoFechar, aoNavegar }: LightboxProps) {
  const painelRef = useRef<HTMLDivElement>(null);
  const aberto = indice !== null && itens.length > 0;

  useModalBehavior({ aberto, aoFechar, containerRef: painelRef });

  const irPara = useCallback(
    (passo: number) => {
      if (indice === null) return;
      const total = itens.length;
      aoNavegar((indice + passo + total) % total);
    },
    [indice, itens.length, aoNavegar],
  );

  // Navegação por teclado entre as imagens (Esc é tratado pelo useModalBehavior).
  useEffect(() => {
    if (!aberto) return;

    function aoPressionar(evento: KeyboardEvent) {
      if (evento.key === 'ArrowRight') {
        evento.preventDefault();
        irPara(1);
      } else if (evento.key === 'ArrowLeft') {
        evento.preventDefault();
        irPara(-1);
      }
    }

    document.addEventListener('keydown', aoPressionar);
    return () => document.removeEventListener('keydown', aoPressionar);
  }, [aberto, irPara]);

  if (!aberto || indice === null) return null;

  const item = itens[indice];

  return (
    <div className="fixed inset-0 z-80 flex items-center justify-center p-4 sm:p-8">
      <div
        className="absolute inset-0 bg-marrom/92"
        onClick={aoFechar}
        aria-hidden="true"
      />

      <div
        ref={painelRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Imagem ${indice + 1} de ${itens.length}: ${item.alt}`}
        className="relative flex max-h-full w-full max-w-5xl flex-col items-center"
      >
        <div className="flex w-full items-center justify-between gap-4 pb-4">
          <p className="font-sans text-xs tracking-[0.18em] text-creme/70 uppercase">
            {item.category} · {indice + 1}/{itens.length}
          </p>
          <button
            type="button"
            onClick={aoFechar}
            aria-label="Fechar galeria"
            className="flex size-11 items-center justify-center rounded-full border border-creme/25 text-creme transition hover:bg-creme hover:text-marrom"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <div className="relative flex w-full flex-1 items-center justify-center overflow-hidden rounded-2xl bg-marrom-claro/30">
          <SmartImage
            src={item.src}
            alt={item.alt}
            placeholderLabel="Fotografia em breve"
            loading="eager"
            className="max-h-[68dvh] w-full object-contain"
          />
        </div>

        <div className="mt-4 flex w-full items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => irPara(-1)}
            aria-label="Imagem anterior"
            className="flex size-12 items-center justify-center rounded-full border border-creme/25 text-creme transition hover:bg-creme hover:text-marrom"
          >
            <ChevronLeft className="size-6" aria-hidden="true" />
          </button>

          <p className="flex-1 text-center font-sans text-sm text-creme/80">{item.alt}</p>

          <button
            type="button"
            onClick={() => irPara(1)}
            aria-label="Próxima imagem"
            className="flex size-12 items-center justify-center rounded-full border border-creme/25 text-creme transition hover:bg-creme hover:text-marrom"
          >
            <ChevronRight className="size-6" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
