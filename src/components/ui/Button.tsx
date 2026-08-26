import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

/**
 * Botões de bloco, com canto reto.
 *
 * A pílula arredondada saiu: neste catálogo o botão é um retângulo de tinta
 * chapada ou um campo delimitado por fio, no mesmo vocabulário da régua e da
 * numeração. O movimento no hover é de deslocamento, não de escala.
 */
type Variant = 'solido' | 'contorno' | 'claro';
type Size = 'md' | 'lg';

const base =
  'group/btn inline-flex items-center justify-center gap-3 font-sans font-semibold uppercase tracking-[0.2em] transition-all duration-300 ease-out disabled:cursor-not-allowed disabled:opacity-60';

const variants: Record<Variant, string> = {
  solido: 'bg-tijolo text-papel hover:bg-tinta',
  contorno: 'border border-tinta/30 text-tinta hover:border-tinta hover:bg-tinta hover:text-papel',
  claro: 'border border-papel/35 text-papel hover:bg-papel hover:text-tinta',
};

const sizes: Record<Size, string> = {
  md: 'min-h-11 px-6 text-[0.62rem]',
  lg: 'min-h-14 px-9 text-[0.68rem]',
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
};

type ButtonAsButton = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type ButtonAsLink = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { children, variant = 'solido', size = 'md', className = '', ...rest } = props;
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (typeof rest.href === 'string') {
    const { href = '', ...anchorProps } = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    const externo = href.startsWith('http');
    return (
      <a
        href={href}
        className={classes}
        {...(externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...anchorProps}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}

/**
 * Chamada em forma de link editorial: etiqueta, fio que cresce e seta que
 * desliza. Usada onde um bloco de tinta pesaria demais na composição.
 */
export function LinkEditorial({
  href,
  children,
  tone = 'escuro',
  className = '',
  ...rest
}: {
  href: string;
  children: ReactNode;
  tone?: 'escuro' | 'claro';
  className?: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const cor = tone === 'claro' ? 'text-papel hover:text-ambar' : 'text-tinta hover:text-tijolo';
  const externo = href.startsWith('http');

  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-4 py-2 transition-colors duration-300 ${cor} ${className}`}
      {...(externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      <span className="etiqueta sublinhado">{children}</span>
      <span
        aria-hidden="true"
        className="h-px w-8 bg-current transition-all duration-400 group-hover:w-14"
      />
    </a>
  );
}
