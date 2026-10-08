import { PrismaClient } from '@prisma/client';
import { emProducao, env } from './env.js';
import { criarClientePrisma } from './criarClientePrisma.js';

const globalParaPrisma = globalThis as unknown as { prisma?: PrismaClient };

function criarCliente() {
  return criarClientePrisma(env.DATABASE_URL, emProducao ? ['error'] : ['warn', 'error']);
}

export const prisma = globalParaPrisma.prisma ?? criarCliente();

if (!emProducao) globalParaPrisma.prisma = prisma;
