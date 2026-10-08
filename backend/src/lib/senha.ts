import crypto from 'node:crypto';
import bcrypt from 'bcryptjs';

/** Custo do bcrypt: 12 rodadas equilibra segurança e tempo de resposta. */
const RODADAS = 12;

export function gerarHash(senha: string): Promise<string> {
  return bcrypt.hash(senha, RODADAS);
}

export function conferirSenha(senha: string, hash: string): Promise<boolean> {
  return bcrypt.compare(senha, hash);
}

let hashDeReferencia: Promise<string> | undefined;

/** Usado com e-mail inexistente: o login gasta o mesmo tempo e não revela quem está cadastrado. */
export function hashParaComparacaoFalsa(): Promise<string> {
  hashDeReferencia ??= bcrypt.hash(crypto.randomUUID(), RODADAS);
  return hashDeReferencia;
}
