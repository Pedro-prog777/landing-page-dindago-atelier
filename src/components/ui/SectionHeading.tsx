import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

type SectionHeadingProps = {
  /** Texto pequeno acima do título. */
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  /** `light` para fundos claros, `dark` para fundos terracota/marrom. */
  tone?: 'light' | 'dark';
  align?: 'left' | 'center';
  /** id usado por `aria-labelledby` na section. */
  id?: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = 'light',
  align = 'center',
  id,
  className = '',
}: SectionHeadingProps) {
  const alinhamento = align === 'center' ? 'text-center items-center' : 'text-left items-start';

  return (
    <Reveal className={`flex flex-col ${alinhamento} ${className}`}>
      {eyebrow && (
        <span
          className={`mb-4 inline-flex items-center gap-3 font-sans text-[0.68rem] font-semibold tracking-[0.28em] uppercase ${
            tone === 'dark' ? 'text-amarelo' : 'text-terracota'
          }`}
        >
          <span
            className={`h-px w-8 ${tone === 'dark' ? 'bg-amarelo/60' : 'bg-terracota/50'}`}
            aria-hidden="true"
          />
          {eyebrow}
        </span>
      )}

      <h2
        id={id}
        className={`max-w-3xl text-3xl leading-[1.12] font-light sm:text-4xl lg:text-[2.9rem] ${
          tone === 'dark' ? 'text-creme' : 'text-marrom'
        }`}
      >
        {title}
      </h2>

      {description && (
        <p
          className={`mt-5 max-w-2xl text-base leading-relaxed sm:text-lg ${
            tone === 'dark' ? 'text-creme/75' : 'text-marrom-claro'
          }`}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
