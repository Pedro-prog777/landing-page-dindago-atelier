/**
 * ============================================================================
 * PEÇAS DO ATELIER
 * ----------------------------------------------------------------------------
 * Fonte única das peças exibidas no site.
 *
 * PREÇOS: mantenha `price: null` enquanto o valor real não for definido —
 * a interface exibe "Consultar valor" automaticamente. Para publicar um preço,
 * escreva o número em reais (ex.: `price: 480`).
 *
 * IMAGENS: coloque as fotografias reais em `public/images/products/` usando o
 * nome indicado em `image`. Enquanto o arquivo não existir, o card mostra um
 * marcador visual identificado — nenhuma imagem genérica é usada no lugar.
 *
 * As descrições abaixo são um rascunho editável: ajuste com as palavras da
 * artesã sempre que quiser.
 * ============================================================================
 */

export type Product = {
  id: number;
  name: string;
  category: string;
  /** Frase curta usada no card. */
  description: string;
  /** Texto longo exibido no modal "Ver detalhes". */
  story: string;
  /** Valor em reais. `null` = "Consultar valor". */
  price: number | null;
  image: string;
  /** Texto alternativo da imagem (acessibilidade). */
  imageAlt: string;
  /** Ex.: "Peça única", "Sob encomenda". */
  badge?: string;
};

export const products: Product[] = [
  {
    id: 1,
    name: 'Ciranda do Sertão',
    category: 'Escultura em papel-machê',
    description:
      'Roda de figuras de mãos dadas, celebrando a festa que reúne o povo no terreiro.',
    story:
      'A ciranda é dança de roda: ninguém dança sozinho. Esta peça reúne figuras de mãos dadas em movimento contínuo, modeladas uma a uma sobre estrutura de arame e papelão reaproveitado. As saias ganham volume no papel-machê ainda úmido e a pintura final acompanha as cores da festa no sertão.',
    price: null,
    image: '/images/products/ciranda-do-sertao.jpg',
    imageAlt:
      'Escultura em papel-machê representando uma roda de ciranda com figuras de mãos dadas',
    badge: 'Peça única',
  },
  {
    id: 2,
    name: 'Mãe e Filho',
    category: 'Escultura em papel-machê',
    description:
      'O gesto do colo transformado em volume: afeto, cuidado e memória em uma só forma.',
    story:
      'Nasce da memória do colo — o corpo que abriga outro corpo. A construção começa pelo desenho, passa pela estrutura interna e chega à modelagem das mãos, sempre a parte mais delicada. O acabamento mantém a textura do papel visível, para que a matéria-prima continue reconhecível na obra pronta.',
    price: null,
    image: '/images/products/mae-e-filho.jpg',
    imageAlt: 'Escultura em papel-machê de uma mãe segurando o filho no colo',
    badge: 'Peça única',
  },
  {
    id: 3,
    name: 'Sanfoneiro',
    category: 'Escultura em papel-machê',
    description:
      'Figura popular do forró, com o fole aberto no meio da música.',
    story:
      'Homenagem aos músicos que atravessam gerações tocando nas feiras, nos arraiais e nas calçadas. O fole é construído em camadas dobradas de papel, técnica que exige secagem lenta para manter as pregas firmes. O chapéu de couro e a postura do corpo foram estudados em fotografias e registros de mestres da sanfona.',
    price: null,
    image: '/images/products/sanfoneiro.jpg',
    imageAlt: 'Escultura em papel-machê de um sanfoneiro tocando com o fole aberto',
  },
  {
    id: 4,
    name: 'Mulher do Mar',
    category: 'Escultura em papel-machê',
    description:
      'Presença serena das mulheres que vivem do mar, entre a maré e a espera.',
    story:
      'Entre o sertão e o litoral existe uma mesma força: a de quem espera e trabalha. A figura carrega rede, cesto e o olhar voltado para a linha da água. Os tons de verde e areia foram escolhidos para dialogar com a paleta natural do barro, sem competir com ela.',
    price: null,
    image: '/images/products/mulher-do-mar.jpg',
    imageAlt: 'Escultura em papel-machê de uma mulher com rede de pesca',
    badge: 'Peça única',
  },
];

/** Mensagem de WhatsApp já preenchida com o nome da peça. */
export function mensagemInteresse(product: Product): string {
  return `Olá! Tenho interesse na peça “${product.name}” (${product.category}) que vi no site do Dindagó Atelier. Poderia me contar mais sobre ela?`;
}

/** Formata o preço para exibição, respeitando a regra de não inventar valores. */
export function formatPrice(price: number | null): string {
  if (price === null) return 'Consultar valor';
  return price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });
}
