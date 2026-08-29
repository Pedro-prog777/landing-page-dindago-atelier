/**
 * ============================================================================
 * IMPORTAÇÃO DOS DADOS — passo 2 da migração para PostgreSQL
 * ----------------------------------------------------------------------------
 * Lê o JSON gerado por `exportar-dados.ts` e grava no banco configurado em
 * DATABASE_URL (o PostgreSQL, depois das migrations aplicadas).
 *
 * Cuidados:
 *  - Roda dentro de UMA transação: ou entra tudo, ou não entra nada. Não existe
 *    a possibilidade de sobrar meia migração.
 *  - Os IDs originais são preservados, então as chaves estrangeiras continuam
 *    apontando para os mesmos registros.
 *  - As tabelas são gravadas na ordem de dependência: ninguém entra antes de
 *    quem ele referencia.
 *  - Recusa rodar se o banco de destino já tiver dados, para não duplicar nem
 *    sobrescrever nada por engano. Use --forcar apenas se souber o que faz.
 *
 *   npx tsx scripts/importar-dados.ts
 * ============================================================================
 */
import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const ARQUIVO =
  process.argv.find((a) => a.endsWith('.json')) ??
  path.resolve(process.cwd(), 'backups', 'dados-ultimo.json');

const FORCAR = process.argv.includes('--forcar');

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

/** Ordem de dependência: cada tabela entra depois de quem ela referencia. */
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

/** Campos de data chegam do JSON como texto e precisam voltar a ser Date. */
const CAMPOS_DE_DATA = new Set(['createdAt', 'updatedAt', 'lastLoginAt']);

function converter(registro: Record<string, unknown>): Record<string, unknown> {
  const saida: Record<string, unknown> = {};
  for (const [chave, valor] of Object.entries(registro)) {
    saida[chave] =
      CAMPOS_DE_DATA.has(chave) && typeof valor === 'string' ? new Date(valor) : valor;
  }
  return saida;
}

type Delegate = {
  count: () => Promise<number>;
  createMany: (args: { data: unknown[] }) => Promise<{ count: number }>;
};

async function main() {
  if (!fs.existsSync(ARQUIVO)) {
    throw new Error(`Arquivo não encontrado: ${ARQUIVO}\nRode antes: npx tsx scripts/exportar-dados.ts`);
  }

  const conteudo = JSON.parse(fs.readFileSync(ARQUIVO, 'utf8')) as {
    exportadoEm: string;
    dados: Record<string, Record<string, unknown>[]>;
  };

  console.log(`Importando de: ${path.basename(ARQUIVO)}`);
  console.log(`Exportado em:  ${conteudo.exportadoEm}\n`);

  const delegates = prisma as unknown as Record<string, Delegate>;

  // Confere se o destino está vazio antes de escrever qualquer coisa.
  let jaExistem = 0;
  for (const tabela of TABELAS) {
    jaExistem += await delegates[tabela]!.count();
  }

  if (jaExistem > 0 && !FORCAR) {
    console.error(
      `O banco de destino já tem ${jaExistem} registros.\n` +
        `A importação foi interrompida para não duplicar nem sobrescrever nada.\n\n` +
        `Se quiser mesmo importar por cima, rode com --forcar.`,
    );
    process.exit(1);
  }

  let total = 0;

  // Uma transação só: ou tudo entra, ou nada entra.
  await prisma.$transaction(async (tx) => {
    const delegatesTx = tx as unknown as Record<string, Delegate>;

    for (const tabela of TABELAS) {
      const registros = conteudo.dados[tabela] ?? [];
      if (registros.length === 0) continue;

      const resultado = await delegatesTx[tabela]!.createMany({
        data: registros.map(converter),
      });

      total += resultado.count;
      console.log(`  ${tabela.padEnd(18)} ${resultado.count}`);
    }
  });

  console.log(`\n  ${total} registros importados`);
}

main()
  .catch((erro) => {
    console.error('\nFalha ao importar:', erro instanceof Error ? erro.message : erro);
    console.error('Nada foi gravado: a transação inteira foi desfeita.');
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
