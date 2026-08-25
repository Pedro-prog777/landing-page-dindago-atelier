import type { ComponentType, SVGProps } from 'react';

/**
 * Ícones de marca desenhados no mesmo traço do lucide-react (que deixou de
 * distribuir logotipos de terceiros a partir da v1). Mesmas props dos demais
 * ícones, para poderem ser usados de forma intercambiável.
 */
export type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { strokeWidth?: number }>;

const propsBase = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

export function InstagramIcon({ strokeWidth = 2, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg {...propsBase} strokeWidth={strokeWidth} {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function FacebookIcon({ strokeWidth = 2, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg {...propsBase} strokeWidth={strokeWidth} {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
