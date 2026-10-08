import 'dotenv/config';
import { z } from 'zod';

/**
 * Configuração validada na inicialização.
 *
 * Se faltar variável obrigatória o processo cai já no boot, com mensagem
 * clara — melhor do que quebrar numa requisição qualquer mais adiante.
 */
const esquema = z.object({
  DATABASE_URL: z.string().min(1, 'DATABASE_URL é obrigatória'),
  JWT_SECRET: z
    .string()
    .min(32, 'JWT_SECRET precisa de pelo menos 32 caracteres'),
  PORT: z.coerce.number().int().positive().default(3333),
  CORS_ORIGIN: z.string().default('http://localhost:5173'),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
});

const resultado = esquema.safeParse(process.env);

if (!resultado.success) {
  const problemas = resultado.error.issues
    .map((i) => `  - ${i.path.join('.')}: ${i.message}`)
    .join('\n');
  console.error(`\nConfiguração inválida. Verifique o arquivo .env:\n${problemas}\n`);
  process.exit(1);
}

export const env = resultado.data;

export const emProducao = env.NODE_ENV === 'production';

/*
 * O segredo de exemplo do .env.example é público (está no GitHub). Em
 * produção ele permitiria a qualquer pessoa forjar uma sessão de OWNER.
 */
if (emProducao && env.JWT_SECRET.startsWith('troque-este-valor')) {
  console.error(
    '\nJWT_SECRET ainda é o valor de exemplo. Gere um segredo novo (openssl rand -base64 48) antes de publicar.\n',
  );
  process.exit(1);
}

/** Origens liberadas no CORS. Aceita lista separada por vírgula. */
export const origensPermitidas = env.CORS_ORIGIN.split(',').map((o) => o.trim());
