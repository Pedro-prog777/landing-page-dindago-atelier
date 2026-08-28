import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { ErroApi } from '../lib/respostas.js';
import { emProducao } from '../env.js';

/** Rota inexistente vira 404 no formato padrão, não a página HTML do Express. */
export function rotaNaoEncontrada(req: Request, res: Response) {
  res.status(404).json({
    success: false,
    message: `Rota não encontrada: ${req.method} ${req.originalUrl}`,
  });
}

/**
 * Último middleware da cadeia: converte qualquer erro numa resposta previsível.
 *
 * Em produção o cliente recebe só a mensagem — stack trace e detalhes internos
 * ficam no log do servidor, para não vazarem estrutura da aplicação.
 */
export function tratarErros(
  erro: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (erro instanceof ZodError) {
    const errors: Record<string, string[]> = {};
    for (const problema of erro.issues) {
      const campo = problema.path.join('.') || '_';
      (errors[campo] ??= []).push(problema.message);
    }
    return res.status(422).json({
      success: false,
      message: 'Dados inválidos. Confira os campos destacados.',
      errors,
    });
  }

  if (erro instanceof ErroApi) {
    return res.status(erro.status).json({
      success: false,
      message: erro.message,
      ...(erro.errors ? { errors: erro.errors } : {}),
    });
  }

  // Violação de restrição única do Prisma (P2002).
  if (typeof erro === 'object' && erro !== null && 'code' in erro) {
    const codigo = (erro as { code?: string }).code;
    if (codigo === 'P2002') {
      return res.status(409).json({
        success: false,
        message: 'Já existe um registro com esse valor único.',
      });
    }
    if (codigo === 'P2025') {
      return res.status(404).json({ success: false, message: 'Registro não encontrado.' });
    }
  }

  console.error('[erro nao tratado]', erro);

  return res.status(500).json({
    success: false,
    message: emProducao
      ? 'Erro interno. Tente novamente em instantes.'
      : `Erro interno: ${erro instanceof Error ? erro.message : String(erro)}`,
  });
}

/**
 * Envolve um handler assíncrono para que qualquer promessa rejeitada caia no
 * middleware de erros em vez de derrubar o processo.
 */
export function assincrono<T extends (req: Request, res: Response) => Promise<unknown>>(
  handler: T,
) {
  return (req: Request, res: Response, next: NextFunction) => {
    handler(req, res).catch(next);
  };
}
