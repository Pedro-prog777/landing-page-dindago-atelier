import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { Router, type NextFunction, type Request, type Response } from 'express';
import multer from 'multer';
import { ErroApi, criado } from '../lib/respostas.js';
import { exigirLogin } from '../middleware/autenticar.js';

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

rotasUpload.post('/upload', exigirLogin, receberArquivo, (req, res) => {
  if (!req.file) throw ErroApi.invalido('Nenhum arquivo enviado.');
  return criado(res, {
    url: `/uploads/${req.file.filename}`,
    size: req.file.size,
    mimetype: req.file.mimetype,
  });
});
