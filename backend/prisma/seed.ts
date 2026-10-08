import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { criarClientePrisma } from '../src/criarClientePrisma.js';

const prisma = criarClientePrisma(process.env.DATABASE_URL);

const EMAIL_ADMIN = process.env.SEED_ADMIN_EMAIL ?? 'admin@dindago.local';
const SENHA_ADMIN = process.env.SEED_ADMIN_PASSWORD ?? 'dindago123';

async function main() {
  console.log('Semeando dados de desenvolvimento...\n');

  // Cliente principal — Dindagó Atelier
  const dindago = await prisma.client.upsert({
    where: { slug: 'dindago-atelier' },
    // Sem logo até o arquivo real existir (bancos antigos apontavam para um SVG ausente).
    update: { logoUrl: null },
    create: {
      slug: 'dindago-atelier',
      name: 'Dindagó Atelier',
      segment: 'Artesanato autoral em papel-machê',
      slogan: 'Arte que nasce da cultura popular e das mãos que transformam.',
      description:
        'Esculturas em papel-machê que celebram a vida, a fé e a cultura popular nordestina.',
      // Sem logo até o arquivo real existir: o site mostra a assinatura tipográfica.
      logoUrl: null,
    },
  });

  await prisma.clientSettings.upsert({
    where: { clientId: dindago.id },
    update: {},
    create: {
      clientId: dindago.id,
      colorPrimary: '#c0873a',
      colorSecondary: '#a0472c',
      colorAccent: '#d9a62e',
      colorBackground: '#fbf6ea',
      seoTitle: 'Dindagó Atelier | Arte em Papel-Machê',
      seoDescription:
        'Conheça o Dindagó Atelier, onde papel-machê, cultura nordestina, memória e trabalho artesanal se transformam em peças únicas e autorais.',
      seoUrl: 'https://dindagoatelier.com.br/',
      seoOgImage: '/images/hero/og-image.jpg',
      shippingNote: 'Frete para todo o Brasil',
    },
  });

  // WhatsApp oficial do atelier. Vai também no `update` para os bancos criados
  // quando o número ainda estava pendente.
  const whatsappOficial = {
    phone: '+55 82 99948-2886',
    whatsapp: '5582999482886',
    whatsappDisplay: '+55 82 99948-2886',
  };

  await prisma.contactInfo.upsert({
    where: { clientId: dindago.id },
    update: whatsappOficial,
    create: {
      clientId: dindago.id,
      ...whatsappOficial,
      email: 'contato@dindagoatelier.com.br',
      address: 'Santana do Ipanema – AL',
      addressNote: 'Visitas ao atelier com agendamento prévio.',
    },
  });

  // Capa (subtítulo e arte vão também no `update` para atualizar bancos antigos)
  const subtituloCapa =
    'Esculturas autorais em papel-machê, feitas à mão pela artista alagoana Goretti Brandão. Peças únicas que carregam a memória, a fé e a cultura popular do Nordeste.';

  // A arte da capa vai também no `update`: bancos antigos guardavam o caminho de
  // uma foto que não existe mais, e a capa aparecia sem imagem com a API ligada.
  const arteDaCapa = {
    imageUrl: '/images/hero/EuAmoNordeste.jpeg',
    imageAlt:
      'Arte em papel com a frase “Eu amo meu Nordeste” e ilustrações do sertão, cactos e mandacarus',
    imageCaption: 'Eu amo meu Nordeste — arte inspirada na cultura sertaneja',
  };

  const hero = await prisma.heroContent.upsert({
    where: { clientId: dindago.id },
    update: { subtitle: subtituloCapa, ...arteDaCapa },
    create: {
      clientId: dindago.id,
      titleLine1: 'Arte que nasce',
      titleLine2: 'da memória, da cultura',
      titleHighlight: 'e das mãos.',
      subtitle: subtituloCapa,
      ...arteDaCapa,
      primaryCtaLabel: 'Ver as peças',
      primaryCtaHref: '#pecas',
      secondaryCtaLabel: 'Falar com o atelier',
      secondaryCtaHref: 'whatsapp',
    },
  });

  await prisma.heroFact.deleteMany({ where: { heroId: hero.id } });
  await prisma.heroFact.createMany({
    data: [
      { heroId: hero.id, label: 'Técnica', value: 'Papel-machê', order: 0 },
      { heroId: hero.id, label: 'Origem', value: 'Sertão de Alagoas', order: 1 },
      { heroId: hero.id, label: 'Produção', value: 'Peça única', order: 2 },
    ],
  });

  // Sobre
  const sobre = await prisma.aboutContent.upsert({
    where: { clientId: dindago.id },
    update: {
      body: [
        'O Dindagó Atelier nasce do encontro entre pesquisa e trabalho manual. As esculturas em papel-machê partem de histórias vividas e ouvidas — festas, ofícios, personagens do cotidiano nordestino — e ganham forma no tempo lento do papel.',
        'A artista alagoana Goretti Brandão transforma papel-machê em esculturas autorais inspiradas pela cultura popular nordestina. No atelier, pesquisa, memória e trabalho manual dão forma a peças únicas.',
      ].join('\n\n'),
    },
    create: {
      clientId: dindago.id,
      eyebrow: 'Sobre o atelier',
      title: 'Por trás de cada peça, existe uma história.',
      intro:
        'Dindagó Atelier é o espaço criativo da artista alagoana Goretti Brandão, onde a arte em papel-machê ganha vida através de histórias, memórias e da força da cultura popular nordestina.',
      quote:
        'Cada peça começa muito antes das mãos tocarem o papel. Começa na imaginação, na pesquisa e na memória.',
      body: [
        'O Dindagó Atelier nasce do encontro entre pesquisa e trabalho manual. As esculturas em papel-machê partem de histórias vividas e ouvidas — festas, ofícios, personagens do cotidiano nordestino — e ganham forma no tempo lento do papel.',
        'A artista alagoana Goretti Brandão transforma papel-machê em esculturas autorais inspiradas pela cultura popular nordestina. No atelier, pesquisa, memória e trabalho manual dão forma a peças únicas.',
      ].join('\n\n'),
      ctaLabel: 'Conheça nossa história',
      artistName: 'Goretti Brandão',
      artistRole: 'Artista e criadora do Dindagó Atelier',
      artistPhotoUrl: '/images/artist/artesa.jpg',
      artistPhotoAlt: 'Goretti Brandão trabalhando em uma peça de papel-machê no atelier',
    },
  });

  await prisma.aboutPillar.deleteMany({ where: { aboutId: sobre.id } });
  await prisma.aboutPillar.createMany({
    data: [
      {
        aboutId: sobre.id,
        title: 'A pesquisa',
        text: 'Cada peça começa em um caderno: referências, conversas, memórias de festa, de feira e de casa.',
        order: 0,
      },
      {
        aboutId: sobre.id,
        title: 'O desenho',
        text: 'A ideia vira traço antes de virar volume. É no desenho que a figura ganha postura e gesto.',
        order: 1,
      },
      {
        aboutId: sobre.id,
        title: 'As mãos',
        text: 'Nada é moldado em série. O tempo de secagem do papel dita o ritmo do trabalho.',
        order: 2,
      },
    ],
  });

  // Processo
  const processo = await prisma.processContent.upsert({
    where: { clientId: dindago.id },
    update: {},
    create: {
      clientId: dindago.id,
      eyebrow: 'O artesanato',
      title: 'Do papel à arte',
      body: [
        'O trabalho do Dindagó Atelier parte de uma técnica milenar: o papel-machê.',
        'O papel é deixado de molho em água, transformado em polpa e posteriormente triturado. A essa mistura é acrescentada uma cola caseira e orgânica. Dessa matéria-prima nasce o papel-machê.',
        'Antes de cada escultura existir, ela nasce na imaginação. A ideia é pesquisada, pensada e transformada em desenho. Depois começa a construção da estrutura da peça.',
      ].join('\n\n'),
      materialsTitle: 'Materiais reaproveitados',
      materialsText:
        'Boa parte do que sustenta cada escultura viria a ser descartado. No atelier, vira estrutura, volume e forma.',
      materials: ['Garrafas PET', 'Papelão', 'Caixas', 'Resíduos sólidos', 'Arame'].join('\n'),
      imageUrl: '/images/gallery/processo-04.jpg',
      imageAlt: 'Mãos modelando o papel-machê sobre a estrutura de uma peça',
    },
  });

  await prisma.processStep.deleteMany({ where: { processId: processo.id } });
  await prisma.processStep.createMany({
    data: [
      { processId: processo.id, name: 'Papel', detail: 'Papel de molho na água até amolecer por completo.', order: 0 },
      { processId: processo.id, name: 'Polpa', detail: 'A massa é triturada e recebe cola caseira e orgânica.', order: 1 },
      { processId: processo.id, name: 'Estrutura', detail: 'Arame e papelão formam o esqueleto da peça.', order: 2 },
      { processId: processo.id, name: 'Modelagem', detail: 'O papel-machê ganha volume, gesto e postura.', order: 3 },
      { processId: processo.id, name: 'Detalhes', detail: 'Acabamento, textura e pintura feitos à mão.', order: 4 },
      { processId: processo.id, name: 'Obra final', detail: 'Secagem lenta e a escultura pronta para durar.', order: 5 },
    ],
  });

  // Diferenciais
  await prisma.benefit.deleteMany({ where: { clientId: dindago.id } });
  await prisma.benefit.createMany({
    data: [
      { clientId: dindago.id, icon: 'maos', title: 'Feito à mão', description: 'Peças únicas, modeladas com dedicação e cuidado.', order: 0 },
      { clientId: dindago.id, icon: 'folha', title: 'Sustentável', description: 'Utilizamos papel reciclado e materiais reaproveitados.', order: 1 },
      { clientId: dindago.id, icon: 'sol', title: 'Identidade nordestina', description: 'Inspiradas na cultura, nas histórias e nas cores do nosso povo.', order: 2 },
      { clientId: dindago.id, icon: 'cacto', title: 'Autoral', description: 'Criações exclusivas que carregam alma, memória e afeto.', order: 3 },
      { clientId: dindago.id, icon: 'presente', title: 'Encomendas', description: 'Peças personalizadas feitas especialmente para você.', order: 4 },
    ],
  });

  // Peças — preço nulo de propósito: exibe "Consultar valor"
  await prisma.product.deleteMany({ where: { clientId: dindago.id } });
  await prisma.product.createMany({
    data: [
      {
        clientId: dindago.id,
        name: 'A Moça do Mar',
        slug: 'a-moca-do-mar',
        category: 'Escultura em papel-machê',
        description: 'Figura autoral que evoca o imaginário e os encantos do mar.',
        story:
          'Uma criação em papel-machê inspirada na força e na beleza do mar. Consulte o atelier para informações sobre dimensões, disponibilidade e encomendas.',
        price: null,
        imageUrl: '/images/products/AMocaDoMar.jpeg',
        imageAlt: 'Escultura em papel-machê intitulada A Moça do Mar',
        badge: 'Peça única',
        featured: true,
        order: 3,
      },
      {
        clientId: dindago.id,
        name: 'Brincantes do Guerreiro Alagoano',
        slug: 'brincantes-do-guerreiro-alagoano',
        category: 'Escultura em papel-machê',
        description: 'Composição inspirada nos personagens e na tradição do Guerreiro alagoano.',
        story:
          'Uma homenagem em papel-machê aos brincantes e à cultura popular de Alagoas. Consulte o atelier para informações sobre dimensões, disponibilidade e encomendas.',
        price: null,
        imageUrl: '/images/products/BrincantesDoGuerreiroAlagoano.jpeg',
        imageAlt: 'Escultura em papel-machê inspirada nos brincantes do Guerreiro Alagoano',
        badge: 'Peça única',
        order: 0,
      },
      {
        clientId: dindago.id,
        name: 'Dona Espanhola',
        slug: 'dona-espanhola',
        category: 'Escultura em papel-machê',
        description: 'Figura autoral que celebra a expressividade da personagem espanhola.',
        story:
          'Uma personagem criada à mão em papel-machê, com identidade própria. Consulte o atelier para informações sobre dimensões, disponibilidade e encomendas.',
        price: null,
        imageUrl: '/images/products/DonaEspanhola.jpeg',
        imageAlt: 'Escultura em papel-machê intitulada Dona Espanhola',
        badge: 'Peça única',
        order: 1,
      },
      {
        clientId: dindago.id,
        name: 'Dona Ribeirinha',
        slug: 'dona-ribeirinha',
        category: 'Escultura em papel-machê',
        description: 'Figura inspirada nas mulheres e histórias das comunidades ribeirinhas.',
        story:
          'Uma criação artesanal que evoca a vida e as histórias às margens dos rios. Consulte o atelier para informações sobre dimensões, disponibilidade e encomendas.',
        price: null,
        imageUrl: '/images/products/DonaRibeirinha.jpeg',
        imageAlt: 'Escultura em papel-machê intitulada Dona Ribeirinha',
        badge: 'Peça única',
        order: 7,
      },
      {
        clientId: dindago.id,
        name: 'Moça com Candeeiro',
        slug: 'moca-com-candeeiro',
        category: 'Escultura em papel-machê',
        description: 'Figura feminina acompanhada de um candeeiro, símbolo de luz e acolhimento.',
        story:
          'Uma peça feita à mão que traz o candeeiro como elemento central da composição. Consulte o atelier para informações sobre dimensões, disponibilidade e encomendas.',
        price: null,
        imageUrl: '/images/products/MocaComCandeeiro.jpeg',
        imageAlt: 'Escultura em papel-machê intitulada Moça com Candeeiro',
        badge: 'Peça única',
        order: 2,
      },
      {
        clientId: dindago.id,
        name: 'Morada de Passarinhos',
        slug: 'morada-de-passarinhos',
        category: 'Escultura em papel-machê',
        description: 'Composição que celebra os pássaros e a ideia de um lar na natureza.',
        story:
          'Uma obra autoral inspirada nos passarinhos e nos lugares que chamamos de lar. Consulte o atelier para informações sobre dimensões, disponibilidade e encomendas.',
        price: null,
        imageUrl: '/images/products/MoradaDePassarinhos.jpeg',
        imageAlt: 'Escultura em papel-machê intitulada Morada de Passarinhos',
        badge: 'Peça única',
        order: 5,
      },
      {
        clientId: dindago.id,
        name: 'Nossa Senhora Mãe dos Homens',
        slug: 'nossa-senhora-mae-dos-homens',
        category: 'Escultura em papel-machê',
        description: 'Imagem devocional dedicada a Nossa Senhora Mãe dos Homens.',
        story:
          'Uma representação religiosa modelada à mão em papel-machê. Consulte o atelier para informações sobre dimensões, disponibilidade e encomendas.',
        price: null,
        imageUrl: '/images/products/NossaSenhoraMaeDosHomens.jpeg',
        imageAlt: 'Escultura religiosa em papel-machê de Nossa Senhora Mãe dos Homens',
        badge: 'Peça única',
        order: 4,
      },
      {
        clientId: dindago.id,
        name: 'Palhaço e Bailarina',
        slug: 'palhaco-e-bailarina',
        category: 'Escultura em papel-machê',
        description: 'Encontro de duas figuras do universo circense em uma composição cheia de movimento.',
        story:
          'Uma composição artesanal que reúne o palhaço e a bailarina. Consulte o atelier para informações sobre dimensões, disponibilidade e encomendas.',
        price: null,
        imageUrl: '/images/products/PalhacoEBailarina.jpeg',
        imageAlt: 'Escultura em papel-machê intitulada Palhaço e Bailarina',
        badge: 'Peça única',
        order: 6,
      },
      {
        clientId: dindago.id,
        name: 'Moça e Candeeiro, Moça e Beija-flor',
        slug: 'moca-e-candeeiro-moca-e-beija-flor',
        category: 'Escultura em papel-machê',
        description: 'Composição que aproxima a luz do candeeiro da delicadeza do beija-flor.',
        story:
          'Uma criação artesanal inspirada na figura da moça, no candeeiro e no beija-flor. Consulte o atelier para informações sobre dimensões, disponibilidade e encomendas.',
        price: null,
        imageUrl: '/images/products/mocaECandeiroMocaEBeija-Flor.jpeg',
        imageAlt: 'Escultura em papel-machê intitulada Moça e Candeeiro, Moça e Beija-flor',
        badge: 'Peça única',
        order: 8,
      },
      {
        clientId: dindago.id,
        name: 'Sereia',
        slug: 'sereia',
        category: 'Escultura em papel-machê',
        description: 'Figura inspirada nas narrativas populares do mar e no imaginário das sereias.',
        story:
          'Uma criação artesanal inspirada nas histórias e no imaginário das sereias. Consulte o atelier para informações sobre dimensões, disponibilidade e encomendas.',
        price: null,
        imageUrl: '/images/products/sereia.jpeg',
        imageAlt: 'Escultura em papel-machê intitulada Sereia',
        badge: 'Peça única',
        order: 9,
      },
    ],
  });

  // Galeria — caminhos reservados para as fotografias reais
  await prisma.galleryItem.deleteMany({ where: { clientId: dindago.id } });
  const galeria = [
    ['Obras', 'obra-01', 'Escultura em papel-machê finalizada sobre fundo neutro'],
    ['Obras', 'obra-02', 'Brincantes do Guerreiro Alagoano em papel-machê'],
    ['Obras', 'obra-03', 'Escultura de figura humana em papel-machê com pintura em tons de terra'],
    ['Processo', 'processo-01', 'Papel de molho em água, primeira etapa da produção do papel-machê'],
    ['Processo', 'processo-02', 'Polpa de papel triturada pronta para receber a cola caseira'],
    ['Processo', 'processo-03', 'Estrutura de arame e papelão sendo montada antes da modelagem'],
    ['Processo', 'processo-04', 'Mãos modelando o papel-machê sobre a estrutura da peça'],
    ['Atelier', 'atelier-01', 'Bancada do atelier com ferramentas e peças em produção'],
    ['Atelier', 'atelier-02', 'Prateleira do atelier com esculturas em diferentes etapas'],
    ['Atelier', 'atelier-03', 'Materiais reaproveitados guardados no atelier: papelão, garrafas e arame'],
    ['Detalhes', 'detalhe-01', 'Detalhe da textura do papel-machê na superfície de uma peça'],
    ['Detalhes', 'detalhe-02', 'Detalhe da pintura à mão em uma escultura de papel-machê'],
  ] as const;

  await prisma.galleryItem.createMany({
    data: galeria.map(([categoria, arquivo, alt], indice) => ({
      clientId: dindago.id,
      category: categoria,
      imageUrl: `/images/gallery/${arquivo}.jpg`,
      alt,
      order: indice,
    })),
  });

  // Redes sociais: só as oficiais. Facebook e outras ficam de fora até o
  // atelier informar um endereço real.
  await prisma.socialLink.deleteMany({ where: { clientId: dindago.id } });
  await prisma.socialLink.create({
    data: {
      clientId: dindago.id,
      network: 'instagram',
      url: 'https://instagram.com/dindago.atelier',
      order: 0,
    },
  });

  // Depoimentos ficam vazios de propósito: depoimento é palavra de cliente
  // real, não se inventa nem em dado de desenvolvimento.

  // Segundo cliente — existe apenas para demonstrar o multi-cliente
  const demo = await prisma.client.upsert({
    where: { slug: 'atelier-demo' },
    update: {},
    create: {
      slug: 'atelier-demo',
      name: '[CLIENTE DE DEMONSTRAÇÃO]',
      segment: '[SEGMENTO DO CLIENTE]',
      slogan: '[SLOGAN DO CLIENTE]',
      description: '[DESCRIÇÃO DO CLIENTE]',
      settings: { create: { shippingNote: '[AVISO DE ENTREGA]' } },
      contactInfo: { create: {} },
      hero: {
        create: {
          titleLine1: '[TÍTULO PRINCIPAL]',
          titleLine2: '[SEGUNDA LINHA]',
          titleHighlight: '[DESTAQUE]',
          subtitle: '[SUBTÍTULO DA CAPA]',
          primaryCtaLabel: 'Ver as peças',
          primaryCtaHref: '#pecas',
        },
      },
      about: { create: {} },
      process: { create: {} },
    },
  });

  // Usuários do painel
  const hash = await bcrypt.hash(SENHA_ADMIN, 12);

  await prisma.user.upsert({
    where: { email: EMAIL_ADMIN },
    update: {},
    create: {
      email: EMAIL_ADMIN,
      name: 'Administrador (desenvolvimento)',
      passwordHash: hash,
      role: 'OWNER',
    },
  });

  await prisma.user.upsert({
    where: { email: 'editor@dindago.local' },
    update: {},
    create: {
      email: 'editor@dindago.local',
      name: 'Editor do Dindagó (desenvolvimento)',
      passwordHash: hash,
      role: 'EDITOR',
      clientId: dindago.id,
    },
  });

  console.log('Clientes:');
  console.log(`  ${dindago.slug} (conteúdo real do atelier)`);
  console.log(`  ${demo.slug} (demonstração de multi-cliente)`);
  console.log('\nAcesso ao painel (SOMENTE DESENVOLVIMENTO):');
  console.log(`  OWNER   ${EMAIL_ADMIN} / ${SENHA_ADMIN}`);
  console.log(`  EDITOR  editor@dindago.local / ${SENHA_ADMIN}`);
  console.log('\nNenhuma fotografia foi cadastrada — só os caminhos reservados.\n');
}

main()
  .catch((erro) => {
    console.error('Falha ao semear:', erro);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
