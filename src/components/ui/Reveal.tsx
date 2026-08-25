import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  /** Elemento HTML renderizado. Padrão: div. */
  as?: ElementType;
  /** Atraso da animação em milissegundos, para efeito escalonado em listas. */
  delay?: number;
  className?: string;
};

/**
 * Revela o conteúdo com um fade + slide-up suave quando ele entra na viewport.
 * A animação é anulada por CSS quando o usuário pede `prefers-reduced-motion`.
 */
export function Reveal({ children, as: Tag = 'div', delay = 0, className = '' }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  // Sem suporte a IntersectionObserver, o conteúdo já nasce visível.
  const [visivel, setVisivel] = useState(() => typeof IntersectionObserver === 'undefined');

  useEffect(() => {
    const elemento = ref.current;
    if (!elemento || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisivel(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
    );

    observer.observe(elemento);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visivel ? 'reveal-visivel' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
