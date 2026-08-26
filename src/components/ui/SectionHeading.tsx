import type { ReactNode } from 'react';
import { Reveal } from './Reveal';
import { Ornament } from './Decorations';

type SectionHeadingProps = {
  /** Texto pequeno acima do título. */
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  /** `light` para fundos claros, `dark` para fundos terracota/marrom. */
  tone?: 'light' | 'dark';
  align?: 'left' | 'center';
  /** Ornamentos laterais no título (só fazem sentido em títulos centralizados). */
  ornamentos?: boolean;
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
  ornamentos = false,
  id,
  className = '',
}: SectionHeadingProps) {
  const alinhamento = align === 'center' ? 'items-center text-center' : 'items-start text-left';
  const corTitulo = tone === 'dark' ? 'text-creme' : 'text-marrom';
  const corOrnamento = tone === 'dark' ? 'text-amarelo/70' : 'text-ocre/70';

  const usaOrnamentos = ornamentos && align === 'center';

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

      {/*
        O h2 é montado uma única vez e apenas envolvido pelos ornamentos quando
        pedido — renderizá-lo em dois ramos duplicaria o mesmo `id` no código.
      */}
      <div
        className={
          usaOrnamentos ? 'flex w-full items-center justify-center gap-4 sm:gap-6' : 'contents'
        }
      >
        {usaOrnamentos && (
          <Ornament lado="esquerda" className={`hidden shrink-0 sm:block ${corOrnamento}`} />
        )}

        <h2
          id={id}
          className={`max-w-3xl font-display text-3xl leading-[1.12] font-light sm:text-4xl lg:text-[2.9rem] ${corTitulo}`}
        >
          {title}
        </h2>

        {usaOrnamentos && (
          <Ornament lado="direita" className={`hidden shrink-0 sm:block ${corOrnamento}`} />
        )}
      </div>

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
