import type { SVGProps } from 'react';

/**
 * ============================================================================
 * ELEMENTOS DECORATIVOS
 * ----------------------------------------------------------------------------
 * Desenhos em traço fino que compõem a atmosfera nordestina da página: sol,
 * cactos, pássaros, flores, a borda de papel rasgado entre as seções e os
 * ornamentos que acompanham os títulos.
 *
 * Todos são puramente visuais — sempre renderizados com `aria-hidden`, sem
 * peso para leitores de tela e sem custo de rede (SVG inline).
 * ============================================================================
 */

const traco = {
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

/** Sol com raios — usado no hero e como ícone de "identidade nordestina". */
export function SunRays({ strokeWidth = 1.5, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 44" {...traco} strokeWidth={strokeWidth} aria-hidden="true" {...props}>
      <path d="M14 40h36" />
      <path d="M20 40a12 12 0 0 1 24 0" />
      <path d="M32 6v8M18 12l5 6M46 12l-5 6M8 24l7 3M56 24l-7 3" />
      <path d="M24 40q8-9 16 0" opacity="0.55" />
    </svg>
  );
}

/** Cacto do sertão — moldura lateral das seções. */
export function Cactus({ strokeWidth = 1.5, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 64" {...traco} strokeWidth={strokeWidth} aria-hidden="true" {...props}>
      <path d="M20 62V20" />
      <path d="M20 46h-6a6 6 0 0 1-6-6V30" />
      <path d="M20 38h6a6 6 0 0 0 6-6v-6" />
      <path d="M14 20a6 6 0 0 1 12 0" />
      <path d="M12 62h16" />
      <circle cx="20" cy="14" r="2.2" opacity="0.6" />
    </svg>
  );
}

/** Pássaros em voo — pontuação leve sobre fundos claros. */
export function Birds({ strokeWidth = 1.5, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 28" {...traco} strokeWidth={strokeWidth} aria-hidden="true" {...props}>
      <path d="M4 14q5-6 10 0q5-6 10 0" />
      <path d="M32 6q4-5 8 0q4-5 8 0" opacity="0.7" />
      <path d="M40 22q3.5-4 7 0q3.5-4 7 0" opacity="0.5" />
    </svg>
  );
}

/** Pássaro isolado — ícone de "memória que permanece". */
export function Bird({ strokeWidth = 1.5, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" {...traco} strokeWidth={strokeWidth} aria-hidden="true" {...props}>
      <path d="M8 30q6-14 18-14 8 0 12 6" />
      <path d="M38 22q4 1 4 5t-5 6q-9 4-19 0" />
      <path d="M20 22q4 4 2 10" />
      <circle cx="34" cy="20" r="1.3" fill="currentColor" stroke="none" />
      <path d="M12 40q10 3 20 0" opacity="0.5" />
    </svg>
  );
}

/** Flor — ícone de "cultura que conecta". */
export function Flower({ strokeWidth = 1.5, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" {...traco} strokeWidth={strokeWidth} aria-hidden="true" {...props}>
      <circle cx="24" cy="20" r="4.5" />
      <path d="M24 15.5q-3-6 0-9.5 3 3.5 0 9.5" />
      <path d="M28.5 20q6-3 9.5 0-3.5 3-9.5 0" />
      <path d="M24 24.5q3 6 0 9.5-3-3.5 0-9.5" />
      <path d="M19.5 20q-6-3-9.5 0 3.5 3 9.5 0" />
      <path d="M24 34v10M24 38q-5 0-7-4" opacity="0.65" />
    </svg>
  );
}

/** Mãos acolhendo um coração — ícone de "feito à mão". */
export function HandsHeart({ strokeWidth = 1.5, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" {...traco} strokeWidth={strokeWidth} aria-hidden="true" {...props}>
      <path d="M24 22q-3-4-6.5-2t-1 6L24 32l7.5-6q2.5-4-1-6T24 22z" />
      <path d="M14 26q-5 2-6 7t2 9h28q3-4 2-9t-6-7" />
      <path d="M14 26v8M34 26v8" opacity="0.5" />
    </svg>
  );
}

/** Folha — ícone de "sustentável". */
export function LeafIcon({ strokeWidth = 1.5, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" {...traco} strokeWidth={strokeWidth} aria-hidden="true" {...props}>
      <path d="M38 10q4 18-8 26T12 40q-4-18 8-26T38 10z" />
      <path d="M32 16 14 38" />
      <path d="M30 24l-8-1M26 30l-8-1" opacity="0.6" />
    </svg>
  );
}

/** Caixa de presente — ícone de "encomendas". */
export function GiftIcon({ strokeWidth = 1.5, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" {...traco} strokeWidth={strokeWidth} aria-hidden="true" {...props}>
      <rect x="9" y="20" width="30" height="20" rx="2.5" />
      <path d="M7 14h34v6H7z" />
      <path d="M24 14v26" />
      <path d="M24 14q-8-1-8-5t8 5zM24 14q8-1 8-5t-8 5z" />
    </svg>
  );
}

/**
 * Borda de papel rasgado entre as seções.
 * `posicao` define para que lado a "rasgadura" aponta.
 */
export function TornEdge({
  posicao = 'bottom',
  className = '',
}: {
  posicao?: 'top' | 'bottom';
  className?: string;
}) {
  // Coordenadas absolutas terminando exatamente em x=0: com segmentos relativos
  // a soma não fecha na borda esquerda e sobra uma falha na faixa.
  const caminho =
    posicao === 'bottom'
      ? 'M0 0H1440V20C1380 30 1320 10 1260 18S1140 34 1080 24 960 6 900 16 780 32 720 22 600 4 540 14 420 30 360 20 240 2 180 12 60 28 0 18Z'
      : 'M0 44H1440V24C1380 14 1320 34 1260 26S1140 10 1080 20 960 38 900 28 780 12 720 22 600 40 540 30 420 14 360 24 240 42 180 32 60 16 0 26Z';

  return (
    <svg
      viewBox="0 0 1440 44"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`block h-6 w-full sm:h-8 lg:h-11 ${className}`}
    >
      <path d={caminho} fill="currentColor" />
    </svg>
  );
}

/**
 * Ornamento tipográfico que acompanha os títulos de seção,
 * no espírito das xilogravuras de cordel.
 */
export function Ornament({
  lado = 'esquerda',
  className = '',
}: {
  lado?: 'esquerda' | 'direita';
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 72 16"
      {...traco}
      strokeWidth={1.3}
      aria-hidden="true"
      className={`h-4 w-16 ${lado === 'direita' ? 'scale-x-[-1]' : ''} ${className}`}
    >
      <path d="M2 8h30" />
      <path d="M32 8q4-6 9-4t2 8q-3 4-7 1t-4-5z" />
      <path d="M46 8q6-5 11-1" opacity="0.75" />
      <circle cx="66" cy="8" r="2" />
    </svg>
  );
}

/** Faixa de padrão geométrico usada no topo do rodapé. */
export function PatternBand({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 12"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`block h-3 w-full ${className}`}
    >
      <defs>
        <pattern id="faixa-atelier" width="20" height="12" patternUnits="userSpaceOnUse">
          <path d="M0 12 10 2l10 10" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="10" cy="8" r="1.2" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="120" height="12" fill="url(#faixa-atelier)" />
    </svg>
  );
}
