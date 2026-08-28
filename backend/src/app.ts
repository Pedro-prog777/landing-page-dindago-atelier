import path from 'node:path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { origensPermitidas } from './env.js';
import { limiteGeral } from './middleware/limitarTaxa.js';
import { rotaNaoEncontrada, tratarErros } from './middleware/tratarErros.js';
import { rotasAuth } from './rotas/auth.js';
import { rotasClientes } from './rotas/clientes.js';
import { rotasColecoes } from './rotas/colecoes.js';
import { rotasSite } from './rotas/site.js';
import { rotasUpload } from './rotas/upload.js';

export function criarApp() {
  const app = express();

  // Atrás de proxy (Render, Railway, Nginx) o IP real vem no X-Forwarded-For;
  // sem isto o rate limit contaria todo mundo como o mesmo visitante.
  app.set('trust proxy', 1);
  app.disable('x-powered-by');

  app.use(
    cors({
      origin: origensPermitidas,
      // Necessário para o cookie de sessão atravessar portas diferentes no dev.
      credentials: true,
    }),
  );
  app.use(express.json({ limit: '1mb' }));
  app.use(cookieParser());
  app.use('/api', limiteGeral);

  // Fotografias enviadas pelo painel.
  app.use(
    '/uploads',
    express.static(path.resolve(process.cwd(), 'uploads'), {
      maxAge: '7d',
      index: false,
      dotfiles: 'deny',
    }),
  );

  app.get('/api/health', (_req, res) => {
    res.json({ success: true, data: { status: 'ok', hora: new Date().toISOString() } });
  });

  app.use('/api/auth', rotasAuth);
  app.use('/api', rotasSite);
  app.use('/api', rotasClientes);
  app.use('/api', rotasColecoes);
  app.use('/api', rotasUpload);

  app.use(rotaNaoEncontrada);
  app.use(tratarErros);

  return app;
}
