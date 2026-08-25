/**
 * ============================================================================
 * GALERIA
 * ----------------------------------------------------------------------------
 * Substitua os arquivos em `public/images/gallery/` pelas fotografias reais.
 * Basta manter o nome indicado em `src` — ou editar o caminho aqui.
 * Para adicionar novas fotos, acrescente itens à lista abaixo.
 * ============================================================================
 */

export const galleryCategories = ['Obras', 'Processo', 'Atelier', 'Detalhes'] as const;

export type GalleryCategory = (typeof galleryCategories)[number];

export type GalleryItem = {
  id: number;
  category: GalleryCategory;
  src: string;
  /** Descrição da imagem — usada como texto alternativo e legenda do lightbox. */
  alt: string;
};

export const galleryItems: GalleryItem[] = [
  {
    id: 1,
    category: 'Obras',
    src: '/images/gallery/obra-01.jpg',
    alt: 'Escultura em papel-machê finalizada sobre fundo neutro',
  },
  {
    id: 2,
    category: 'Obras',
    src: '/images/gallery/obra-02.jpg',
    alt: 'Conjunto de figuras em papel-machê inspiradas na cultura popular',
  },
  {
    id: 3,
    category: 'Obras',
    src: '/images/gallery/obra-03.jpg',
    alt: 'Escultura de figura humana em papel-machê com pintura em tons de terra',
  },
  {
    id: 4,
    category: 'Processo',
    src: '/images/gallery/processo-01.jpg',
    alt: 'Papel de molho em água, primeira etapa da produção do papel-machê',
  },
  {
    id: 5,
    category: 'Processo',
    src: '/images/gallery/processo-02.jpg',
    alt: 'Polpa de papel triturada pronta para receber a cola caseira',
  },
  {
    id: 6,
    category: 'Processo',
    src: '/images/gallery/processo-03.jpg',
    alt: 'Estrutura de arame e papelão sendo montada antes da modelagem',
  },
  {
    id: 7,
    category: 'Processo',
    src: '/images/gallery/processo-04.jpg',
    alt: 'Mãos modelando o papel-machê sobre a estrutura da peça',
  },
  {
    id: 8,
    category: 'Atelier',
    src: '/images/gallery/atelier-01.jpg',
    alt: 'Bancada do atelier com ferramentas e peças em produção',
  },
  {
    id: 9,
    category: 'Atelier',
    src: '/images/gallery/atelier-02.jpg',
    alt: 'Prateleira do atelier com esculturas em diferentes etapas',
  },
  {
    id: 10,
    category: 'Atelier',
    src: '/images/gallery/atelier-03.jpg',
    alt: 'Materiais reaproveitados guardados no atelier: papelão, garrafas e arame',
  },
  {
    id: 11,
    category: 'Detalhes',
    src: '/images/gallery/detalhe-01.jpg',
    alt: 'Detalhe da textura do papel-machê na superfície de uma peça',
  },
  {
    id: 12,
    category: 'Detalhes',
    src: '/images/gallery/detalhe-02.jpg',
    alt: 'Detalhe da pintura à mão em uma escultura de papel-machê',
  },
];
