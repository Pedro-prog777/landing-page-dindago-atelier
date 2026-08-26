import { useState } from 'react';

type SmartImageProps = {
  src: string;
  alt: string;
  className?: string;
  /** Rótulo do espaço reservado, no padrão editorial: "IMAGEM PRINCIPAL". */
  placeholderLabel?: string;
  loading?: 'lazy' | 'eager';
  /** Numeração opcional exibida no canto do espaço reservado. */
  indice?: string;
};

/**
 * Imagem com espaço reservado estrutural.
 *
 * Enquanto o arquivo real não existir em `public/images/`, o espaço é marcado
 * como numa diagramação de revista: moldura de registro, rótulo entre
 * colchetes e a descrição do que entra ali. Nunca uma fotografia genérica.
 *
 * O espaço reservado ocupa exatamente a mesma área, proporção e posição da
 * fotografia definitiva — inclusive os efeitos de hover aplicados pelo pai —,
 * então a troca pelo arquivo real não desloca nada na composição.
 */
export function SmartImage({
  src,
  alt,
  className = '',
  placeholderLabel = 'Imagem',
  loading = 'lazy',
  indice,
}: SmartImageProps) {
  const [falhou, setFalhou] = useState(false);

  if (falhou) {
    return (
      <div
        role="img"
        aria-label={`Espaço reservado para fotografia: ${alt}`}
        className={`relative flex flex-col items-center justify-center overflow-hidden bg-bege/70 bg-[repeating-linear-gradient(135deg,transparent,transparent_11px,rgba(138,75,42,0.055)_11px,rgba(138,75,42,0.055)_22px)] ${className}`}
      >
        {/* Marcas de registro nos cantos, como em prova de impressão */}
        <span aria-hidden="true" className="pointer-events-none absolute inset-3">
          <span className="absolute top-0 left-0 size-5 border-t border-l border-barro/25" />
          <span className="absolute top-0 right-0 size-5 border-t border-r border-barro/25" />
          <span className="absolute bottom-0 left-0 size-5 border-b border-l border-barro/25" />
          <span className="absolute right-0 bottom-0 size-5 border-r border-b border-barro/25" />
        </span>

        {indice && (
          <span className="pointer-events-none absolute top-4 left-4 font-display text-2xl leading-none text-barro/25">
            {indice}
          </span>
        )}

        <span className="px-6 text-center font-sans text-[0.62rem] font-semibold tracking-[0.3em] text-barro/70 uppercase">
          [ {placeholderLabel} ]
        </span>
        <span className="mt-2.5 max-w-[24ch] px-6 text-center font-sans text-[0.7rem] leading-snug text-marrom-claro/55">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      onError={() => setFalhou(true)}
      className={`object-cover ${className}`}
    />
  );
}
