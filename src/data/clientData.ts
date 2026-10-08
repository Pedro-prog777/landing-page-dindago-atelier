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
 *   A interface detecta isso sozinha (ver `isConfigured` em conteudo/ajudantes.ts):
 *   o link some, o mapa vira um aviso e o botão passa a levar ao formulário.
 *   Assim o site nunca exibe um dado inventado nem um link quebrado.
 * ============================================================================
 */

// ============================================================================
// TIPOS
// ============================================================================

export type Produto = {
  /** Número no arquivo local; texto (cuid) quando a peça vem do banco pela API. */
  id: number | string;
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
    /**
     * Logo real da marca. Vazio enquanto o arquivo não existir: assim o site
     * mostra a assinatura tipográfica sem tentar baixar uma imagem inexistente.
     * Ao receber a logo, salve em public/images/logo/ e escreva o caminho aqui
     * (ex.: '/images/logo/dindago-atelier.svg').
     */
    logo: '',
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
    subtitle:
      'Esculturas autorais em papel-machê, feitas à mão pela artista alagoana Goretti Brandão. Peças únicas que carregam a memória, a fé e a cultura popular do Nordeste.',
    image: '/images/hero/EuAmoNordeste.jpeg',
    imageAlt:
      'Arte em papel com a frase “Eu amo meu Nordeste” e ilustrações do sertão, cactos e mandacarus',
    /** Legenda impressa sob a prancha de abertura. */
    imageCaption: 'Eu amo meu Nordeste — arte inspirada na cultura sertaneja',
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
  // TUTORIAL — caderno 04, "Como fazer papel-machê?"
  // É o conteúdo exibido na seção #processo da landing page.
  // --------------------------------------------------------------------------
  tutorial: {
    numero: '04',
    eyebrow: 'O artesanato',
    nota: 'Materiais essenciais',
    title: 'Como fazer papel-machê?',
    intro:
      'Antes de mergulhar na criação das suas próprias peças de papel-machê, é importante ter os materiais certos à disposição. Estes são os itens essenciais para começar:',
    materials: [
      {
        name: 'Papel',
        text: 'O mais usado é o jornal, pela disponibilidade e pela facilidade de moldagem. Papel de revista ou papel kraft também funcionam, desde que cortados ou rasgados em pedaços pequenos.',
      },
      {
        name: 'Cola branca',
        text: 'Funciona como aglutinante do papel e cria a pasta que será moldada. Prefira uma cola de boa qualidade para obter os melhores resultados.',
      },
      {
        name: 'Água',
        text: 'Dilui a cola e deixa a mistura mais fácil de trabalhar. Também amacia o papel, o que facilita a moldagem.',
      },
      {
        name: 'Base para moldar',
        text: 'Para dar forma à peça é preciso uma base sólida. O arame é uma opção popular, porque pode ser dobrado conforme a necessidade; outra alternativa é uma estrutura de papelão.',
      },
    ],
    extrasTitle: 'Para o acabamento',
    extrasText:
      'Além dos materiais básicos, outros itens ajudam a aprimorar as criações: tintas acrílicas, vernizes e pincéis decoram e protegem a peça depois da secagem, e tecidos, linhas e miçangas acrescentam texturas e detalhes.',
    extras: ['Tintas acrílicas', 'Vernizes', 'Pincéis', 'Tecidos', 'Linhas', 'Miçangas'],
  },

  // --------------------------------------------------------------------------
  // PROCESSO DE CRIAÇÃO
  // Editável pelo painel /admin. A landing page exibe hoje o `tutorial` acima.
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
    numero: '03',
    eyebrow: 'Coleções',
    title: 'Peças em destaque',
    subtitle:
      'Esculturas em papel-machê que celebram a vida, a fé e a cultura popular. Toque em uma peça para ver os detalhes.',
    /** Leva ao caderno de encomendas. */
    ctaLabel: 'Fazer uma encomenda',
  },

  products: [
    {
      id: 2,
      name: 'Brincantes do Guerreiro Alagoano',
      category: 'Escultura em papel-machê',
      description: 'Composição inspirada nos personagens e na tradição do Guerreiro alagoano.',
      story:
        'Uma homenagem em papel-machê aos brincantes e à cultura popular de Alagoas. Consulte o atelier para informações sobre dimensões, disponibilidade e encomendas.',
      price: null,
      image: '/images/products/BrincantesDoGuerreiroAlagoano.jpeg',
      imageAlt: 'Escultura em papel-machê inspirada nos brincantes do Guerreiro Alagoano',
      badge: 'Peça única',
    },
    {
      id: 3,
      name: 'Dona Espanhola',
      category: 'Escultura em papel-machê',
      description: 'Figura autoral que celebra a expressividade da personagem espanhola.',
      story:
        'Uma personagem criada à mão em papel-machê, com identidade própria. Consulte o atelier para informações sobre dimensões, disponibilidade e encomendas.',
      price: null,
      image: '/images/products/DonaEspanhola.jpeg',
      imageAlt: 'Escultura em papel-machê intitulada Dona Espanhola',
      badge: 'Peça única',
    },
    {
      id: 5,
      name: 'Moça com Candeeiro',
      category: 'Escultura em papel-machê',
      description: 'Figura feminina acompanhada de um candeeiro, símbolo de luz e acolhimento.',
      story:
        'Uma peça feita à mão que traz o candeeiro como elemento central da composição. Consulte o atelier para informações sobre dimensões, disponibilidade e encomendas.',
      price: null,
      image: '/images/products/MocaComCandeeiro.jpeg',
      imageAlt: 'Escultura em papel-machê intitulada Moça com Candeeiro',
      badge: 'Peça única',
    },
    {
      id: 1,
      name: 'A Moça do Mar',
      category: 'Escultura em papel-machê',
      description: 'Figura autoral que evoca o imaginário e os encantos do mar.',
      story:
        'Uma criação em papel-machê inspirada na força e na beleza do mar. Consulte o atelier para informações sobre dimensões, disponibilidade e encomendas.',
      price: null,
      image: '/images/products/AMocaDoMar.jpeg',
      imageAlt: 'Escultura em papel-machê intitulada A Moça do Mar',
      badge: 'Peça única',
    },
    {
      id: 7,
      name: 'Nossa Senhora Mãe dos Homens',
      category: 'Escultura em papel-machê',
      description: 'Imagem devocional dedicada a Nossa Senhora Mãe dos Homens.',
      story:
        'Uma representação religiosa modelada à mão em papel-machê. Consulte o atelier para informações sobre dimensões, disponibilidade e encomendas.',
      price: null,
      image: '/images/products/NossaSenhoraMaeDosHomens.jpeg',
      imageAlt: 'Escultura religiosa em papel-machê de Nossa Senhora Mãe dos Homens',
      badge: 'Peça única',
    },
    {
      id: 6,
      name: 'Morada de Passarinhos',
      category: 'Escultura em papel-machê',
      description: 'Composição que celebra os pássaros e a ideia de um lar na natureza.',
      story:
        'Uma obra autoral inspirada nos passarinhos e nos lugares que chamamos de lar. Consulte o atelier para informações sobre dimensões, disponibilidade e encomendas.',
      price: null,
      image: '/images/products/MoradaDePassarinhos.jpeg',
      imageAlt: 'Escultura em papel-machê intitulada Morada de Passarinhos',
      badge: 'Peça única',
    },
    {
      id: 8,
      name: 'Palhaço e Bailarina',
      category: 'Escultura em papel-machê',
      description: 'Encontro de duas figuras do universo circense em uma composição cheia de movimento.',
      story:
        'Uma composição artesanal que reúne o palhaço e a bailarina. Consulte o atelier para informações sobre dimensões, disponibilidade e encomendas.',
      price: null,
      image: '/images/products/PalhacoEBailarina.jpeg',
      imageAlt: 'Escultura em papel-machê intitulada Palhaço e Bailarina',
      badge: 'Peça única',
    },
    {
      id: 4,
      name: 'Dona Ribeirinha',
      category: 'Escultura em papel-machê',
      description: 'Figura inspirada nas mulheres e histórias das comunidades ribeirinhas.',
      story:
        'Uma criação artesanal que evoca a vida e as histórias às margens dos rios. Consulte o atelier para informações sobre dimensões, disponibilidade e encomendas.',
      price: null,
      image: '/images/products/DonaRibeirinha.jpeg',
      imageAlt: 'Escultura em papel-machê intitulada Dona Ribeirinha',
      badge: 'Peça única',
    },
    {
      id: 9,
      name: 'Moça e Candeeiro, Moça e Beija-flor',
      category: 'Escultura em papel-machê',
      description: 'Composição que aproxima a luz do candeeiro da delicadeza do beija-flor.',
      story:
        'Uma criação artesanal inspirada na figura da moça, no candeeiro e no beija-flor. Consulte o atelier para informações sobre dimensões, disponibilidade e encomendas.',
      price: null,
      image: '/images/products/mocaECandeiroMocaEBeija-Flor.jpeg',
      imageAlt: 'Escultura em papel-machê intitulada Moça e Candeeiro, Moça e Beija-flor',
      badge: 'Peça única',
    },
    {
      id: 10,
      name: 'Sereia',
      category: 'Escultura em papel-machê',
      description: 'Figura inspirada nas narrativas populares do mar e no imaginário das sereias.',
      story:
        'Uma criação artesanal inspirada nas histórias e no imaginário das sereias. Consulte o atelier para informações sobre dimensões, disponibilidade e encomendas.',
      price: null,
      image: '/images/products/sereia.jpeg',
      imageAlt: 'Escultura em papel-machê intitulada Sereia',
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
        alt: 'Brincantes do Guerreiro Alagoano em papel-machê',
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
      'A artista alagoana Goretti Brandão transforma papel-machê em esculturas autorais inspiradas pela cultura popular nordestina. No atelier, pesquisa, memória e trabalho manual dão forma a peças únicas.',
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
      photoAlt: 'Retrato de Goretti Brandão no atelier, diante de peças de papel-machê',
    },
  },

  // --------------------------------------------------------------------------
  // CULTURA — blocos de valores da marca
  // `icon` aceita: sol | flor | passaro | maos
  // --------------------------------------------------------------------------
  /** Cabeçalho do caderno escuro. */
  cultureSection: {
    numero: '05',
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
    numero: '07',
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
    numero: '08',
    eyebrow: 'Contato',
    title: 'Vamos conversar?',
    subtitle:
      'Quer conhecer uma peça, fazer uma encomenda ou levar um pouco dessa arte para o seu espaço? Fale com o atelier pelo WhatsApp ou acompanhe os trabalhos pelo Instagram.',

    /** Telefone para exibição — o mesmo número do WhatsApp oficial. */
    phone: '+55 82 99948-2886',
    /** WhatsApp oficial em formato internacional, só dígitos (vira https://wa.me/...). */
    whatsapp: '5582999482886',
    /** Como o número aparece na tela. */
    whatsappDisplay: '+55 82 99948-2886',
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

  /** Caderno de localização (mapa do atelier). */
  mapSection: {
    numero: '09',
    eyebrow: 'Localização',
    description:
      'O atelier é onde tudo acontece: a pesquisa, a bancada, a secagem lenta das peças e as conversas sobre cada encomenda.',
  },

  // --------------------------------------------------------------------------
  // REDES SOCIAIS — só as oficiais. Campo vazio = a rede não aparece no site.
  // Não preencha com endereço que não tenha sido confirmado pelo atelier.
  // --------------------------------------------------------------------------
  social: {
    /** Perfil oficial: @dindago.atelier */
    instagram: 'https://instagram.com/dindago.atelier',
    facebook: '',
    linkedin: '',
    youtube: '',
  },

  /** A seção só aparece quando ao menos uma rede (ou o WhatsApp) estiver preenchida. */
  socialSection: {
    numero: '10',
    eyebrow: 'Redes sociais',
    title: 'Acompanhe o atelier',
    subtitle: 'Novas peças, bastidores do processo e histórias de cada criação.',
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
  /** Mesma ordem das seções na página. */
  nav: [
    { label: 'Início', href: '#inicio' },
    { label: 'Coleções', href: '#pecas' },
    { label: 'Artesanato', href: '#processo' },
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
