import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';

/**
 * ============================================================================
 * PEÇAS DO PAINEL
 * ----------------------------------------------------------------------------
 * O painel é deliberadamente sóbrio: fonte do sistema, cinzas neutros, campos
 * padrão. Ele NÃO reproduz a linguagem editorial da landing page — quem entra
 * aqui está trabalhando, não visitando. A identidade artesanal fica inteira do
 * lado público.
 * ============================================================================
 */

export function Botao({
  children,
  variante = 'primario',
  ...props
}: {
  children: ReactNode;
  variante?: 'primario' | 'neutro' | 'perigo';
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  const estilos = {
    primario: 'bg-slate-900 text-white hover:bg-slate-700 disabled:bg-slate-400',
    neutro: 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50',
    perigo: 'border border-red-300 bg-white text-red-700 hover:bg-red-50',
  };
  return (
    <button
      type="button"
      {...props}
      className={`inline-flex min-h-9 items-center justify-center gap-2 rounded-md px-4 text-sm font-medium transition disabled:cursor-not-allowed ${estilos[variante]} ${props.className ?? ''}`}
    >
      {children}
    </button>
  );
}

export function Campo({
  rotulo,
  erro,
  dica,
  children,
}: {
  rotulo: string;
  erro?: string;
  dica?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700">{rotulo}</span>
      {children}
      {dica && !erro && <span className="mt-1 block text-xs text-slate-500">{dica}</span>}
      {erro && (
        <span role="alert" className="mt-1 block text-xs text-red-600">
          {erro}
        </span>
      )}
    </label>
  );
}

const baseCampo =
  'w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 focus:outline-none';

export function Entrada(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${baseCampo} ${props.className ?? ''}`} />;
}

export function AreaTexto(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${baseCampo} resize-y ${props.className ?? ''}`} />;
}

export function Selecao(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`${baseCampo} ${props.className ?? ''}`} />;
}

/** Aviso de estado: sucesso, erro ou informação. */
export function Aviso({
  tipo = 'info',
  children,
}: {
  tipo?: 'info' | 'sucesso' | 'erro';
  children: ReactNode;
}) {
  const estilos = {
    info: 'border-slate-200 bg-slate-50 text-slate-700',
    sucesso: 'border-green-200 bg-green-50 text-green-800',
    erro: 'border-red-200 bg-red-50 text-red-800',
  };
  return (
    <p
      role={tipo === 'erro' ? 'alert' : 'status'}
      className={`rounded-md border px-3 py-2 text-sm ${estilos[tipo]}`}
    >
      {children}
    </p>
  );
}

export function Cartao({
  titulo,
  descricao,
  children,
}: {
  titulo: string;
  descricao?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5">
      <h2 className="text-base font-semibold text-slate-900">{titulo}</h2>
      {descricao && <p className="mt-1 text-sm text-slate-500">{descricao}</p>}
      <div className="mt-4">{children}</div>
    </section>
  );
}

/** Estados de carregamento, vazio e erro — os três aparecem em toda listagem. */
export function Carregando({ children = 'Carregando...' }: { children?: ReactNode }) {
  return <p className="py-8 text-center text-sm text-slate-500">{children}</p>;
}

export function Vazio({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-md border border-dashed border-slate-300 py-8 text-center text-sm text-slate-500">
      {children}
    </p>
  );
}
