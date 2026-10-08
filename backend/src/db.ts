import { PrismaClient } from '@prisma/client';
import { emProducao, env } from './env.js';
import { criarClientePrisma } from './criarClientePrisma.js';

/**
 * Cliente do Prisma reaproveitado em todo o processo.
 *
 * A partir do Prisma 7 a conexão é feita por um adapter, e não mais pela URL
 * declarada no schema. O adapter é selecionado pela URL do banco.
 *
 * Em desenvolvimento o `tsx watch` reinicia o módulo a cada alteração; guardar
 * a instância no globalThis evita abrir uma conexão nova a cada recarga.
 */
const globalParaPrisma = globalThis as unknown as { prisma?: PrismaClient };

function criarCliente() {
  return criarClientePrisma(env.DATABASE_URL, emProducao ? ['error'] : ['warn', 'error']);
}

export const prisma = globalParaPrisma.prisma ?? criarCliente();

if (!emProducao) globalParaPrisma.prisma = prisma;
