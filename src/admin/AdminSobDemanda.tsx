import { lazy } from 'react';

export const AdminSobDemanda = lazy(() =>
  import('./AdminApp').then((modulo) => ({ default: modulo.AdminApp })),
);
