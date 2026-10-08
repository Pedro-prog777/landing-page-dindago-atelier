import type { ReactNode } from 'react';
import { Reveal } from './Reveal';
import { Fio } from './Catalogo';

type SectionHeadingProps = {
  /** Número do caderno, no padrão "05". */
  numero?: string;
  /** Nome da seção, exibido na etiqueta. */
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  /** `claro` para fundos de tinta e tijolo. */
  tone?: 'escuro' | 'claro';
  layout?: 'lado' | 'empilhado';
  /** id usado por `aria-labelledby` na section. */
  id?: string;
  className?: string;
};

export function SectionHeading({
  numero,
  eyebrow,
  title,
  description,
  tone = 'escuro',
  layout = 'lado',
  id,
  className = '',
}: SectionHeadingProps) {
  const corEtiqueta = tone === 'claro' ? 'text-ambar' : 'text-tijolo';
  const corTitulo = tone === 'claro' ? 'text-papel' : 'text-tinta';
  const corApoio = tone === 'claro' ? 'text-papel/80' : 'text-tinta-suave';
  const empilhado = layout === 'empilhado';

  return (
    <Reveal className={className}>
      <Fio tone={tone} />
      <div
        className={
          empilhado
            ? 'pt-6 sm:pt-8'
            : 'flex flex-col gap-6 pt-6 sm:pt-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16'
        }
      >
        <div className="max-w-3xl">
          {(numero || eyebrow) && (
            <p className={`etiqueta mb-5 ${corEtiqueta}`}>
              {numero ? `${numero} — ` : ''}
              {eyebrow}
            </p>
          )}
          <h2
            id={id}
            className={`${empilhado ? 'text-[clamp(2rem,4.2vw,3.25rem)]' : 'text-[clamp(1.9rem,5vw,4rem)]'} ${corTitulo}`}
          >
            {title}
          </h2>
        </div>

        {description && (
          <p
            className={`max-w-md text-base leading-relaxed ${empilhado ? 'mt-5' : 'lg:max-w-sm lg:pb-2'} ${corApoio}`}
          >
            {description}
          </p>
        )}
      </div>
    </Reveal>
  );
}
