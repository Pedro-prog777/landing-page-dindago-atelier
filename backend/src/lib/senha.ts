import bcrypt from 'bcryptjs';

/** Custo do bcrypt: 12 rodadas equilibra segurança e tempo de resposta. */
const RODADAS = 12;

export function gerarHash(senha: string): Promise<string> {
  return bcrypt.hash(senha, RODADAS);
}

export function conferirSenha(senha: string, hash: string): Promise<boolean> {
  return bcrypt.compare(senha, hash);
}
