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

/**
 * Hash usado quando o e-mail do login não existe. Comparar a senha com ele
 * gasta o mesmo tempo de um usuário real; sem isto a resposta saía em ~3 ms
 * para e-mail inexistente e ~270 ms para senha errada, e o tempo entregava
 * quais e-mails estão cadastrados.
 */
export function hashParaComparacaoFalsa(): Promise<string> {
  hashDeReferencia ??= bcrypt.hash(crypto.randomUUID(), RODADAS);
  return hashDeReferencia;
}
