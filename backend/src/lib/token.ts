import jwt from 'jsonwebtoken';
import { env, emProducao } from '../env.js';

export type Sessao = {
  userId: string;
  email: string;
  role: string;
  clientId: string | null;
};

const VALIDADE = '7d';
export const NOME_COOKIE = 'dindago_sessao';

export function assinarToken(sessao: Sessao): string {
  return jwt.sign(sessao, env.JWT_SECRET, { expiresIn: VALIDADE });
}

export function lerToken(token: string): Sessao | null {
  try {
    return jwt.verify(token, env.JWT_SECRET) as Sessao;
  } catch {
    // Token expirado, adulterado ou assinado com outro segredo.
    return null;
  }
}

/**
 * O token viaja em cookie httpOnly: JavaScript da página não consegue lê-lo,
 * o que fecha a porta para roubo de sessão por XSS.
 */
export const opcoesCookie = {
  httpOnly: true,
  secure: emProducao,
  sameSite: 'lax' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: '/',
};
