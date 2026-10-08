import { useContext } from 'react';
import { ContextoDoSite, type ValorDoContexto } from './contexto';
import { clientData } from '../data/clientData';
import { criarAjudantes } from './ajudantes';

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
