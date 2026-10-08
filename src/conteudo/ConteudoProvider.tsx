import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { api, API_DESATIVADA } from '../api/cliente';
import { clientData } from '../data/clientData';
import { mesclarConteudo, type ConteudoDoSite } from './mesclar';
import { criarAjudantes } from './ajudantes';
import { aplicarSeo, aplicarTema } from '../lib/theme';
import { ContextoDoSite, type EstadoDoConteudo, type ValorDoContexto } from './contexto';

/** Qual cliente esta instalação serve. Trocar aqui publica outra landing page. */
const SLUG_DO_CLIENTE = import.meta.env.VITE_CLIENT_SLUG || 'dindago-atelier';

export function ConteudoProvider({ children }: { children: ReactNode }) {
  // Começa com o conteúdo local: a página nunca espera a API para aparecer.
  const [conteudo, setConteudo] = useState<ConteudoDoSite>(clientData);
  const [estado, setEstado] = useState<EstadoDoConteudo>('carregando');
  const [daApi, setDaApi] = useState(false);

  useEffect(() => {
    // Publicado sem servidor: o conteúdo local já é o definitivo.
    if (API_DESATIVADA) {
      setEstado('offline');
      return;
    }

    const controle = new AbortController();

    api
      .get<Parameters<typeof mesclarConteudo>[0]>(`/site/${SLUG_DO_CLIENTE}`, controle.signal)
      .then((resposta) => {
        setConteudo(mesclarConteudo(resposta));
        setDaApi(true);
        setEstado('pronto');
      })
      .catch((erro: unknown) => {
        if (erro instanceof DOMException && erro.name === 'AbortError') return;
        // Segue com o conteúdo local: o visitante não percebe diferença.
        console.warn('[conteudo] API indisponível, usando o conteúdo local.', erro);
        setEstado('offline');
      });

    return () => controle.abort();
  }, []);

  // Repinta a paleta e atualiza as metatags a cada mudança de conteúdo.
  useEffect(() => {
    aplicarTema(conteudo);
    aplicarSeo(conteudo);
  }, [conteudo]);

  const valor = useMemo<ValorDoContexto>(
    () => ({ conteudo, estado, daApi, ...criarAjudantes(conteudo) }),
    [conteudo, estado, daApi],
  );

  return <ContextoDoSite.Provider value={valor}>{children}</ContextoDoSite.Provider>;
}
