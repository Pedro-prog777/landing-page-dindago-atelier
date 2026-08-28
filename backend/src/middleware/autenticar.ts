import type { NextFunction, Request, Response } from 'express';
import { ErroApi } from '../lib/respostas.js';
import { lerToken, NOME_COOKIE, type Sessao } from '../lib/token.js';

declare module 'express-serve-static-core' {
  interface Request {
    sessao?: Sessao;
  }
}

/** Exige sessão válida. Sem cookie ou com token inválido, responde 401. */
export function exigirLogin(req: Request, _res: Response, next: NextFunction) {
  const token = req.cookies?.[NOME_COOKIE];
  if (!token) throw ErroApi.naoAutorizado('Faça login para continuar.');

  const sessao = lerToken(token);
  if (!sessao) throw ErroApi.naoAutorizado();

  req.sessao = sessao;
  next();
}

/** Restringe a ação ao perfil OWNER (quem enxerga todos os clientes). */
export function exigirDono(req: Request, _res: Response, next: NextFunction) {
  if (req.sessao?.role !== 'OWNER') {
    throw ErroApi.semPermissao('Apenas o perfil OWNER pode fazer isso.');
  }
  next();
}

/**
 * Garante que um EDITOR só toque no cliente ao qual pertence.
 * O OWNER passa livre por qualquer cliente.
 */
export function conferirAcessoAoCliente(sessao: Sessao | undefined, clientId: string) {
  if (!sessao) throw ErroApi.naoAutorizado();
  if (sessao.role === 'OWNER') return;
  if (sessao.clientId !== clientId) {
    throw ErroApi.semPermissao('Este cliente não pertence à sua conta.');
  }
}
