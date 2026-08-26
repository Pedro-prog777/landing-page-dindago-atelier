/**
 * Selo artesanal: texto circulando uma marca central, como um carimbo de
 * procedência. Gira devagar e para quando o usuário pede menos movimento
 * (a animação é declarada em `index.css`, sob `prefers-reduced-motion`).
 */
export function Seal({ texto, className = '' }: { texto: string; className?: string }) {
  // Repete o texto até fechar a volta completa do círculo.
  const conteudo = texto.repeat(2);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none relative flex size-24 items-center justify-center rounded-full bg-creme/95 shadow-[0_14px_30px_-16px_rgba(67,41,29,0.6)] backdrop-blur-sm sm:size-28 ${className}`}
    >
      <svg viewBox="0 0 100 100" className="animate-girar size-full">
        <defs>
          <path
            id="trilha-selo"
            d="M50 50 m -37 0 a 37 37 0 1 1 74 0 a 37 37 0 1 1 -74 0"
            fill="none"
          />
        </defs>
        <text className="fill-barro font-sans text-[8.5px] tracking-[0.14em] uppercase">
          <textPath href="#trilha-selo">{conteudo}</textPath>
        </text>
      </svg>

      {/* Marca central */}
      <span className="absolute flex size-9 items-center justify-center rounded-full border border-terracota/30 sm:size-11">
        <span className="font-display text-base text-terracota sm:text-lg">✻</span>
      </span>
    </div>
  );
}
