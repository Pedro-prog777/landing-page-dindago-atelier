/**
 * ============================================================================
 * EXPORTAÇÃO DOS DADOS — passo 1 da migração para PostgreSQL
 * ----------------------------------------------------------------------------
 * Lê tudo do banco SQLite e grava num JSON. É a rede de segurança da migração:
 * o arquivo não depende de formato de banco nenhum, serve para importar no
 * Postgres e serve para conferir, registro a registro, se nada se perdeu.
 *
 * Somente leitura — este script nunca altera nem apaga nada.
 *
 *   npx tsx scripts/exportar-dados.ts
 * ============================================================================
 */
import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from '@prisma/client';

const ORIGEM = process.env.SQLITE_URL ?? 'file:./dev.db';

const prisma = new PrismaClient({
  adapter: new PrismaBetterSqlite3({ url: ORIGEM }),
});

/**
 * A ordem importa na hora de importar: um registro só entra depois de quem ele
 * referencia. Aqui a lista já está na ordem de dependência.
 */
const TABELAS = [
  'client',
  'user',
  'clientSettings',
  'contactInfo',
  'heroContent',
  'heroFact',
  'aboutContent',
  'aboutPillar',
  'processContent',
  'processStep',
  'product',
  'benefit',
  'galleryItem',
  'testimonial',
  'socialLink',
  'contactMessage',
] as const;

type Delegate = { findMany: () => Promise<unknown[]> };

async function main() {
  const delegates = prisma as unknown as Record<string, Delegate>;
  const dump: Record<string, unknown[]> = {};
  let total = 0;

  for (const tabela of TABELAS) {
    const registros = await delegates[tabela]!.findMany();
    dump[tabela] = registros;
    total += registros.length;
    if (registros.length) {
      console.log(`  ${tabela.padEnd(18)} ${registros.length}`);
    }
  }

  const pasta = path.resolve(process.cwd(), 'backups');
  fs.mkdirSync(pasta, { recursive: true });

  const carimbo = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const arquivo = path.join(pasta, `dados-${carimbo}.json`);

  fs.writeFileSync(
    arquivo,
    JSON.stringify({ exportadoEm: new Date().toISOString(), origem: ORIGEM, dados: dump }, null, 2),
    'utf8',
  );

  // Um atalho fixo, para o script de importação não precisar adivinhar o nome.
  fs.copyFileSync(arquivo, path.join(pasta, 'dados-ultimo.json'));

  console.log(`\n  ${total} registros exportados`);
  console.log(`  ${arquivo}`);
}

main()
  .catch((erro) => {
    console.error('Falha ao exportar:', erro);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
