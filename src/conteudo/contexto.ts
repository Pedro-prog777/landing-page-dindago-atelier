import { createContext } from 'react';
import type { ConteudoDoSite } from './mesclar';
import type { AjudantesDoSite } from './ajudantes';

export type EstadoDoConteudo = 'carregando' | 'pronto' | 'offline';

export type ValorDoContexto = {
  conteudo: ConteudoDoSite;
  estado: EstadoDoConteudo;
  /** Verdadeiro quando o conteúdo exibido veio da API, não do arquivo local. */
  daApi: boolean;
} & AjudantesDoSite;

export const ContextoDoSite = createContext<ValorDoContexto | null>(null);
