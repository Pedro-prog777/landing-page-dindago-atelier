import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { Router, type NextFunction, type Request, type Response } from 'express';
import multer from 'multer';
import { ErroApi, criado } from '../lib/respostas.js';
import { exigirLogin } from '../middleware/autenticar.js';

/**
 * ============================================================================
 * UPLOAD DE IMAGENS
 * ----------------------------------------------------------------------------
 * Armazenamento local em `backend/uploads`, servido estaticamente em /uploads.
 * É o suficiente para a equipe subir as fotografias reais sem contratar nenhum
 * serviço externo; trocar por S3 ou similar depois é questão de substituir o
 * storage do multer, sem tocar nas rotas.
 *
 * Cuidados aplicados: o nome do arquivo é sempre gerado pelo servidor (nunca o
 * enviado pelo usuário, que poderia conter "../"), só a extensão é preservada,
 * e o tipo é conferido contra uma lista fechada. Os arquivos são servidos com
 * CSP restritiva (ver app.ts), então um SVG com script não executa nada.
 * ============================================================================
 */

const PASTA = path.resolve(process.cwd(), 'uploads');
const TAMANHO_MAXIMO = 8 * 1024 * 1024; // 8 MB

// Com `destination` em função, o multer não cria a pasta sozinho: sem ela,
// todo upload falharia com ENOENT.
fs.mkdirSync(PASTA, { recursive: true });

const TIPOS_ACEITOS = new Map([
  ['image/jpeg', '.jpg'],
  ['image/png', '.png'],
  ['image/webp', '.webp'],
  ['image/avif', '.avif'],
  ['image/svg+xml', '.svg'],
]);

const armazenamento = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, PASTA),
  filename: (_req, file, cb) => {
    const extensao = TIPOS_ACEITOS.get(file.mimetype) ?? '.bin';
    cb(null, `${Date.now()}-${crypto.randomBytes(8).toString('hex')}${extensao}`);
  },
});

const upload = multer({
  storage: armazenamento,
  limits: { fileSize: TAMANHO_MAXIMO, files: 1 },
  fileFilter: (_req, file, cb) => {
    if (!TIPOS_ACEITOS.has(file.mimetype)) {
      cb(new ErroApi(415, 'Formato não aceito. Envie JPG, PNG, WebP, AVIF ou SVG.'));
      return;
    }
    cb(null, true);
  },
});

/**
 * Traduz os erros do multer em respostas claras. Sem isto, "arquivo grande
 * demais" chegava ao painel como "Erro interno" (500).
 */
function receberArquivo(req: Request, res: Response, next: NextFunction) {
  upload.single('file')(req, res, (erro: unknown) => {
    if (erro instanceof multer.MulterError) {
      if (erro.code === 'LIMIT_FILE_SIZE') {
        next(new ErroApi(413, `A imagem passa de ${TAMANHO_MAXIMO / 1024 / 1024} MB. Reduza e envie de novo.`));
        return;
      }
      next(new ErroApi(400, 'Envie uma imagem por vez, no campo "file".'));
      return;
    }
    next(erro);
  });
}

export const rotasUpload = Router();

/**
 * POST /api/upload — devolve a URL pública do arquivo.
 * O caminho retornado é o que vai gravado no campo de imagem do conteúdo.
 */
rotasUpload.post('/upload', exigirLogin, receberArquivo, (req, res) => {
  if (!req.file) throw ErroApi.invalido('Nenhum arquivo enviado.');
  return criado(res, {
    url: `/uploads/${req.file.filename}`,
    size: req.file.size,
    mimetype: req.file.mimetype,
  });
});
