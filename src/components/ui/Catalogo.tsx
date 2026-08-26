import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

/**
 * ============================================================================
 * ELEMENTOS DO CATÁLOGO
 * ----------------------------------------------------------------------------
 * A identidade não vem mais de ícones folclóricos espalhados pela página, e sim
 * do vocabulário de uma publicação impressa: numeração de caderno, fios de
 * régua, cabeçalho corrente e um único motivo de xilogravura usado com parcimônia.
 * ============================================================================
 */

/** Fio de régua. `forte` para divisões de caderno, padrão para respiros. */
export function Fio({
  forte = false,
  tone = 'escuro',
  className = '',
}: {
  forte?: boolean;
  tone?: 'escuro' | 'claro';
  className?: string;
}) {
  const cor = tone === 'claro' ? 'bg-papel/25' : 'bg-tinta/15';
  return <div aria-hidden="true" className={`${forte ? 'h-px' : 'h-px'} ${cor} ${className}`} />;
}

/**
 * Cabeçalho corrente da seção: número do caderno à esquerda, título da seção
 * ao centro e a marca do atelier à direita — como o topo de página de revista.
 */
export function Caderno({
  numero,
  titulo,
  nota,
  tone = 'escuro',
  className = '',
}: {
  numero: string;
  titulo: string;
  nota?: string;
  tone?: 'escuro' | 'claro';
  className?: string;
}) {
  const cor = tone === 'claro' ? 'text-papel/55' : 'text-tinta/45';
  const corDestaque = tone === 'claro' ? 'text-ambar' : 'text-tijolo';

  return (
    <Reveal className={className}>
      <Fio tone={tone} />
      <div className="flex items-baseline justify-between gap-6 pt-3">
        <span className={`etiqueta ${corDestaque}`}>
          {numero} — {titulo}
        </span>
        {nota && <span className={`etiqueta hidden sm:block ${cor}`}>{nota}</span>}
      </div>
    </Reveal>
  );
}

/**
 * Motivo de xilogravura: banda de triângulos, o único ornamento recorrente.
 * Substitui os cactos, sóis e pássaros que antes se espalhavam pela página.
 *
 * É desenhado como fundo repetido, e não como SVG esticado: assim o triângulo
 * mantém sempre o mesmo tamanho, seja numa faixa de 80px ou na largura toda.
 */
export function Xilogravura({
  className = '',
  altura = 10,
}: {
  className?: string;
  altura?: number;
}) {
  return (
    <span
      aria-hidden="true"
      className={`block ${className}`}
      style={{
        height: altura,
        backgroundColor: 'currentColor',
        maskImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='10'%3E%3Cpath d='M0 10 7 0l7 10z' fill='%23000'/%3E%3C/svg%3E\")",
        maskRepeat: 'repeat-x',
        maskSize: '14px 100%',
        WebkitMaskImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='10'%3E%3Cpath d='M0 10 7 0l7 10z' fill='%23000'/%3E%3C/svg%3E\")",
        WebkitMaskRepeat: 'repeat-x',
        WebkitMaskSize: '14px 100%',
      }}
    />
  );
}

/** Numeral de caderno em corpo grande, usado como âncora visual. */
export function Numeral({
  children,
  tone = 'escuro',
  className = '',
}: {
  children: ReactNode;
  tone?: 'escuro' | 'claro';
  className?: string;
}) {
  const cor = tone === 'claro' ? 'text-papel/20' : 'text-tijolo/25';
  return (
    <span aria-hidden="true" className={`block font-display leading-[0.75] ${cor} ${className}`}>
      {children}
    </span>
  );
}
