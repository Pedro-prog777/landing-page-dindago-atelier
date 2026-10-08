import 'dotenv/config';
import path from 'node:path';
import { defineConfig } from 'prisma/config';

const usarSqlite = process.env.DATABASE_URL?.startsWith('file:') ?? false;

export default defineConfig({
  schema: path.join('prisma', usarSqlite ? 'schema.sqlite.prisma' : 'schema.prisma'),
  migrations: {
    seed: 'tsx prisma/seed.ts',
  },
  datasource: {
    url: process.env.DATABASE_URL ?? '',
  },
});
