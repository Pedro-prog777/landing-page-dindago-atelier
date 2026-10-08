import { lazy } from 'react';

/**
 * O painel é carregado só quando alguém abre /admin: o visitante da landing
 * page não baixa o código do painel.
 */
export const AdminSobDemanda = lazy(() =>
  import('./AdminApp').then((modulo) => ({ default: modulo.AdminApp })),
);
