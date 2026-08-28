import { useContext } from 'react';
import { ContextoDoSite, type ValorDoContexto } from './contexto';
import { clientData } from '../data/clientData';
import { criarAjudantes } from './ajudantes';

/**
 * Acesso ao conteúdo do site e aos ajudantes de link.
 *
 * Fora do provider (as páginas do painel, por exemplo) devolve o conteúdo
 * padrão do arquivo local, para nenhum componente compartilhado quebrar.
 */
export function useSite(): ValorDoContexto {
  const contexto = useContext(ContextoDoSite);
  if (contexto) return contexto;

  return {
    conteudo: clientData,
    estado: 'offline',
    daApi: false,
    ...criarAjudantes(clientData),
  };
}
