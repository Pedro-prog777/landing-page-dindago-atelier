import { useCallback, useEffect, useState } from 'react';
import { api } from '../api/cliente';
import { mensagemDoErro } from './useAuth';
import { AreaTexto, Aviso, Botao, Campo, Cartao, Carregando, Entrada, Selecao, Vazio } from './ui';

/**
 * ============================================================================
 * EDITOR GENÉRICO DE COLEÇÃO
 * ----------------------------------------------------------------------------
 * Peças, diferenciais, galeria, depoimentos, redes e etapas têm a mesma
 * mecânica: listar, criar, editar, remover e ordenar. Em vez de seis telas
 * quase idênticas, existe uma só, configurada por uma lista de campos.
 *
 * O ganho não é só de código: qualquer melhoria de usabilidade (estado de
 * carregamento, erro por campo, confirmação de exclusão) aparece de uma vez em
 * todas as coleções.
 * ============================================================================
 */

export type TipoCampo = 'texto' | 'area' | 'numero' | 'preco' | 'booleano' | 'escolha';

export type DefinicaoCampo = {
  nome: string;
  rotulo: string;
  tipo: TipoCampo;
  dica?: string;
  opcoes?: string[];
  /** Mostrado na tabela de listagem. */
  naLista?: boolean;
};

export type ConfigColecao = {
  /** Caminho na API, ex.: "products". */
  caminho: string;
  titulo: string;
  descricao?: string;
  campos: DefinicaoCampo[];
};

type Registro = Record<string, unknown> & { id: string };

function valorInicial(campos: DefinicaoCampo[]): Record<string, unknown> {
  const inicial: Record<string, unknown> = {};
  for (const campo of campos) {
    if (campo.tipo === 'booleano') inicial[campo.nome] = campo.nome === 'active';
    else if (campo.tipo === 'numero') inicial[campo.nome] = 0;
    else if (campo.tipo === 'preco') inicial[campo.nome] = '';
    else if (campo.tipo === 'escolha') inicial[campo.nome] = campo.opcoes?.[0] ?? '';
    else inicial[campo.nome] = '';
  }
  return inicial;
}

/** Converte o formulário para o formato que a API espera. */
function paraApi(dados: Record<string, unknown>, campos: DefinicaoCampo[]) {
  const saida: Record<string, unknown> = { ...dados };
  for (const campo of campos) {
    const v = saida[campo.nome];
    if (campo.tipo === 'preco') {
      // Vazio precisa virar null: é o que faz a peça exibir "Consultar valor".
      saida[campo.nome] = v === '' || v === null || v === undefined ? null : Number(v);
    }
    if (campo.tipo === 'numero') saida[campo.nome] = Number(v ?? 0);
  }
  return saida;
}

export function ColecaoEditor({ clientId, config }: { clientId: string; config: ConfigColecao }) {
  const [itens, setItens] = useState<Registro[] | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);
  const [errosCampo, setErrosCampo] = useState<Record<string, string[]>>({});
  const [emEdicao, setEmEdicao] = useState<Registro | null>(null);
  const [formulario, setFormulario] = useState(() => valorInicial(config.campos));
  const [salvando, setSalvando] = useState(false);

  const carregar = useCallback(async () => {
    try {
      setItens(await api.get<Registro[]>(`/clients/${clientId}/${config.caminho}`));
      setErro(null);
    } catch (e) {
      setErro(mensagemDoErro(e));
      setItens([]);
    }
  }, [clientId, config.caminho]);

  // Trocar de cliente ou de coleção recarrega a lista.
  useEffect(() => {
    void carregar();
  }, [carregar]);

  function limpar() {
    setEmEdicao(null);
    setFormulario(valorInicial(config.campos));
    setErrosCampo({});
  }

  function editar(item: Registro) {
    const preenchido: Record<string, unknown> = {};
    for (const campo of config.campos) {
      const v = item[campo.nome];
      preenchido[campo.nome] =
        v === null || v === undefined ? (campo.tipo === 'booleano' ? false : '') : v;
    }
    setFormulario(preenchido);
    setEmEdicao(item);
    setErrosCampo({});
  }

  async function salvar() {
    setSalvando(true);
    setErro(null);
    setAviso(null);
    setErrosCampo({});
    try {
      const corpo = paraApi(formulario, config.campos);
      if (emEdicao) {
        await api.put(`/${config.caminho}/${emEdicao.id}`, corpo);
        setAviso('Alterações salvas.');
      } else {
        await api.post(`/clients/${clientId}/${config.caminho}`, corpo);
        setAviso('Item criado.');
      }
      limpar();
      await carregar();
    } catch (e) {
      const detalhe = e as { errors?: Record<string, string[]> };
      if (detalhe.errors) setErrosCampo(detalhe.errors);
      setErro(mensagemDoErro(e));
    } finally {
      setSalvando(false);
    }
  }

  async function remover(item: Registro) {
    const nome = String(item.name ?? item.title ?? item.alt ?? 'este item');
    if (!window.confirm(`Remover "${nome}"? Esta ação não pode ser desfeita.`)) return;
    try {
      await api.remover(`/${config.caminho}/${item.id}`);
      setAviso('Item removido.');
      await carregar();
    } catch (e) {
      setErro(mensagemDoErro(e));
    }
  }

  const camposDaLista = config.campos.filter((c) => c.naLista);

  return (
    <div className="space-y-5">
      <Cartao titulo={config.titulo} descricao={config.descricao}>
        {erro && (
          <div className="mb-4">
            <Aviso tipo="erro">{erro}</Aviso>
          </div>
        )}
        {aviso && (
          <div className="mb-4">
            <Aviso tipo="sucesso">{aviso}</Aviso>
          </div>
        )}

        {itens === null ? (
          <Carregando />
        ) : itens.length === 0 ? (
          <Vazio>Nada cadastrado ainda. Use o formulário abaixo para começar.</Vazio>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200 text-xs text-slate-500 uppercase">
                <tr>
                  {camposDaLista.map((c) => (
                    <th key={c.nome} className="px-2 py-2 font-medium">
                      {c.rotulo}
                    </th>
                  ))}
                  <th className="px-2 py-2 text-right font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {itens.map((item) => (
                  <tr key={item.id} className="border-b border-slate-100 last:border-none">
                    {camposDaLista.map((c) => (
                      <td key={c.nome} className="px-2 py-2.5 text-slate-700">
                        {c.tipo === 'booleano'
                          ? item[c.nome]
                            ? 'Sim'
                            : 'Não'
                          : c.tipo === 'preco'
                            ? item[c.nome] === null
                              ? 'Consultar valor'
                              : `R$ ${Number(item[c.nome]).toFixed(2)}`
                            : String(item[c.nome] ?? '—').slice(0, 60)}
                      </td>
                    ))}
                    <td className="px-2 py-2.5 text-right whitespace-nowrap">
                      <Botao variante="neutro" onClick={() => editar(item)} className="mr-2">
                        Editar
                      </Botao>
                      <Botao variante="perigo" onClick={() => void remover(item)}>
                        Remover
                      </Botao>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Cartao>

      <Cartao titulo={emEdicao ? 'Editar item' : 'Novo item'}>
        <div className="grid gap-4 sm:grid-cols-2">
          {config.campos.map((campo) => {
            const erroDoCampo = errosCampo[campo.nome]?.[0];
            const valor = formulario[campo.nome];

            return (
              <div key={campo.nome} className={campo.tipo === 'area' ? 'sm:col-span-2' : ''}>
                <Campo rotulo={campo.rotulo} dica={campo.dica} erro={erroDoCampo}>
                  {campo.tipo === 'area' ? (
                    <AreaTexto
                      rows={4}
                      value={String(valor ?? '')}
                      onChange={(e) =>
                        setFormulario((f) => ({ ...f, [campo.nome]: e.target.value }))
                      }
                    />
                  ) : campo.tipo === 'booleano' ? (
                    <input
                      type="checkbox"
                      checked={Boolean(valor)}
                      onChange={(e) =>
                        setFormulario((f) => ({ ...f, [campo.nome]: e.target.checked }))
                      }
                      className="size-4 rounded border-slate-300"
                    />
                  ) : campo.tipo === 'escolha' ? (
                    <Selecao
                      value={String(valor ?? '')}
                      onChange={(e) =>
                        setFormulario((f) => ({ ...f, [campo.nome]: e.target.value }))
                      }
                    >
                      {campo.opcoes?.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </Selecao>
                  ) : (
                    <Entrada
                      type={campo.tipo === 'numero' || campo.tipo === 'preco' ? 'number' : 'text'}
                      step={campo.tipo === 'preco' ? '0.01' : undefined}
                      value={String(valor ?? '')}
                      onChange={(e) =>
                        setFormulario((f) => ({ ...f, [campo.nome]: e.target.value }))
                      }
                    />
                  )}
                </Campo>
              </div>
            );
          })}
        </div>

        <div className="mt-5 flex gap-3">
          <Botao onClick={() => void salvar()} disabled={salvando}>
            {salvando ? 'Salvando...' : emEdicao ? 'Salvar alterações' : 'Criar'}
          </Botao>
          {emEdicao && (
            <Botao variante="neutro" onClick={limpar}>
              Cancelar
            </Botao>
          )}
        </div>
      </Cartao>
    </div>
  );
}
