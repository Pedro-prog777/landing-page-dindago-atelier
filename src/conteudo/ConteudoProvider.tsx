import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { api } from '../api/cliente';
import { clientData } from '../data/clientData';
import { mesclarConteudo, type ConteudoDoSite } from './mesclar';
import { criarAjudantes } from './ajudantes';
import { aplicarSeo, aplicarTema } from '../lib/theme';
import { ContextoDoSite, type EstadoDoConteudo, type ValorDoContexto } from './contexto';

/**
 * ============================================================================
 * CONTEÚDO DO SITE
 * ----------------------------------------------------------------------------
 * Busca o conteúdo do cliente na API e o disponibiliza para a página inteira.
 *
 * A regra que protege o design: a renderização NUNCA espera a rede. O provider
 * começa já com o `clientData` local, e o que vem da API apenas substitui campo
 * a campo quando chega. Backend fora do ar, resposta lenta ou campo vazio não
 * abrem buraco no layout — a landing page continua completa.
 * ============================================================================
 */

/** Qual cliente esta instalação serve. Trocar aqui publica outra landing page. */
const SLUG_DO_CLIENTE = import.meta.env.VITE_CLIENT_SLUG || 'dindago-atelier';

export function ConteudoProvider({ children }: { children: ReactNode }) {
  const [conteudo, setConteudo] = useState<ConteudoDoSite>(clientData);
  const [estado, setEstado] = useState<EstadoDoConteudo>('carregando');
  const [daApi, setDaApi] = useState(false);

  useEffect(() => {
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
