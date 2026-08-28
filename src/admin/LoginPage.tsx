import { useState, type FormEvent } from 'react';
import { Aviso, Botao, Campo, Entrada } from './ui';
import { mensagemDoErro } from './useAuth';

/** Tela de entrada do painel. */
export function LoginPage({
  aoEntrar,
}: {
  aoEntrar: (email: string, senha: string) => Promise<unknown>;
}) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  async function submeter(evento: FormEvent) {
    evento.preventDefault();
    setErro(null);
    setEnviando(true);
    try {
      await aoEntrar(email, senha);
    } catch (e) {
      setErro(mensagemDoErro(e));
    } finally {
      setEnviando(false);
    }
  }

  return (
    <main className="painel flex min-h-dvh items-center justify-center bg-slate-100 px-4">
      <form
        onSubmit={submeter}
        className="w-full max-w-sm rounded-lg border border-slate-200 bg-white p-7"
      >
        <h1 className="text-lg font-semibold text-slate-900">Painel do atelier</h1>
        <p className="mt-1 text-sm text-slate-500">Entre para editar o conteúdo do site.</p>

        <div className="mt-6 space-y-4">
          <Campo rotulo="E-mail">
            <Entrada
              type="email"
              name="email"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Campo>

          <Campo rotulo="Senha">
            <Entrada
              type="password"
              name="password"
              autoComplete="current-password"
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </Campo>

          {erro && <Aviso tipo="erro">{erro}</Aviso>}

          <Botao type="submit" disabled={enviando} className="w-full">
            {enviando ? 'Entrando...' : 'Entrar'}
          </Botao>
        </div>
      </form>
    </main>
  );
}
