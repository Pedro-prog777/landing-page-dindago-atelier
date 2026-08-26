import { useState } from 'react';
import { siteConfig } from '../config/site';

/**
 * ESPAÇO RESERVADO PARA A LOGO REAL.
 *
 * Coloque o arquivo da logo em `public/images/logo/dindago-atelier.svg`
 * (ou altere a constante abaixo para .png/.webp). Enquanto o arquivo não
 * existir, é exibida uma assinatura tipográfica provisória com o nome da marca —
 * nenhuma logo é inventada aqui.
 */
const ARQUIVO_LOGO = '/images/logo/dindago-atelier.svg';

type LogoProps = {
  /** `light` para fundos claros, `dark` para fundos escuros. */
  tone?: 'light' | 'dark';
  className?: string;
};

export function Logo({ tone = 'light', className = '' }: LogoProps) {
  const [semArquivo, setSemArquivo] = useState(false);

  const corPrincipal = tone === 'dark' ? 'text-papel' : 'text-tinta';
  const corSecundaria = tone === 'dark' ? 'text-ambar' : 'text-tijolo';

  if (semArquivo) {
    return (
      <span
        data-placeholder="logo"
        title={`Espaço reservado para a logo do ${siteConfig.name}`}
        className={`flex flex-col leading-none ${className}`}
      >
        <span
          className={`font-display text-lg font-semibold tracking-[0.14em] sm:text-xl ${corPrincipal}`}
        >
          DINDAGÓ
        </span>
        <span
          className={`font-sans text-[0.62rem] tracking-[0.42em] sm:text-[0.68rem] ${corSecundaria}`}
        >
          ATELIER
        </span>
      </span>
    );
  }

  return (
    <img
      src={ARQUIVO_LOGO}
      alt={siteConfig.name}
      onError={() => setSemArquivo(true)}
      className={`h-11 w-auto sm:h-12 ${className}`}
    />
  );
}
