import {
  Bird,
  Cactus,
  Flower,
  GiftIcon,
  HandsHeart,
  LeafIcon,
  SunRays,
} from './Decorations';

/**
 * Liga o campo `icon` do clientData ao desenho correspondente.
 * Fica em arquivo próprio para não quebrar o fast refresh do Vite —
 * um módulo de componentes deve exportar apenas componentes.
 */
export const iconesAtelier = {
  maos: HandsHeart,
  folha: LeafIcon,
  sol: SunRays,
  cacto: Cactus,
  presente: GiftIcon,
  flor: Flower,
  passaro: Bird,
} as const;

export type NomeIcone = keyof typeof iconesAtelier;
