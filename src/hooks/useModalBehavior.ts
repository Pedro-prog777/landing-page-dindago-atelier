import { useEffect, type RefObject } from 'react';

const SELETOR_FOCAVEL =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

type Options = {
  aberto: boolean;
  aoFechar: () => void;
  containerRef: RefObject<HTMLElement | null>;
};

/**
 * Comportamento compartilhado por diálogos (busca, detalhes da peça, lightbox):
 * trava o scroll do fundo, fecha com Esc, prende o foco dentro do diálogo e
 * devolve o foco ao elemento que abriu o modal.
 */
export function useModalBehavior({ aberto, aoFechar, containerRef }: Options) {
  useEffect(() => {
    if (!aberto) return;

    const elementoAnterior = document.activeElement as HTMLElement | null;
    const scrollBarra = window.innerWidth - document.documentElement.clientWidth;
    const overflowOriginal = document.body.style.overflow;
    const paddingOriginal = document.body.style.paddingRight;

    document.body.style.overflow = 'hidden';
    // Evita o "pulo" horizontal ao esconder a barra de rolagem.
    if (scrollBarra > 0) document.body.style.paddingRight = `${scrollBarra}px`;

    // Foca o primeiro elemento interativo do diálogo.
    const container = containerRef.current;
    const focaveis = container?.querySelectorAll<HTMLElement>(SELETOR_FOCAVEL);
    (focaveis?.[0] ?? container)?.focus();

    function aoPressionarTecla(evento: KeyboardEvent) {
      if (evento.key === 'Escape') {
        evento.stopPropagation();
        aoFechar();
        return;
      }

      if (evento.key !== 'Tab') return;

      const alvos = containerRef.current?.querySelectorAll<HTMLElement>(SELETOR_FOCAVEL);
      if (!alvos || alvos.length === 0) return;

      const primeiro = alvos[0];
      const ultimo = alvos[alvos.length - 1];

      if (evento.shiftKey && document.activeElement === primeiro) {
        evento.preventDefault();
        ultimo.focus();
      } else if (!evento.shiftKey && document.activeElement === ultimo) {
        evento.preventDefault();
        primeiro.focus();
      }
    }

    document.addEventListener('keydown', aoPressionarTecla);

    return () => {
      document.removeEventListener('keydown', aoPressionarTecla);
      document.body.style.overflow = overflowOriginal;
      document.body.style.paddingRight = paddingOriginal;
      elementoAnterior?.focus?.();
    };
  }, [aberto, aoFechar, containerRef]);
}
