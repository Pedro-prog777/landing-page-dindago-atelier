import { Cacto, Flor, Folha, MaosCoracao, Passaro, Presente, Sol } from './Decorations';

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
