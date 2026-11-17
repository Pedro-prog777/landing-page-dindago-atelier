/**
 * Cria (ou redefine a senha de) um usuário do painel /admin.
 *
 *   npm run usuario:criar
 *
 * Pergunta e-mail, nome, perfil e senha (em branco = gera uma senha forte e
 * mostra na tela UMA vez). A senha não é gravada em arquivo nenhum: só o hash vai
 * para o banco. Usa o DATABASE_URL do backend/.env; para o banco de produção,
 * defina DATABASE_URL no terminal antes de rodar.
 *
 * Se o e-mail já existir, o script redefine a senha — útil quando alguém
 * esquece a senha. Também oferece apagar as contas de teste criadas pelo seed.
 */
import 'dotenv/config';
import crypto from 'node:crypto';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { criarClientePrisma } from '../src/criarClientePrisma.js';
import { gerarHash } from '../src/lib/senha.js';

const prisma = criarClientePrisma(process.env.DATABASE_URL, ['error']);
const terminal = readline.createInterface({ input, output });

/** Sem caracteres ambíguos (0/O, 1/l/I), fácil de ditar por telefone. */
function gerarSenhaProvisoria(tamanho = 14) {
  const letras = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ23456789';
  return Array.from({ length: tamanho }, () => letras[crypto.randomInt(letras.length)]).join('');
}

async function perguntar(texto: string, padrao?: string) {
  const sufixo = padrao ? ` [${padrao}]` : '';
  const resposta = (await terminal.question(`${texto}${sufixo}: `)).trim();
  return resposta || padrao || '';
}

async function confirmar(texto: string) {
  const resposta = (await terminal.question(`${texto} (s/N): `)).trim().toLowerCase();
  return resposta === 's' || resposta === 'sim';
}

function onde(url: string | undefined) {
  if (!url) return '(DATABASE_URL não definida)';
  if (url.startsWith('file:')) return `SQLite local (${url})`;
  try {
    const u = new URL(url);
    return `PostgreSQL em ${u.hostname}${u.pathname}`;
  } catch {
    return '(endereço do banco ilegível)';
  }
}

async function principal() {
  console.log('\nCriar acesso ao painel /admin');
  console.log(`Banco: ${onde(process.env.DATABASE_URL)}\n`);

  const email = (await perguntar('E-mail de acesso')).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('E-mail inválido.');

  const existente = await prisma.user.findUnique({ where: { email } });
  if (existente) {
    console.log(`\nJá existe um usuário com este e-mail: ${existente.name} (${existente.role}).`);
    if (!(await confirmar('Gerar uma senha nova para ele?'))) return;
  }

  const nome = existente?.name ?? (await perguntar('Nome de quem vai usar'));
  if (!nome) throw new Error('Informe o nome.');

  const perfil = (
    existente?.role ??
    (await perguntar('Perfil: EDITOR (edita um site) ou OWNER (vê todos)', 'EDITOR'))
  ).toUpperCase();
  if (perfil !== 'EDITOR' && perfil !== 'OWNER') throw new Error('Perfil deve ser EDITOR ou OWNER.');

  let clientId: string | null = existente?.clientId ?? null;
  if (!existente && perfil === 'EDITOR') {
    const clientes = await prisma.client.findMany({ select: { id: true, slug: true, name: true } });
    if (clientes.length === 0) throw new Error('Nenhum cliente cadastrado no banco.');
    console.log(`Clientes: ${clientes.map((c) => c.slug).join(', ')}`);
    const slug = await perguntar('Qual site este usuário edita', clientes[0]?.slug);
    const cliente = clientes.find((c) => c.slug === slug);
    if (!cliente) throw new Error(`Cliente "${slug}" não encontrado.`);
    clientId = cliente.id;
  }

  const digitada = await perguntar('Senha (mínimo 8 caracteres; Enter para gerar uma)');
  if (digitada && digitada.length < 8) throw new Error('A senha precisa de pelo menos 8 caracteres.');
  const senha = digitada || gerarSenhaProvisoria();
  const passwordHash = await gerarHash(senha);

  if (existente) {
    await prisma.user.update({ where: { id: existente.id }, data: { passwordHash } });
  } else {
    await prisma.user.create({
      data: { email, name: nome, passwordHash, role: perfil, clientId },
    });
  }

  console.log('\n========================================================');
  console.log(existente ? ' Senha redefinida.' : ' Usuário criado.');
  console.log(` E-mail: ${email}`);
  if (digitada) {
    console.log(' Senha: a que foi digitada.');
  } else {
    console.log(` Senha provisória: ${senha}`);
    console.log(' Anote agora: ela não fica salva em lugar nenhum.');
    console.log(' Peça para a pessoa trocar em "Trocar senha" no painel.');
  }
  console.log('========================================================\n');

  // Contas de demonstração do seed têm senha pública no repositório.
  const deTeste = await prisma.user.findMany({
    where: { email: { endsWith: '@dindago.local' } },
    select: { id: true, email: true },
  });
  if (deTeste.length > 0) {
    console.log('Atenção: este banco tem contas de teste com senha conhecida:');
    for (const u of deTeste) console.log(`  - ${u.email}`);

    // Nunca deixa o painel sem nenhum OWNER de verdade.
    const ownersReais = await prisma.user.count({
      where: { role: 'OWNER', NOT: { email: { endsWith: '@dindago.local' } } },
    });
    if (ownersReais === 0) {
      console.log(
        'Crie primeiro o SEU acesso como OWNER (rode o comando de novo) e depois apague estas contas.\n',
      );
    } else if (await confirmar('Apagar essas contas de teste agora?')) {
      await prisma.user.deleteMany({ where: { id: { in: deTeste.map((u) => u.id) } } });
      console.log('Contas de teste apagadas.\n');
    }
  }
}

principal()
  .catch((erro: unknown) => {
    console.error(`\nNão foi possível concluir: ${erro instanceof Error ? erro.message : erro}\n`);
    process.exitCode = 1;
  })
  .finally(async () => {
    terminal.close();
    await prisma.$disconnect();
  });
