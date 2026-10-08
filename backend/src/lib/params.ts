import type { Request } from 'express';
import { ErroApi } from './respostas.js';

export function param(req: Request, nome: string): string {
  const valor = (req.params as Record<string, string | string[] | undefined>)[nome];
  if (typeof valor === 'string' && valor.length > 0) return valor;
  throw new ErroApi(400, `Parâmetro "${nome}" inválido na URL.`);
}

export function inteiroDaQuery(
  req: Request,
  nome: string,
  padrao: number,
  min: number,
  max: number,
): number {
  const numero = Number.parseInt(query(req, nome) ?? '', 10);
  if (!Number.isFinite(numero)) return padrao;
  return Math.min(max, Math.max(min, numero));
}

/** Lê um parâmetro de query string como texto simples, se existir. */
export function query(req: Request, nome: string): string | undefined {
  const valor = req.query[nome];
  return typeof valor === 'string' && valor.length > 0 ? valor : undefined;
}
