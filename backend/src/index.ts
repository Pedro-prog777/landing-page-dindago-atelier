import { criarApp } from './app.js';
import { prisma } from './db.js';
import { env } from './env.js';

const app = criarApp();

const servidor = app.listen(env.PORT, () => {
  console.log(`API do Dindagó em http://localhost:${env.PORT}`);
  console.log(`Ambiente: ${env.NODE_ENV}`);
});

// Porta ocupada costuma ser outra API esquecida aberta: explica em vez de
// despejar o stack trace do Node.
servidor.on('error', (erro: NodeJS.ErrnoException) => {
  if (erro.code === 'EADDRINUSE') {
    console.error(
      `\nA porta ${env.PORT} já está em uso — provavelmente a API já está rodando em outro terminal.\n` +
        `Feche o outro terminal (Ctrl+C) ou mude PORT no backend/.env.\n`,
    );
    process.exit(1);
  }
  throw erro;
});

/** Encerra conexões antes de sair, para não deixar o banco travado. */
async function encerrar(sinal: string) {
  console.log(`\n${sinal} recebido, encerrando...`);
  servidor.close();
  await prisma.$disconnect();
  process.exit(0);
}

process.on('SIGINT', () => void encerrar('SIGINT'));
process.on('SIGTERM', () => void encerrar('SIGTERM'));
