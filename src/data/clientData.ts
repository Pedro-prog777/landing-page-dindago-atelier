/**
 * ============================================================================
 * DADOS DO CLIENTE — FONTE ÚNICA DE VERDADE
 * ----------------------------------------------------------------------------
 * Este é o ÚNICO arquivo que precisa ser alterado para publicar a landing page
 * de outro cliente. Nenhum componente contém nome, telefone, e-mail, endereço,
 * texto comercial ou cor escrita diretamente no código.
 *
 * COMO TROCAR DE CLIENTE
 *   1. Substitua os valores deste arquivo.
 *   2. Troque as imagens em `public/images/` (mantendo os nomes ou ajustando
 *      os caminhos aqui).
 *   3. Ajuste `colors` — as cores são aplicadas automaticamente via CSS.
 *   4. Pronto. Nenhum componente precisa ser reescrito.
 *
 * REGRA DOS PLACEHOLDERS
 *   Campos ainda não definidos ficam como "INSERIR_ALGUMA_COISA".
 *   A interface detecta isso sozinha (ver `isConfigured` em config/site.ts):
 *   o link some, o mapa vira um aviso e o botão passa a levar ao formulário.
 *   Assim o site nunca exibe um dado inventado nem um link quebrado.
 * ============================================================================
 */

// ============================================================================
// TIPOS
// ============================================================================

export type Produto = {
  id: number;
  name: string;
  category: string;
  /** Frase curta usada no card. */
  description: string;
  /** Texto longo exibido no modal "Ver detalhes". */
  story: string;
  /** Valor em reais. `null` exibe "Consultar valor". */
  price: number | null;
  image: string;
  imageAlt: string;
  /** Ex.: "Peça única", "Sob encomenda". */
  badge?: string;
};

export type ItemGaleria = {
  id: number;
  category: string;
  src: string;
  alt: string;
};

export type Depoimento = {
  id: number;
  name: string;
  role: string;
  text: string;
};

export type NavLink = { label: string; href: string };

// ============================================================================
// DADOS
// ============================================================================

export const clientData = {
  // --------------------------------------------------------------------------
  // IDENTIDADE DA EMPRESA
  // --------------------------------------------------------------------------
  company: {
    name: 'Dindagó Atelier',
    segment: 'Artesanato autoral em papel-machê',
    slogan: 'Arte que nasce da cultura popular e das mãos que transformam.',
    description:
      'Esculturas em papel-machê que celebram a vida, a fé e a cultura popular nordestina.',
    /** Logo real da marca. Enquanto o arquivo não existir, aparece a assinatura tipográfica. */
    logo: '/images/logo/dindago-atelier.svg',
    /** Aviso curto exibido na barra superior. */
    shipping: 'Frete para todo o Brasil',
  },

  // --------------------------------------------------------------------------
  // CORES — aplicadas automaticamente como variáveis CSS (ver ThemeProvider)
  // --------------------------------------------------------------------------
  colors: {
    /** Cor de destaque principal: botões, barra superior, ícones. */
    primary: '#c89434',
    /** Cor de apoio: títulos de destaque, rodapé, CTA. */
    secondary: '#a8432a',
    /** Realce quente usado em detalhes e ornamentos. */
    accent: '#d4a03c',
    /** Fundo geral da página. */
    background: '#fdfaf4',
  },

  // --------------------------------------------------------------------------
  // HERO
  // --------------------------------------------------------------------------
  hero: {
    /**
     * A manchete é composta em linhas: as primeiras saem em corpo de capa e a
     * última recebe o vermelho-tijolo. Juntas formam a frase completa, que é o
     * que leitores de tela e buscadores leem.
     */
    titleLines: ['Arte que nasce', 'da memória, da cultura'],
    titleHighlight: 'e das mãos.',
    subtitle: 'Peças artesanais que carregam a identidade e a beleza do Nordeste brasileiro.',
    image: '/images/hero/peca-principal.jpg',
    imageAlt:
      'Escultura em papel-machê de uma mulher com cabelos em forma de mar, peixes e um barco',
    /** Legenda impressa sob a prancha de abertura. */
    imageCaption: 'Mulher do Mar — papel-machê sobre estrutura de arame',
    primaryCta: { label: 'Ver as peças', href: '#pecas' },
    secondaryCta: { label: 'Falar com o atelier', href: 'whatsapp' },
    /** Colofão: dados curtos da publicação, no canto da capa. */
    colofao: [
      { rotulo: 'Técnica', valor: 'Papel-machê' },
      { rotulo: 'Origem', valor: 'Sertão de Alagoas' },
      { rotulo: 'Produção', valor: 'Peça única' },
    ],
    /** Selos exibidos abaixo dos botões. */
    highlights: [
      { value: '100%', label: 'Feito à mão' },
      { value: 'Peças', label: 'Únicas e autorais' },
      { value: 'Papel', label: 'Reaproveitado' },
    ],
  },

  /** Cabeçalho do caderno de diferenciais. */
  benefitsSection: {
    numero: '02',
    eyebrow: 'Diferenciais',
    title: 'O que sustenta cada peça',
  },

  // --------------------------------------------------------------------------
  // DIFERENCIAIS
  // `icon` aceita: maos | folha | sol | cacto | presente | reciclagem | coracao
  // --------------------------------------------------------------------------
  benefits: [
    {
      icon: 'maos',
      title: 'Feito à mão',
      description: 'Peças únicas, modeladas com dedicação e cuidado.',
    },
    {
      icon: 'folha',
      title: 'Sustentável',
      description: 'Utilizamos papel reciclado e materiais reaproveitados.',
    },
    {
      icon: 'sol',
      title: 'Identidade nordestina',
      description: 'Inspiradas na cultura, nas histórias e nas cores do nosso povo.',
    },
    {
      icon: 'cacto',
      title: 'Autoral',
      description: 'Criações exclusivas que carregam alma, memória e afeto.',
    },
    {
      icon: 'presente',
      title: 'Encomendas',
      description: 'Peças personalizadas feitas especialmente para você.',
    },
  ],

  // --------------------------------------------------------------------------
  // PROCESSO DE CRIAÇÃO
  // --------------------------------------------------------------------------
  process: {
    numero: '03',
    eyebrow: 'O artesanato',
    title: 'Do papel à arte',
    paragraphs: [
      'O trabalho do Dindagó Atelier parte de uma técnica milenar: o papel-machê.',
      'O papel é deixado de molho em água, transformado em polpa e posteriormente triturado. A essa mistura é acrescentada uma cola caseira e orgânica. Dessa matéria-prima nasce o papel-machê.',
      'Antes de cada escultura existir, ela nasce na imaginação. A ideia é pesquisada, pensada e transformada em desenho. Depois começa a construção da estrutura da peça.',
    ],
    steps: [
      { name: 'Papel', detail: 'Papel de molho na água até amolecer por completo.' },
      { name: 'Polpa', detail: 'A massa é triturada e recebe cola caseira e orgânica.' },
      { name: 'Estrutura', detail: 'Arame e papelão formam o esqueleto da peça.' },
      { name: 'Modelagem', detail: 'O papel-machê ganha volume, gesto e postura.' },
      { name: 'Detalhes', detail: 'Acabamento, textura e pintura feitos à mão.' },
      { name: 'Obra final', detail: 'Secagem lenta e a escultura pronta para durar.' },
    ],
    materialsTitle: 'Materiais reaproveitados',
    materialsText:
      'Boa parte do que sustenta cada escultura viria a ser descartado. No atelier, vira estrutura, volume e forma.',
    materials: ['Garrafas PET', 'Papelão', 'Caixas', 'Resíduos sólidos', 'Arame'],
    image: '/images/gallery/processo-04.jpg',
    imageAlt: 'Mãos modelando o papel-machê sobre a estrutura de uma peça',
  },

  // --------------------------------------------------------------------------
  // PEÇAS
  // PREÇOS: mantenha `null` enquanto o valor real não for definido — a interface
  // exibe "Consultar valor". Para publicar, escreva o número em reais (ex.: 480).
  // --------------------------------------------------------------------------
  productsSection: {
    numero: '04',
    eyebrow: 'Coleções',
    title: 'Peças em destaque',
    subtitle: 'Esculturas em papel-machê que celebram a vida, a fé e a cultura popular.',
    ctaLabel: 'Ver toda a coleção',
  },

  products: [
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
      description: 'Figura popular do forró, com o fole aberto no meio da música.',
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
      description: 'Presença serena das mulheres que vivem do mar, entre a maré e a espera.',
      story:
        'Entre o sertão e o litoral existe uma mesma força: a de quem espera e trabalha. Os cabelos viram mar, com peixes e um barco que carrega uma pequena igreja — devoção e travessia na mesma peça. Os tons de azul foram escolhidos para contrastar com a paleta de barro do restante da coleção.',
      price: null,
      image: '/images/products/mulher-do-mar.jpg',
      imageAlt:
        'Escultura em papel-machê de uma mulher com cabelos em forma de mar, peixes e um barco',
      badge: 'Peça única',
    },
  ] as Produto[],

  // --------------------------------------------------------------------------
  // GALERIA
  // --------------------------------------------------------------------------
  gallery: {
    numero: '05',
    eyebrow: 'Galeria',
    title: 'O atelier por dentro',
    subtitle:
      'Obras finalizadas, bastidores do processo, a bancada de trabalho e os detalhes que só aparecem de perto.',
    categories: ['Obras', 'Processo', 'Atelier', 'Detalhes'],
    items: [
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
    ] as ItemGaleria[],
  },

  // --------------------------------------------------------------------------
  // SOBRE O ATELIER / A ARTESÃ
  // --------------------------------------------------------------------------
  about: {
    numero: '06',
    eyebrow: 'Sobre o atelier',
    title: 'Por trás de cada peça, existe uma história.',
    /** Texto de apresentação exibido na faixa "Sobre o Atelier". */
    intro:
      'Dindagó Atelier é o espaço criativo da artista alagoana Goretti Brandão, onde a arte em papel-machê ganha vida através de histórias, memórias e da força da cultura popular nordestina.',
    quote:
      'Cada peça começa muito antes das mãos tocarem o papel. Começa na imaginação, na pesquisa e na memória.',
    paragraphs: [
      'O Dindagó Atelier nasce do encontro entre pesquisa e trabalho manual. As esculturas em papel-machê partem de histórias vividas e ouvidas — festas, ofícios, personagens do cotidiano nordestino — e ganham forma no tempo lento do papel.',
      '[BIOGRAFIA DA ARTESÃ] Espaço reservado para formação, trajetória, o começo do atelier e o que a levou ao papel-machê. Substitua por suas próprias palavras — é o texto que mais aproxima quem chega ao site.',
    ],
    ctaLabel: 'Conheça nossa história',
    pillars: [
      {
        title: 'A pesquisa',
        text: 'Cada peça começa em um caderno: referências, conversas, memórias de festa, de feira e de casa.',
      },
      {
        title: 'O desenho',
        text: 'A ideia vira traço antes de virar volume. É no desenho que a figura ganha postura e gesto.',
      },
      {
        title: 'As mãos',
        text: 'Nada é moldado em série. O tempo de secagem do papel dita o ritmo do trabalho.',
      },
    ],
    artist: {
      /** Nome da artista conforme a identidade visual aprovada. */
      name: 'Goretti Brandão',
      role: 'Artista e criadora do Dindagó Atelier',
      photo: '/images/artist/artesa.jpg',
      photoAlt: 'Goretti Brandão trabalhando em uma peça de papel-machê no atelier',
    },
  },

  // --------------------------------------------------------------------------
  // CULTURA — blocos de valores da marca
  // `icon` aceita: sol | flor | passaro | maos
  // --------------------------------------------------------------------------
  /** Cabeçalho do caderno escuro. */
  cultureSection: {
    numero: '07',
    eyebrow: 'Sobre o atelier',
  },

  culture: [
    {
      icon: 'sol',
      title: 'Arte que transforma',
      description: 'Cada peça carrega sentimentos, encantos e significados.',
    },
    {
      icon: 'flor',
      title: 'Cultura que conecta',
      description: 'Da nossa terra para o mundo, com orgulho das nossas raízes.',
    },
    {
      icon: 'passaro',
      title: 'Memória que permanece',
      description: 'Esculturas que guardam histórias e atravessam gerações.',
    },
    {
      icon: 'maos',
      title: 'Mãos que criam',
      description: 'O trabalho artesanal como expressão de identidade, criatividade e afeto.',
    },
  ],

  // --------------------------------------------------------------------------
  // ENCOMENDAS
  // --------------------------------------------------------------------------
  orders: {
    numero: '08',
    eyebrow: 'Encomendas',
    title: 'Uma peça feita especialmente para você.',
    subtitle:
      'Algumas histórias merecem ganhar forma. Entre em contato com o Dindagó Atelier para conversar sobre uma peça personalizada.',
    steps: [
      {
        number: '01',
        title: 'Conte sua ideia',
        text: 'Uma memória, um personagem, um espaço para ocupar. O ponto de partida é seu.',
      },
      {
        number: '02',
        title: 'Conversamos sobre a criação',
        text: 'Referências, dimensões, cores e prazo são definidos junto com o atelier.',
      },
      {
        number: '03',
        title: 'A peça é desenvolvida',
        text: 'Desenho, estrutura, modelagem e acabamento — com registros do processo.',
      },
      {
        number: '04',
        title: 'Sua obra ganha vida',
        text: 'A escultura é finalizada, embalada com cuidado e enviada para todo o Brasil.',
      },
    ],
    ctaTitle: 'Vamos criar algo com a sua história?',
    ctaText:
      'Atendemos pedidos individuais, projetos de decoração, presentes e coleções para lojistas e arquitetos.',
    ctaLabel: 'Fazer uma encomenda',
  },

  // --------------------------------------------------------------------------
  // DEPOIMENTOS
  // Vazio de propósito: depoimento é palavra de cliente real, não se inventa.
  // Ao preencher, a seção aparece sozinha na página.
  // --------------------------------------------------------------------------
  testimonials: [] as Depoimento[],

  // --------------------------------------------------------------------------
  // CONTATO
  // --------------------------------------------------------------------------
  contact: {
    numero: '09',
    eyebrow: 'Contato',
    title: 'Vamos conversar?',
    subtitle:
      'Quer conhecer uma peça, fazer uma encomenda ou levar um pouco dessa arte para o seu espaço? Entre em contato.',

    /** Telefone fixo/celular apenas para exibição. */
    phone: 'INSERIR_TELEFONE',
    /** WhatsApp em formato internacional, só dígitos. Ex.: "5582999999999" */
    whatsapp: 'INSERIR_NUMERO',
    /** Como o número aparece na tela. Ex.: "(82) 99999-9999" */
    whatsappDisplay: 'INSERIR_NUMERO',
    email: 'contato@dindagoatelier.com.br',
    address: 'Santana do Ipanema – AL',
    addressNote: 'Visitas ao atelier com agendamento prévio.',

    subjects: [
      'Quero conhecer uma peça',
      'Encomenda personalizada',
      'Compra para loja ou projeto',
      'Imprensa e parcerias',
      'Outro assunto',
    ],
  },

  // --------------------------------------------------------------------------
  // REDES SOCIAIS — deixe vazio ou "INSERIR_" para o ícone não aparecer
  // --------------------------------------------------------------------------
  social: {
    instagram: 'INSERIR_INSTAGRAM',
    facebook: 'INSERIR_FACEBOOK',
    linkedin: '',
    youtube: '',
  },

  socialSection: {
    eyebrow: 'Redes sociais',
    title: 'Siga o Dindagó Atelier',
    subtitle: 'Acompanhe novas peças, bastidores, processos e histórias.',
  },

  // --------------------------------------------------------------------------
  // RODAPÉ
  // --------------------------------------------------------------------------
  footer: {
    tagline: 'Arte em papel-machê feita com alma, memória e propósito.',
    /** Enquanto as páginas não existirem, cada item leva ao contato. */
    infoLinks: [
      { label: 'Políticas de troca e devolução', href: '#contato' },
      { label: 'Formas de pagamento', href: '#contato' },
      { label: 'Prazo e entrega', href: '#contato' },
      { label: 'Perguntas frequentes', href: '#contato' },
    ],
    copyrightYear: 2026,
  },

  // --------------------------------------------------------------------------
  // NAVEGAÇÃO
  // --------------------------------------------------------------------------
  nav: [
    { label: 'Início', href: '#inicio' },
    { label: 'Artesanato', href: '#processo' },
    { label: 'Coleções', href: '#pecas' },
    { label: 'Nossa História', href: '#historia' },
    { label: 'Encomendas', href: '#encomendas' },
    { label: 'Contato', href: '#contato' },
  ] as NavLink[],

  // --------------------------------------------------------------------------
  // SEO
  // --------------------------------------------------------------------------
  seo: {
    title: 'Dindagó Atelier | Arte em Papel-Machê',
    description:
      'Conheça o Dindagó Atelier, onde papel-machê, cultura nordestina, memória e trabalho artesanal se transformam em peças únicas e autorais.',
    url: 'https://dindagoatelier.com.br/',
    ogImage: '/images/hero/og-image.jpg',
  },

  /** Mensagem já preenchida ao abrir o WhatsApp pelo botão flutuante. */
  whatsappDefaultMessage:
    'Olá! Conheci o Dindagó Atelier pelo site e gostaria de saber mais sobre as peças.',
} as const;

export type ClientData = typeof clientData;
