import { Router } from 'express';
import { prisma } from '../db.js';
import { ErroApi, ok } from '../lib/respostas.js';
import { conferirSenha, gerarHash } from '../lib/senha.js';
import { assinarToken, NOME_COOKIE, opcoesCookie } from '../lib/token.js';
import { exigirLogin } from '../middleware/autenticar.js';
import { limiteLogin } from '../middleware/limitarTaxa.js';
import { assincrono } from '../middleware/tratarErros.js';
import { validarCorpo } from '../middleware/validar.js';
import { loginSchema, trocarSenhaSchema } from '../schemas/index.js';

export const rotasAuth = Router();

/**
 * POST /api/auth/login
 *
 * A resposta é a mesma para e-mail inexistente e senha errada — dizer qual dos
 * dois falhou entregaria a um atacante a lista de e-mails cadastrados.
 */
rotasAuth.post(
  '/login',
  limiteLogin,
  validarCorpo(loginSchema),
  assincrono(async (req, res) => {
    const { email, password } = req.body as { email: string; password: string };

    const usuario = await prisma.user.findUnique({ where: { email } });
    if (!usuario) throw ErroApi.naoAutorizado('E-mail ou senha inválidos.');

    const senhaConfere = await conferirSenha(password, usuario.passwordHash);
    if (!senhaConfere) throw ErroApi.naoAutorizado('E-mail ou senha inválidos.');

    const sessao = {
      userId: usuario.id,
      email: usuario.email,
      role: usuario.role,
      clientId: usuario.clientId,
    };

    await prisma.user.update({
      where: { id: usuario.id },
      data: { lastLoginAt: new Date() },
    });

    res.cookie(NOME_COOKIE, assinarToken(sessao), opcoesCookie);

    return ok(res, {
      id: usuario.id,
      name: usuario.name,
      email: usuario.email,
      role: usuario.role,
      clientId: usuario.clientId,
    });
  }),
);

/** POST /api/auth/logout — apaga o cookie de sessão. */
rotasAuth.post('/logout', (_req, res) => {
  res.clearCookie(NOME_COOKIE, { ...opcoesCookie, maxAge: undefined });
  return ok(res, { message: 'Sessão encerrada.' });
});

/** GET /api/auth/me — usado pelo painel para saber se a sessão ainda vale. */
rotasAuth.get(
  '/me',
  exigirLogin,
  assincrono(async (req, res) => {
    const usuario = await prisma.user.findUnique({
      where: { id: req.sessao!.userId },
      select: { id: true, name: true, email: true, role: true, clientId: true },
    });
    if (!usuario) throw ErroApi.naoAutorizado();
    return ok(res, usuario);
  }),
);

/** POST /api/auth/senha — troca a própria senha. */
rotasAuth.post(
  '/senha',
  exigirLogin,
  validarCorpo(trocarSenhaSchema),
  assincrono(async (req, res) => {
    const { senhaAtual, novaSenha } = req.body as { senhaAtual: string; novaSenha: string };

    const usuario = await prisma.user.findUnique({ where: { id: req.sessao!.userId } });
    if (!usuario) throw ErroApi.naoAutorizado();

    const confere = await conferirSenha(senhaAtual, usuario.passwordHash);
    if (!confere) throw ErroApi.invalido('A senha atual está incorreta.');

    await prisma.user.update({
      where: { id: usuario.id },
      data: { passwordHash: await gerarHash(novaSenha) },
    });

    // Encerra a sessão: a próxima entrada já usa a senha nova.
    res.clearCookie(NOME_COOKIE, { ...opcoesCookie, maxAge: undefined });
    return ok(res, { message: 'Senha alterada. Entre novamente.' });
  }),
);
