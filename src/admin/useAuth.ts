import { useCallback, useEffect, useState } from 'react';
import { api, ErroDaApi } from '../api/cliente';

export type Usuario = {
  id: string;
  name: string;
  email: string;
  role: 'OWNER' | 'EDITOR';
  clientId: string | null;
};

type Estado = 'verificando' | 'entrou' | 'fora';

/**
 * Sessão do painel.
 *
 * O token vive num cookie httpOnly, então o JavaScript nunca o vê — a única
 * forma de saber se a sessão vale é perguntar ao servidor em `/auth/me`.
 * É o que roda na montagem, e o que devolve o usuário para as telas.
 */
export function useAuth() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [estado, setEstado] = useState<Estado>('verificando');

  useEffect(() => {
    let ativo = true;
    api
      .get<Usuario>('/auth/me')
      .then((u) => {
        if (!ativo) return;
        setUsuario(u);
        setEstado('entrou');
      })
      .catch(() => {
        if (!ativo) return;
        setUsuario(null);
        setEstado('fora');
      });
    return () => {
      ativo = false;
    };
  }, []);

  const entrar = useCallback(async (email: string, password: string) => {
    const u = await api.post<Usuario>('/auth/login', { email, password });
    setUsuario(u);
    setEstado('entrou');
    return u;
  }, []);

  const sair = useCallback(async () => {
    try {
      await api.post('/auth/logout');
    } catch {
      // Mesmo se a chamada falhar, a sessão local é encerrada.
    }
    setUsuario(null);
    setEstado('fora');
  }, []);

  return { usuario, estado, entrar, sair };
}

/** Mensagem de erro pronta para exibir, vinda de qualquer falha da API. */
export function mensagemDoErro(erro: unknown): string {
  if (erro instanceof ErroDaApi) return erro.message;
  if (erro instanceof Error) return erro.message;
  return 'Algo deu errado. Tente novamente.';
}
