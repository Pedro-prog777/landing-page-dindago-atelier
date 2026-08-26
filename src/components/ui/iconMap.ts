import { Cacto, Flor, Folha, MaosCoracao, Passaro, Presente, Sol } from './Decorations';

/**
 * Liga o campo `icon` do clientData ao desenho correspondente.
 * Fica em arquivo próprio para não quebrar o fast refresh do Vite —
 * um módulo de componentes deve exportar apenas componentes.
 */
export const iconesAtelier = {
  maos: MaosCoracao,
  folha: Folha,
  sol: Sol,
  cacto: Cacto,
  presente: Presente,
  flor: Flor,
  passaro: Passaro,
} as const;

export type NomeIcone = keyof typeof iconesAtelier;
