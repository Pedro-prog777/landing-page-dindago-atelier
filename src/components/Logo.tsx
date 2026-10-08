import { useSite } from '../conteudo/useSite';
import { useState } from 'react';

/**
 * Logo da marca.
 *
 * Enquanto `company.logo` (em `src/data/clientData.ts`) estiver vazio, é
 * exibida a assinatura tipográfica com o nome da marca — sem pedir à rede uma
 * imagem que ainda não existe. Ao preencher o caminho do arquivo real, a
 * imagem assume o lugar; se ela falhar ao carregar, a assinatura volta.
 */
type LogoProps = {
  /** `light` para fundos claros, `dark` para fundos escuros. */
  tone?: 'light' | 'dark';
  className?: string;
};

export function Logo({ tone = 'light', className = '' }: LogoProps) {
  const { conteudo, isConfigured, siteConfig } = useSite();
  const [falhou, setFalhou] = useState(false);
  const arquivo = conteudo.company.logo;

  const corPrincipal = tone === 'dark' ? 'text-papel' : 'text-tinta';
  const corSecundaria = tone === 'dark' ? 'text-ambar' : 'text-tijolo';

  if (!isConfigured(arquivo) || falhou) {
    return (
      <span className={`flex flex-col leading-none ${className}`}>
        <span
          className={`font-display text-xl font-semibold tracking-[0.14em] sm:text-[1.4rem] ${corPrincipal}`}
        >
          DINDAGÓ
        </span>
        <span
          className={`mt-1 font-sans text-[0.62rem] font-medium tracking-[0.46em] sm:text-[0.68rem] ${corSecundaria}`}
        >
          ATELIER
        </span>
      </span>
    );
  }

  return (
    <img
      src={arquivo}
      alt={siteConfig.name}
      onError={() => setFalhou(true)}
      className={`h-11 w-auto sm:h-12 ${className}`}
    />
  );
}
