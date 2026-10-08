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

export function tratarErros(erro: unknown, _req: Request, res: Response, _next: NextFunction) {
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

  // Erros do leitor de JSON do Express (corpo malformado ou grande demais).
  if (typeof erro === 'object' && erro !== null && 'type' in erro && 'status' in erro) {
    const { type, status } = erro as { type?: string; status?: number };
    if (type === 'entity.parse.failed') {
      return res
        .status(400)
        .json({ success: false, message: 'O corpo da requisição não é um JSON válido.' });
    }
    if (type === 'entity.too.large') {
      return res.status(413).json({ success: false, message: 'O conteúdo enviado é grande demais.' });
    }
    if (typeof status === 'number' && status >= 400 && status < 500) {
      return res.status(status).json({ success: false, message: 'Requisição inválida.' });
    }
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
    if (['P1000', 'P1001', 'P1017'].includes(codigo ?? '')) {
      return res.status(503).json({
        success: false,
        message:
          'Não foi possível conectar ao banco de dados. Verifique a DATABASE_URL, as credenciais e se o serviço configurado está disponível.',
      });
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

export function assincrono<T extends (req: Request, res: Response) => Promise<unknown>>(
  handler: T,
) {
  return (req: Request, res: Response, next: NextFunction) => {
    handler(req, res).catch(next);
  };
}
