import { useMemo, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import { buscar, type SearchEntry } from '../data/searchIndex';
import { useModalBehavior } from '../hooks/useModalBehavior';

type SearchDialogProps = {
  aberto: boolean;
  aoFechar: () => void;
};

export function SearchDialog({ aberto, aoFechar }: SearchDialogProps) {
  const [termo, setTermo] = useState('');
  const painelRef = useRef<HTMLDivElement>(null);

  useModalBehavior({ aberto, aoFechar, containerRef: painelRef });

  const resultados = useMemo(() => buscar(termo), [termo]);
  const grupos = useMemo(() => {
    return resultados.reduce<Record<string, SearchEntry[]>>((acc, item) => {
      (acc[item.group] ??= []).push(item);
      return acc;
    }, {});
  }, [resultados]);

  if (!aberto) return null;

  function selecionar() {
    setTermo('');
    aoFechar();
  }

  return (
    <div
      className="fixed inset-0 z-70 flex items-start justify-center px-4 pt-24 sm:pt-32"
      role="presentation"
    >
      <div
        className="absolute inset-0 bg-marrom/60 backdrop-blur-[2px]"
        onClick={aoFechar}
        aria-hidden="true"
      />

      <div
        ref={painelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Buscar no site"
        className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-bege bg-creme shadow-2xl"
      >
        <div className="flex items-center gap-3 border-b border-bege px-5 py-4">
          <Search className="size-5 shrink-0 text-terracota" aria-hidden="true" />
          <label htmlFor="busca-site" className="sr-only">
            Buscar peças e seções do site
          </label>
          <input
            id="busca-site"
            type="search"
            value={termo}
            onChange={(evento) => setTermo(evento.target.value)}
            placeholder="Buscar peças, processo, encomendas..."
            autoComplete="off"
            className="min-w-0 flex-1 bg-transparent font-sans text-base text-marrom placeholder:text-marrom-claro/50 focus:outline-none"
          />
          <button
            type="button"
            onClick={aoFechar}
            aria-label="Fechar busca"
            className="rounded-full p-1.5 text-marrom-claro transition hover:bg-bege hover:text-marrom"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <div className="max-h-[55vh] overflow-y-auto p-2" aria-live="polite">
          {termo.trim().length < 2 && (
            <p className="px-4 py-6 text-center font-sans text-sm text-marrom-claro/80">
              Digite ao menos duas letras para buscar.
            </p>
          )}

          {termo.trim().length >= 2 && resultados.length === 0 && (
            <p className="px-4 py-6 text-center font-sans text-sm text-marrom-claro/80">
              Nada encontrado para “{termo}”. Tente “papel-machê”, “encomendas” ou o nome de uma
              peça.
            </p>
          )}

          {Object.entries(grupos).map(([grupo, itens]) => (
            <section key={grupo} className="mb-2">
              <h2 className="px-4 pt-3 pb-1 font-sans text-[0.65rem] font-semibold tracking-[0.22em] text-terracota uppercase">
                {grupo}
              </h2>
              <ul>
                {itens.map((item) => (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      onClick={selecionar}
                      className="block rounded-xl px-4 py-3 transition hover:bg-areia"
                    >
                      <span className="block font-display text-base text-marrom">{item.title}</span>
                      <span className="block font-sans text-sm text-marrom-claro/85">
                        {item.description}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
