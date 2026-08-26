import type { SVGProps } from 'react';

/**
 * ============================================================================
 * DESENHOS DO SERTÃO
 * ----------------------------------------------------------------------------
 * Sol, cactos, pássaros e flor em traço fino — o vocabulário da identidade
 * aprovada pelo cliente. A diferença em relação a espalhar folclore é o
 * critério de uso: cada desenho ocupa uma posição pensada na composição
 * (margem, quina, transição entre cadernos) e nunca compete com o conteúdo.
 *
 * Todos são puramente visuais, sempre com `aria-hidden`, e sem custo de rede.
 * ============================================================================
 */

const traco = {
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

/** Sol nascente com raios — abertura da capa e ícone de identidade nordestina. */
export function Sol({ strokeWidth = 1.5, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 44" {...traco} strokeWidth={strokeWidth} aria-hidden="true" {...props}>
      <path d="M13 40h38" />
      <path d="M20 40a12 12 0 0 1 24 0" />
      <path d="M32 5v8M17 11l5 6M47 11l-5 6M6 23l7 3M58 23l-7 3" />
      <path d="M24.5 40q7.5-8 15 0" opacity="0.5" />
    </svg>
  );
}

/** Mandacaru do sertão — moldura das margens. */
export function Cacto({ strokeWidth = 1.5, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 64" {...traco} strokeWidth={strokeWidth} aria-hidden="true" {...props}>
      <path d="M20 61V19" />
      <path d="M20 45h-6a6 6 0 0 1-6-6V29" />
      <path d="M20 37h6a6 6 0 0 0 6-6v-6" />
      <path d="M14 19a6 6 0 0 1 12 0" />
      <path d="M13 61h14" />
      <circle cx="20" cy="13" r="2" opacity="0.55" />
    </svg>
  );
}

/** Pássaros em voo — pontuação leve sobre o céu do sertão. */
export function Passaros({ strokeWidth = 1.5, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 28" {...traco} strokeWidth={strokeWidth} aria-hidden="true" {...props}>
      <path d="M4 14q5-6 10 0q5-6 10 0" />
      <path d="M32 6q4-5 8 0q4-5 8 0" opacity="0.7" />
      <path d="M40 22q3.5-4 7 0q3.5-4 7 0" opacity="0.5" />
    </svg>
  );
}

/** Pássaro pousado — ícone de "memória que permanece". */
export function Passaro({ strokeWidth = 1.5, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" {...traco} strokeWidth={strokeWidth} aria-hidden="true" {...props}>
      <path d="M9 30q6-14 18-14 8 0 12 6" />
      <path d="M39 22q4 1 4 5t-5 6q-9 4-19 0" />
      <path d="M21 22q4 4 2 10" />
      <circle cx="34" cy="20" r="1.2" fill="currentColor" stroke="none" />
      <path d="M13 40q10 3 20 0" opacity="0.45" />
    </svg>
  );
}

/** Flor do mandacaru — ícone de "cultura que conecta". */
export function Flor({ strokeWidth = 1.5, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" {...traco} strokeWidth={strokeWidth} aria-hidden="true" {...props}>
      <circle cx="24" cy="20" r="4.5" />
      <path d="M24 15.5q-3-6 0-9.5 3 3.5 0 9.5" />
      <path d="M28.5 20q6-3 9.5 0-3.5 3-9.5 0" />
      <path d="M24 24.5q3 6 0 9.5-3-3.5 0-9.5" />
      <path d="M19.5 20q-6-3-9.5 0 3.5 3 9.5 0" />
      <path d="M24 34v10M24 38q-5 0-7-4" opacity="0.6" />
    </svg>
  );
}

/** Mãos acolhendo um coração — ícone de "feito à mão". */
export function MaosCoracao({ strokeWidth = 1.5, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" {...traco} strokeWidth={strokeWidth} aria-hidden="true" {...props}>
      <path d="M24 22q-3-4-6.5-2t-1 6L24 32l7.5-6q2.5-4-1-6T24 22z" />
      <path d="M14 26q-5 2-6 7t2 9h28q3-4 2-9t-6-7" />
      <path d="M14 26v8M34 26v8" opacity="0.45" />
    </svg>
  );
}

/** Folha — ícone de "sustentável". */
export function Folha({ strokeWidth = 1.5, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" {...traco} strokeWidth={strokeWidth} aria-hidden="true" {...props}>
      <path d="M38 10q4 18-8 26T12 40q-4-18 8-26T38 10z" />
      <path d="M32 16 14 38" />
      <path d="M30 24l-8-1M26 30l-8-1" opacity="0.55" />
    </svg>
  );
}

/** Caixa de presente — ícone de "encomendas". */
export function Presente({ strokeWidth = 1.5, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" {...traco} strokeWidth={strokeWidth} aria-hidden="true" {...props}>
      <rect x="9" y="20" width="30" height="20" rx="1.5" />
      <path d="M7 14h34v6H7z" />
      <path d="M24 14v26" />
      <path d="M24 14q-8-1-8-5t8 5zM24 14q8-1 8-5t-8 5z" />
    </svg>
  );
}

/**
 * Borda de papel rasgado entre os cadernos.
 *
 * Coordenadas absolutas terminando exatamente em x=0: com segmentos relativos
 * a soma não fecha na borda esquerda e sobra uma falha na faixa.
 */
export function PapelRasgado({
  posicao = 'baixo',
  className = '',
}: {
  posicao?: 'cima' | 'baixo';
  className?: string;
}) {
  const caminho =
    posicao === 'baixo'
      ? 'M0 0H1440V20C1380 30 1320 10 1260 18S1140 34 1080 24 960 6 900 16 780 32 720 22 600 4 540 14 420 30 360 20 240 2 180 12 60 28 0 18Z'
      : 'M0 44H1440V24C1380 14 1320 34 1260 26S1140 10 1080 20 960 38 900 28 780 12 720 22 600 40 540 30 420 14 360 24 240 42 180 32 60 16 0 26Z';

  return (
    <svg
      viewBox="0 0 1440 44"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`block h-5 w-full sm:h-7 lg:h-9 ${className}`}
    >
      <path d={caminho} fill="currentColor" />
    </svg>
  );
}

/** Arabesco de cordel que acompanha os títulos centrais. */
export function Arabesco({
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
      className={`h-4 w-16 ${lado === 'direita' ? '-scale-x-100' : ''} ${className}`}
    >
      <path d="M2 8h30" />
      <path d="M32 8q4-6 9-4t2 8q-3 4-7 1t-4-5z" />
      <path d="M46 8q6-5 11-1" opacity="0.7" />
      <circle cx="66" cy="8" r="2" />
    </svg>
  );
}
