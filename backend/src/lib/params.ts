import type { Request } from 'express';
import { ErroApi } from './respostas.js';

/**
 * Lê um parâmetro da rota já estreitado para string.
 *
 * O Express 5 tipa `req.params` como `string | string[]`, porque a mesma chave
 * pode aparecer mais de uma vez no padrão da rota. Nas rotas desta API isso
 * nunca acontece, então o helper garante o tipo num lugar só — e responde 400
 * caso alguém monte uma URL fora do previsto.
 */
export function param(req: Request, nome: string): string {
  const valor = (req.params as Record<string, string | string[] | undefined>)[nome];
  if (typeof valor === 'string' && valor.length > 0) return valor;
  throw new ErroApi(400, `Parâmetro "${nome}" inválido na URL.`);
}

/**
 * Lê um inteiro da query string, dentro de [min, max]. Valor ausente, repetido
 * (?page=1&page=2) ou que não é número cai no padrão — antes um `?page=abc`
 * virava NaN e derrubava a consulta com erro 500.
 */
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
