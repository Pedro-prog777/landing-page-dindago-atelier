import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

type PrismaLogLevel = 'query' | 'info' | 'warn' | 'error';

export function criarClientePrisma(
  databaseUrl: string | undefined,
  log?: PrismaLogLevel[],
) {
  if (!databaseUrl) {
    throw new Error('DATABASE_URL é obrigatória para conectar ao banco de dados.');
  }

  const opcoesLog = log ? { log } : {};

  if (databaseUrl.startsWith('file:')) {
    return new PrismaClient({
      adapter: new PrismaBetterSqlite3({ url: databaseUrl }),
      ...opcoesLog,
    });
  }

  return new PrismaClient({
    adapter: new PrismaPg({ connectionString: databaseUrl }),
    ...opcoesLog,
  });
}
