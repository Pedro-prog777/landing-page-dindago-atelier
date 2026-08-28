import { useCallback, useEffect, useState } from 'react';
import { api } from '../api/cliente';
import { mensagemDoErro } from './useAuth';
import { Aviso, Botao, Cartao, Carregando, Selecao, Vazio } from './ui';

type Mensagem = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  status: string;
  createdAt: string;
};

const STATUS = ['novo', 'lido', 'respondido', 'arquivado'];

/** Caixa de entrada do formulário de contato. */
export function MensagensPainel({ clientId }: { clientId: string }) {
  const [itens, setItens] = useState<Mensagem[] | null>(null);
  const [total, setTotal] = useState(0);
  const [erro, setErro] = useState<string | null>(null);
  const [filtro, setFiltro] = useState('');

  const carregar = useCallback(async () => {
    try {
      const r = await api.get<{ itens: Mensagem[]; total: number }>(
        `/clients/${clientId}/messages${filtro ? `?status=${filtro}` : ''}`,
      );
      setItens(r.itens);
      setTotal(r.total);
      setErro(null);
    } catch (e) {
      setErro(mensagemDoErro(e));
      setItens([]);
    }
  }, [clientId, filtro]);

  useEffect(() => {
    void carregar();
  }, [carregar]);

  async function mudarStatus(id: string, status: string) {
    try {
      await api.put(`/messages/${id}/status`, { status });
      await carregar();
    } catch (e) {
      setErro(mensagemDoErro(e));
    }
  }

  async function remover(id: string) {
    if (!window.confirm('Remover esta mensagem? Não é possível desfazer.')) return;
    try {
      await api.remover(`/messages/${id}`);
      await carregar();
    } catch (e) {
      setErro(mensagemDoErro(e));
    }
  }

  return (
    <Cartao titulo="Mensagens recebidas" descricao={`${total} no total`}>
      <div className="mb-4 flex items-center gap-3">
        <label className="text-sm text-slate-600" htmlFor="filtro-status">
          Filtrar
        </label>
        <Selecao
          id="filtro-status"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="max-w-48"
        >
          <option value="">Todas</option>
          {STATUS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </Selecao>
      </div>

      {erro && (
        <div className="mb-4">
          <Aviso tipo="erro">{erro}</Aviso>
        </div>
      )}

      {itens === null ? (
        <Carregando />
      ) : itens.length === 0 ? (
        <Vazio>Nenhuma mensagem por aqui.</Vazio>
      ) : (
        <ul className="space-y-3">
          {itens.map((m) => (
            <li key={m.id} className="rounded-md border border-slate-200 p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <p className="font-medium text-slate-900">{m.name}</p>
                  <p className="text-sm text-slate-500">
                    {m.email}
                    {m.phone ? ` · ${m.phone}` : ''}
                  </p>
                </div>
                <p className="text-xs text-slate-400">
                  {new Date(m.createdAt).toLocaleString('pt-BR')}
                </p>
              </div>

              {m.subject && <p className="mt-2 text-sm font-medium text-slate-700">{m.subject}</p>}
              <p className="mt-1 text-sm whitespace-pre-wrap text-slate-600">{m.message}</p>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Selecao
                  value={m.status}
                  onChange={(e) => void mudarStatus(m.id, e.target.value)}
                  className="max-w-40"
                  aria-label={`Status da mensagem de ${m.name}`}
                >
                  {STATUS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </Selecao>
                <Botao variante="perigo" onClick={() => void remover(m.id)}>
                  Remover
                </Botao>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Cartao>
  );
}
