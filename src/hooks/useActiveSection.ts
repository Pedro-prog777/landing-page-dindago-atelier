import { useEffect, useState } from 'react';

/**
 * Retorna o id da seção visível no momento, para destacar o item ativo do menu.
 * Recebe os ids sem "#".
 */
export function useActiveSection(ids: string[]): string {
  const [ativo, setAtivo] = useState('');

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const secoes = ids
      .map((id) => document.getElementById(id))
      .filter((elemento): elemento is HTMLElement => elemento !== null);

    if (secoes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visivel = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visivel) setAtivo(visivel.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5] },
    );

    secoes.forEach((secao) => observer.observe(secao));
    return () => observer.disconnect();
  }, [ids]);

  return ativo;
}
