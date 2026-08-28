import 'dotenv/config';
import path from 'node:path';
import { defineConfig } from 'prisma/config';

/**
 * Configuração do Prisma CLI (migrations, studio, seed).
 *
 * A partir do Prisma 7 a URL de conexão sai do schema e vem para cá. O cliente
 * em tempo de execução usa o adapter definido em `src/db.ts` — os dois leem a
 * mesma DATABASE_URL do .env.
 */
export default defineConfig({
  schema: path.join('prisma', 'schema.prisma'),
  migrations: {
    seed: 'tsx prisma/seed.ts',
  },
  datasource: {
    url: process.env.DATABASE_URL ?? 'file:./dev.db',
  },
});
