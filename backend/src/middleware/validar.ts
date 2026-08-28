import type { NextFunction, Request, Response } from 'express';
import type { ZodType } from 'zod';

/**
 * Valida o corpo da requisição e substitui `req.body` pelo dado já convertido.
 *
 * Nada que venha do frontend é usado sem passar por aqui: o corpo é sempre
 * reescrito pelo resultado do parse, então campos extras são descartados.
 */
export function validarCorpo<T>(esquema: ZodType<T>) {
  return (req: Request, _res: Response, next: NextFunction) => {
    req.body = esquema.parse(req.body);
    next();
  };
}
