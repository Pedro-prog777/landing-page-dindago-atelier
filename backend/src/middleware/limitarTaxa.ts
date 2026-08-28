import rateLimit from 'express-rate-limit';

/** Login: janela curta e poucas tentativas, para travar força bruta. */
export const limiteLogin = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 8,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Muitas tentativas de login. Aguarde alguns minutos.',
  },
});

/** Formulário público: evita que o endpoint vire caixa de spam. */
export const limiteContato = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Muitas mensagens enviadas. Tente novamente mais tarde.',
  },
});

/** Teto geral da API, bem mais folgado que os anteriores. */
export const limiteGeral = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 600,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});
