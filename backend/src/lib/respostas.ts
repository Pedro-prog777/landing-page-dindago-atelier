import type { Response } from 'express';

/**
 * Formato único de resposta da API.
 *
 * Todo endpoint devolve `{ success, data }` ou `{ success, message, errors }`.
 * O frontend nunca precisa adivinhar o formato, e a mensagem de erro é sempre
 * segura para exibir ao usuário — detalhes internos ficam no log do servidor.
 */
export type RespostaOk<T> = { success: true; data: T };
export type RespostaErro = {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
};

export function ok<T>(res: Response, data: T, status = 200) {
  return res.status(status).json({ success: true, data } satisfies RespostaOk<T>);
}

export function criado<T>(res: Response, data: T) {
  return ok(res, data, 201);
}

export function semConteudo(res: Response) {
  return res.status(204).end();
}

/**
 * Erro previsto pela aplicação. O middleware de erros transforma numa resposta
 * com a mensagem informada; qualquer outro erro vira 500 genérico.
 */
export class ErroApi extends Error {
  status: number;
  errors?: Record<string, string[]>;

  constructor(status: number, message: string, errors?: Record<string, string[]>) {
    super(message);
    this.name = 'ErroApi';
    this.status = status;
    this.errors = errors;
  }

  static naoEncontrado(recurso = 'Recurso') {
    return new ErroApi(404, `${recurso} não encontrado.`);
  }

  static naoAutorizado(mensagem = 'Sessão inválida ou expirada.') {
    return new ErroApi(401, mensagem);
  }

  static semPermissao(mensagem = 'Você não tem permissão para esta ação.') {
    return new ErroApi(403, mensagem);
  }

  static conflito(mensagem: string) {
    return new ErroApi(409, mensagem);
  }

  static invalido(mensagem: string, errors?: Record<string, string[]>) {
    return new ErroApi(422, mensagem, errors);
  }
}
