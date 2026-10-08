import type { Produto } from './clientData';

export type SearchEntry = {
  id: string;
  /** Agrupador exibido na lista de resultados. */
  group: 'Seções' | 'Peças';
  title: string;
  description: string;
  href: string;
  /** Palavras extras que também levam a este resultado. */
  keywords: string[];
  /** Resultados de peça abrem o diálogo da peça além de rolar até a coleção. */
  pecaId?: Produto['id'];
};

const secoes: SearchEntry[] = [
  {
    id: 'sec-processo',
    group: 'Seções',
    title: 'Como fazer papel-machê?',
    description: 'Materiais essenciais para criar peças de papel-machê.',
    href: '#processo',
    keywords: [
      'artesanato',
      'processo',
      'tutorial',
      'papel mache',
      'materiais',
      'cola',
      'água',
      'moldar',
      'jornal',
      'arame',
    ],
  },
  {
    id: 'sec-pecas',
    group: 'Seções',
    title: 'Peças em destaque',
    description: 'Esculturas autorais disponíveis no atelier.',
    href: '#pecas',
    keywords: ['coleções', 'esculturas', 'obras', 'produtos', 'comprar'],
  },
  {
    id: 'sec-atelier-sobre',
    group: 'Seções',
    title: 'Sobre o atelier',
    description: 'Arte, cultura, memória e trabalho manual.',
    href: '#cultura',
    keywords: ['valores', 'cultura nordestina', 'goretti', 'atelier', 'missão'],
  },
  {
    id: 'sec-historia',
    group: 'Seções',
    title: 'Nossa história',
    description: 'A artesã, o atelier e a filosofia do trabalho.',
    href: '#historia',
    keywords: ['sobre', 'artista', 'biografia', 'quem somos'],
  },
  {
    id: 'sec-encomendas',
    group: 'Seções',
    title: 'Encomendas',
    description: 'Peças personalizadas feitas sob medida.',
    href: '#encomendas',
    keywords: ['personalizado', 'sob encomenda', 'projeto', 'lojista', 'decoração'],
  },
  {
    id: 'sec-contato',
    group: 'Seções',
    title: 'Contato',
    description: 'Fale com o atelier pelo WhatsApp, Instagram ou formulário.',
    href: '#contato',
    keywords: ['whatsapp', 'instagram', 'e-mail', 'telefone', 'falar', 'contato'],
  },
  {
    id: 'sec-redes',
    group: 'Seções',
    title: 'Instagram @dindago.atelier',
    description: 'Novas peças, bastidores e histórias do atelier.',
    href: '#redes',
    keywords: ['instagram', 'redes sociais', 'seguir', 'dindago.atelier'],
  },
  {
    id: 'sec-atelier',
    group: 'Seções',
    title: 'Visite o Dindagó Atelier',
    description: 'Onde o atelier fica e como agendar uma visita.',
    href: '#atelier',
    keywords: ['endereço', 'mapa', 'localização', 'visita'],
  },
];

export function criarIndiceDeBusca(produtos: Produto[]): SearchEntry[] {
  return [
    ...secoes,
    ...produtos.map<SearchEntry>((peca) => ({
      id: `peca-${peca.id}`,
      group: 'Peças',
      title: peca.name,
      description: peca.category,
      href: '#pecas',
      keywords: [peca.category, peca.description],
      pecaId: peca.id,
    })),
  ];
}

/** Remove acentos e caixa para permitir buscar "sertao" e achar "Sertão". */
function normalizar(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

export function buscar(indice: SearchEntry[], termo: string): SearchEntry[] {
  const alvo = normalizar(termo);
  if (alvo.length < 2) return [];

  return indice.filter((entrada) => {
    const conteudo = normalizar(
      [entrada.title, entrada.description, ...entrada.keywords].join(' '),
    );
    return conteudo.includes(alvo);
  });
}
