import { useState } from 'react';
import { ImageOff } from 'lucide-react';

type SmartImageProps = {
  src: string;
  alt: string;
  className?: string;
  /** Texto do marcador exibido enquanto a fotografia real não existir. */
  placeholderLabel?: string;
  loading?: 'lazy' | 'eager';
};

/**
 * Imagem com marcador de reserva.
 *
 * Enquanto o arquivo real não estiver em `public/images/`, é exibido um bloco
 * claramente identificado como espaço reservado — nunca uma foto genérica.
 * Ao adicionar o arquivo com o mesmo caminho, a fotografia aparece sozinha.
 */
export function SmartImage({
  src,
  alt,
  className = '',
  placeholderLabel = 'Fotografia em breve',
  loading = 'lazy',
}: SmartImageProps) {
  const [falhou, setFalhou] = useState(false);

  if (falhou) {
    return (
      <div
        role="img"
        aria-label={`Espaço reservado para fotografia: ${alt}`}
        className={`flex flex-col items-center justify-center gap-2 bg-bege/70 bg-[repeating-linear-gradient(135deg,transparent,transparent_14px,rgba(168,84,51,0.06)_14px,rgba(168,84,51,0.06)_28px)] p-6 text-center ${className}`}
      >
        <ImageOff className="size-6 text-barro/50" aria-hidden="true" />
        <span className="font-sans text-[0.7rem] tracking-[0.18em] text-barro/70 uppercase">
          {placeholderLabel}
        </span>
        <span className="max-w-[26ch] font-sans text-xs leading-snug text-marrom-claro/70">
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
