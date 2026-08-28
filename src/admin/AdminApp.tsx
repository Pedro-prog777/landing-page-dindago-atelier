import { useCallback, useEffect, useState } from 'react';
import { api } from '../api/cliente';
import { ClientePage } from './ClientePage';
import { LoginPage } from './LoginPage';
import { useAuth, mensagemDoErro } from './useAuth';
import { Aviso, Botao, Campo, Cartao, Carregando, Entrada } from './ui';

/**
 * ============================================================================
 * PAINEL ADMINISTRATIVO
 * ----------------------------------------------------------------------------
 * Fica em /admin, atrás de login. Visualmente é o oposto da landing page:
 * sóbrio, funcional, fonte do sistema. Quem entra aqui está trabalhando.
 *
 * OWNER escolhe entre os clientes; EDITOR entra direto no cliente dele.
 * ============================================================================
 */

type ClienteResumo = {
  id: string;
  slug: string;
  name: string;
  segment: string | null;
  active: boolean;
  _count: { products: number; messages: number };
};

function ListaDeClientes({ aoAbrir }: { aoAbrir: (id: string) => void }) {
  const [clientes, setClientes] = useState<ClienteResumo[] | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [criando, setCriando] = useState(false);
  const [novo, setNovo] = useState({ slug: '', name: '' });

  const carregar = useCallback(async () => {
    try {
      setClientes(await api.get<ClienteResumo[]>('/clients'));
    } catch (e) {
      setErro(mensagemDoErro(e));
      setClientes([]);
    }
  }, []);

  useEffect(() => {
    void carregar();
  }, [carregar]);

  async function criar() {
    setErro(null);
    try {
      const c = await api.post<{ id: string }>('/clients', { ...novo, active: true });
      setNovo({ slug: '', name: '' });
      setCriando(false);
      await carregar();
      aoAbrir(c.id);
    } catch (e) {
      setErro(mensagemDoErro(e));
    }
  }

  if (clientes === null) return <Carregando />;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-slate-900">Clientes</h1>
        <Botao onClick={() => setCriando((v) => !v)}>{criando ? 'Cancelar' : 'Novo cliente'}</Botao>
      </div>

      {erro && <Aviso tipo="erro">{erro}</Aviso>}

      {criando && (
        <Cartao titulo="Novo cliente" descricao="Uma landing page nova, com os blocos já criados.">
          <div className="grid gap-4 sm:grid-cols-2">
            <Campo rotulo="Nome">
              <Entrada
                value={novo.name}
                onChange={(e) => setNovo((n) => ({ ...n, name: e.target.value }))}
              />
            </Campo>
            <Campo rotulo="Identificador na URL" dica="minúsculas, números e hífen">
              <Entrada
                value={novo.slug}
                onChange={(e) => setNovo((n) => ({ ...n, slug: e.target.value }))}
              />
            </Campo>
          </div>
          <div className="mt-4">
            <Botao onClick={() => void criar()}>Criar</Botao>
          </div>
        </Cartao>
      )}

      <ul className="grid gap-3 sm:grid-cols-2">
        {clientes.map((c) => (
          <li key={c.id}>
            <button
              type="button"
              onClick={() => aoAbrir(c.id)}
              className="w-full rounded-lg border border-slate-200 bg-white p-4 text-left transition hover:border-slate-400"
            >
              <p className="font-medium text-slate-900">{c.name}</p>
              <p className="text-sm text-slate-500">/{c.slug}</p>
              <p className="mt-2 text-xs text-slate-500">
                {c._count.products} peças · {c._count.messages} mensagens
                {!c.active && ' · inativo'}
              </p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AdminApp() {
  const { usuario, estado, entrar, sair } = useAuth();
  const [clienteAberto, setClienteAberto] = useState<string | null>(null);

  if (estado === 'verificando') {
    return (
      <main className="painel flex min-h-dvh items-center justify-center bg-slate-100">
        <Carregando>Verificando sessão...</Carregando>
      </main>
    );
  }

  if (!usuario) return <LoginPage aoEntrar={entrar} />;

  // O EDITOR não escolhe cliente: entra direto no que lhe pertence.
  const clienteAtual = clienteAberto ?? (usuario.role === 'EDITOR' ? usuario.clientId : null);

  return (
    <div className="painel min-h-dvh bg-slate-100">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-slate-900">Painel do atelier</span>
            {clienteAtual && usuario.role === 'OWNER' && (
              <Botao variante="neutro" onClick={() => setClienteAberto(null)}>
                Todos os clientes
              </Botao>
            )}
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-slate-500 sm:block">
              {usuario.name} · {usuario.role}
            </span>
            <Botao variante="neutro" onClick={() => void sair()}>
              Sair
            </Botao>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        {clienteAtual ? (
          <ClientePage clientId={clienteAtual} />
        ) : (
          <ListaDeClientes aoAbrir={setClienteAberto} />
        )}
      </main>
    </div>
  );
}
