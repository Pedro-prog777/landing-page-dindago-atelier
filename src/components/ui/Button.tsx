import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'outline' | 'light';
type Size = 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2.5 rounded-full font-sans font-semibold uppercase tracking-[0.14em] transition-all duration-300 ease-out disabled:cursor-not-allowed disabled:opacity-60';

const variants: Record<Variant, string> = {
  primary:
    'bg-terracota text-creme shadow-[0_10px_24px_-12px_rgba(67,41,29,0.7)] hover:bg-barro hover:-translate-y-0.5 active:translate-y-0',
  outline:
    'border border-marrom/30 text-marrom hover:border-terracota hover:bg-terracota hover:text-creme hover:-translate-y-0.5 active:translate-y-0',
  light:
    'border border-creme/40 text-creme hover:bg-creme hover:text-marrom hover:-translate-y-0.5 active:translate-y-0',
};

const sizes: Record<Size, string> = {
  md: 'px-6 py-3 text-[0.7rem] min-h-11',
  lg: 'px-8 py-4 text-xs min-h-13',
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { children, variant = 'primary', size = 'md', className = '', ...rest } = props;
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (typeof rest.href === 'string') {
    const { href, ...anchorProps } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & {
      href: string;
    };
    // Links externos sempre abrem em nova aba, com rel de segurança.
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
