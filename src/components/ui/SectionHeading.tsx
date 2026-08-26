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
  /** id usado por `aria-labelledby` na section. */
  id?: string;
  className?: string;
};

/**
 * Abertura de caderno: fio, etiqueta numerada e manchete em corpo grande.
 *
 * Sem ornamentos laterais e sem centralização — o alinhamento é sempre à
 * esquerda, como numa página impressa, e a hierarquia vem do salto de corpo
 * entre a etiqueta e o título.
 */
export function SectionHeading({
  numero,
  eyebrow,
  title,
  description,
  tone = 'escuro',
  id,
  className = '',
}: SectionHeadingProps) {
  const corEtiqueta = tone === 'claro' ? 'text-ambar' : 'text-tijolo';
  const corTitulo = tone === 'claro' ? 'text-papel' : 'text-tinta';
  const corApoio = tone === 'claro' ? 'text-papel/70' : 'text-tinta-suave';

  return (
    <Reveal className={className}>
      <Fio tone={tone} />
      <div className="flex flex-col gap-8 pt-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
        <div className="max-w-3xl">
          {(numero || eyebrow) && (
            <p className={`etiqueta mb-6 ${corEtiqueta}`}>
              {numero ? `${numero} — ` : ''}
              {eyebrow}
            </p>
          )}
          <h2 id={id} className={`text-[clamp(1.9rem,5vw,4rem)] ${corTitulo}`}>
            {title}
          </h2>
        </div>

        {description && (
          <p className={`max-w-sm text-base leading-relaxed lg:pb-2 ${corApoio}`}>{description}</p>
        )}
      </div>
    </Reveal>
  );
}
