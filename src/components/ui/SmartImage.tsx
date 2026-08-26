import { useState } from 'react';

type SmartImageProps = {
  src: string;
  alt: string;
  className?: string;
  /** Rótulo do espaço reservado, no padrão do catálogo: "Prancha", "Peça". */
  placeholderLabel?: string;
  loading?: 'lazy' | 'eager';
  /** Numeração da prancha, no padrão "01". */
  figura?: string;
};

/**
 * Prancha de catálogo.
 *
 * Enquanto a fotografia real não existir em `public/images/`, o lugar dela é
 * marcado como a prancha de um catálogo impresso: campo chapado de barro, fio
 * de contorno e a numeração `fig. NN` no alto. Nada de hachura de obra
 * inacabada nem de fotografia genérica.
 *
 * O espaço ocupa exatamente a área, a proporção e a posição da fotografia
 * definitiva — inclusive o hover aplicado pelo componente pai —, então trocar
 * o arquivo não desloca nada na composição.
 */
export function SmartImage({
  src,
  alt,
  className = '',
  placeholderLabel = 'Prancha',
  loading = 'lazy',
  figura,
}: SmartImageProps) {
  const [falhou, setFalhou] = useState(false);

  if (falhou) {
    return (
      <div
        role="img"
        aria-label={`Espaço reservado para fotografia: ${alt}`}
        className={`relative flex flex-col items-center justify-center overflow-hidden bg-areia/55 ${className}`}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-1.75 border border-tinta/12"
        />

        {figura && (
          <span className="etiqueta pointer-events-none absolute top-4 left-4 text-tinta/35">
            fig. {figura}
          </span>
        )}

        <span className="etiqueta px-6 text-center text-tijolo/75">{placeholderLabel}</span>
        <span className="mt-3 max-w-[26ch] px-6 text-center font-sans text-[0.72rem] leading-snug text-tinta-suave">
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
