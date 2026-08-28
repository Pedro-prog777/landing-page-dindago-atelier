/**
 * ============================================================================
 * CLIENTE HTTP DA API
 * ----------------------------------------------------------------------------
 * Um único ponto de entrada para falar com o backend. Centralizar aqui garante
 * três coisas em toda chamada: o cookie de sessão viaja junto, a resposta é
 * desembrulhada do envelope `{ success, data }` e o erro chega ao componente
 * como uma exceção com mensagem pronta para exibir.
 * ============================================================================
 */

/** Em desenvolvimento o Vite faz proxy de /api para o backend (ver vite.config). */
const BASE = import.meta.env.VITE_API_URL ?? '/api';

export class ErroDaApi extends Error {
  status: number;
  errors?: Record<string, string[]>;

  constructor(status: number, message: string, errors?: Record<string, string[]>) {
    super(message);
    this.name = 'ErroDaApi';
    this.status = status;
    this.errors = errors;
  }
}

type Opcoes = {
  metodo?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  corpo?: unknown;
  /** Envia FormData sem cabeçalho JSON (usado no upload de imagem). */
  formulario?: FormData;
  sinal?: AbortSignal;
};

export async function chamarApi<T>(caminho: string, opcoes: Opcoes = {}): Promise<T> {
  const { metodo = 'GET', corpo, formulario, sinal } = opcoes;

  let resposta: Response;
  try {
    resposta = await fetch(`${BASE}${caminho}`, {
      method: metodo,
      // Sem isto o cookie httpOnly de sessão não acompanha a requisição.
      credentials: 'include',
      signal: sinal,
      ...(formulario
        ? { body: formulario }
        : corpo !== undefined
          ? { headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(corpo) }
          : {}),
    });
  } catch (erro) {
    if (erro instanceof DOMException && erro.name === 'AbortError') throw erro;
    // Backend fora do ar, sem rede, DNS: nada disso deve derrubar a página.
    throw new ErroDaApi(0, 'Não foi possível falar com o servidor.');
  }

  if (resposta.status === 204) return undefined as T;

  let json: unknown;
  try {
    json = await resposta.json();
  } catch {
    throw new ErroDaApi(resposta.status, 'Resposta inesperada do servidor.');
  }

  const envelope = json as {
    success?: boolean;
    data?: T;
    message?: string;
    errors?: Record<string, string[]>;
  };

  if (!resposta.ok || envelope.success === false) {
    throw new ErroDaApi(
      resposta.status,
      envelope.message ?? 'Não foi possível concluir a operação.',
      envelope.errors,
    );
  }

  return envelope.data as T;
}

export const api = {
  get: <T>(caminho: string, sinal?: AbortSignal) => chamarApi<T>(caminho, { sinal }),
  post: <T>(caminho: string, corpo?: unknown) => chamarApi<T>(caminho, { metodo: 'POST', corpo }),
  put: <T>(caminho: string, corpo?: unknown) => chamarApi<T>(caminho, { metodo: 'PUT', corpo }),
  remover: <T>(caminho: string) => chamarApi<T>(caminho, { metodo: 'DELETE' }),
  enviarArquivo: <T>(caminho: string, formulario: FormData) =>
    chamarApi<T>(caminho, { metodo: 'POST', formulario }),
};
