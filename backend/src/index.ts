import { criarApp } from './app.js';
import { prisma } from './db.js';
import { env } from './env.js';

const app = criarApp();

const servidor = app.listen(env.PORT, () => {
  console.log(`API do Dindagó em http://localhost:${env.PORT}`);
  console.log(`Ambiente: ${env.NODE_ENV}`);
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
