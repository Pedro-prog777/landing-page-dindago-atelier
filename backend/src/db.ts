import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from '@prisma/client';
import { emProducao, env } from './env.js';

/**
 * Cliente do Prisma reaproveitado em todo o processo.
 *
 * A partir do Prisma 7 a conexão é feita por um adapter, e não mais pela URL
 * declarada no schema. Trocar de banco em produção significa trocar este
 * adapter e a DATABASE_URL — nenhum model nem consulta muda.
 *
 * Em desenvolvimento o `tsx watch` reinicia o módulo a cada alteração; guardar
 * a instância no globalThis evita abrir uma conexão nova a cada recarga.
 */
const globalParaPrisma = globalThis as unknown as { prisma?: PrismaClient };

function criarCliente() {
  const adapter = new PrismaBetterSqlite3({ url: env.DATABASE_URL });
  return new PrismaClient({
    adapter,
    log: emProducao ? ['error'] : ['warn', 'error'],
  });
}

export const prisma = globalParaPrisma.prisma ?? criarCliente();

if (!emProducao) globalParaPrisma.prisma = prisma;
