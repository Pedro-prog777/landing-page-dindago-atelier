import { products } from './products';

export type SearchEntry = {
  id: string;
  /** Agrupador exibido na lista de resultados. */
  group: 'Seções' | 'Peças';
  title: string;
  description: string;
  href: string;
  /** Palavras extras que também levam a este resultado. */
  keywords: string[];
};

const secoes: SearchEntry[] = [
  {
    id: 'sec-processo',
    group: 'Seções',
    title: 'Do papel à arte',
    description: 'A técnica do papel-machê, etapa por etapa.',
    href: '#processo',
    keywords: ['artesanato', 'processo', 'papel-machê', 'polpa', 'sustentável', 'reaproveitado'],
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
    id: 'sec-galeria',
    group: 'Seções',
    title: 'Galeria',
    description: 'Obras, processo, atelier e detalhes.',
    href: '#galeria',
    keywords: ['fotos', 'imagens', 'bastidores'],
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
    description: 'Fale com o atelier por formulário ou WhatsApp.',
    href: '#contato',
    keywords: ['whatsapp', 'e-mail', 'telefone', 'falar'],
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

export const searchIndex: SearchEntry[] = [
  ...secoes,
  ...products.map<SearchEntry>((peca) => ({
    id: `peca-${peca.id}`,
    group: 'Peças',
    title: peca.name,
    description: peca.category,
    href: '#pecas',
    keywords: [peca.category, peca.description],
  })),
];

/** Remove acentos e caixa para permitir buscar "sertao" e achar "Sertão". */
function normalizar(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

export function buscar(termo: string): SearchEntry[] {
  const alvo = normalizar(termo);
  if (alvo.length < 2) return [];

  return searchIndex.filter((entrada) => {
    const conteudo = normalizar(
      [entrada.title, entrada.description, ...entrada.keywords].join(' '),
    );
    return conteudo.includes(alvo);
  });
}
