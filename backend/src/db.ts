import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { emProducao, env } from './env.js';

/**
 * Cliente do Prisma reaproveitado em todo o processo.
 *
 * A partir do Prisma 7 a conexão é feita por um adapter, e não mais pela URL
 * declarada no schema. O adapter do PostgreSQL mantém internamente um pool de
 * conexões, reaproveitado entre as requisições.
 *
 * Em desenvolvimento o `tsx watch` reinicia o módulo a cada alteração; guardar
 * a instância no globalThis evita abrir uma conexão nova a cada recarga.
 */
const globalParaPrisma = globalThis as unknown as { prisma?: PrismaClient };

function criarCliente() {
  const adapter = new PrismaPg({ connectionString: env.DATABASE_URL });
  return new PrismaClient({
    adapter,
    log: emProducao ? ['error'] : ['warn', 'error'],
  });
}

export const prisma = globalParaPrisma.prisma ?? criarCliente();

if (!emProducao) globalParaPrisma.prisma = prisma;
