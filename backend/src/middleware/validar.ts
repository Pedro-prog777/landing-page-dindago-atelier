import type { NextFunction, Request, Response } from 'express';
import type { ZodType } from 'zod';

export function validarCorpo<T>(esquema: ZodType<T>) {
  return (req: Request, _res: Response, next: NextFunction) => {
    req.body = esquema.parse(req.body);
    next();
  };
}
