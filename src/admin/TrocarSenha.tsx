import { useState, type FormEvent } from 'react';
import { api, ErroDaApi } from '../api/cliente';
import { mensagemDoErro } from './useAuth';
import { Aviso, Botao, Campo, Cartao, Entrada } from './ui';

/** Troca a senha de quem está logado. O backend encerra a sessão em seguida. */
export function TrocarSenha({
  aoConcluir,
  aoCancelar,
}: {
  aoConcluir: () => void;
  aoCancelar: () => void;
}) {
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmacao, setConfirmacao] = useState('');
  const [erros, setErros] = useState<{ senhaAtual?: string; novaSenha?: string; confirmacao?: string }>({});
  const [erroGeral, setErroGeral] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  async function submeter(evento: FormEvent) {
    evento.preventDefault();
    setErroGeral(null);

    if (novaSenha.length < 8) {
      setErros({ novaSenha: 'A nova senha precisa de pelo menos 8 caracteres.' });
      return;
    }
    if (novaSenha !== confirmacao) {
      setErros({ confirmacao: 'As duas senhas não são iguais.' });
      return;
    }
    setErros({});

    setEnviando(true);
    try {
      await api.post('/auth/senha', { senhaAtual, novaSenha });
      aoConcluir();
    } catch (e) {
      if (e instanceof ErroDaApi && e.errors) {
        setErros({ senhaAtual: e.errors.senhaAtual?.[0], novaSenha: e.errors.novaSenha?.[0] });
      } else {
        setErroGeral(mensagemDoErro(e));
      }
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <Cartao titulo="Trocar senha" descricao="Depois de trocar, você entra de novo com a senha nova.">
        <form onSubmit={submeter} className="space-y-4">
          <Campo rotulo="Senha atual" erro={erros.senhaAtual}>
            <Entrada
              type="password"
              autoComplete="current-password"
              required
              value={senhaAtual}
              onChange={(e) => setSenhaAtual(e.target.value)}
            />
          </Campo>
          <Campo rotulo="Nova senha" dica="Pelo menos 8 caracteres." erro={erros.novaSenha}>
            <Entrada
              type="password"
              autoComplete="new-password"
              required
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
            />
          </Campo>
          <Campo rotulo="Repita a nova senha" erro={erros.confirmacao}>
            <Entrada
              type="password"
              autoComplete="new-password"
              required
              value={confirmacao}
              onChange={(e) => setConfirmacao(e.target.value)}
            />
          </Campo>

          {erroGeral && <Aviso tipo="erro">{erroGeral}</Aviso>}

          <div className="flex gap-3">
            <Botao type="submit" disabled={enviando}>
              {enviando ? 'Salvando...' : 'Salvar nova senha'}
            </Botao>
            <Botao variante="neutro" onClick={aoCancelar}>
              Cancelar
            </Botao>
          </div>
        </form>
      </Cartao>
    </div>
  );
}
