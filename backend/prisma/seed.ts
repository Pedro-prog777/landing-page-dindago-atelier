/**
 * ============================================================================
 * SEED — DADOS DE DESENVOLVIMENTO
 * ----------------------------------------------------------------------------
 * ⚠️ TUDO AQUI É DADO DE DESENVOLVIMENTO.
 *
 * O conteúdo do Dindagó reproduz exatamente o que já estava em
 * `src/data/clientData.ts`, para que a landing page continue idêntica depois
 * de passar a ler da API. O segundo cliente ("atelier-demo") existe só para
 * provar o multi-cliente e pode ser apagado à vontade.
 *
 * NENHUMA FOTOGRAFIA é cadastrada: os campos de imagem apontam para os
 * caminhos onde a equipe vai colocar os arquivos reais. Enquanto não existirem,
 * a interface mostra as pranchas de catálogo reservadas.
 *
 * A senha do administrador vem de SEED_ADMIN_PASSWORD no .env e serve apenas
 * para desenvolvimento local — troque antes de qualquer publicação.
 * ============================================================================
 */
import 'dotenv/config';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

// O seed roda fora do servidor, então monta o próprio cliente com o adapter.
const prisma = new PrismaClient({
  adapter: new PrismaBetterSqlite3({
    url: process.env.DATABASE_URL ?? 'file:./dev.db',
  }),
});

const EMAIL_ADMIN = process.env.SEED_ADMIN_EMAIL ?? 'admin@dindago.local';
const SENHA_ADMIN = process.env.SEED_ADMIN_PASSWORD ?? 'dindago123';

async function main() {
  console.log('Semeando dados de desenvolvimento...\n');

  // --------------------------------------------------------------------------
  // Cliente principal — Dindagó Atelier
  // --------------------------------------------------------------------------
  const dindago = await prisma.client.upsert({
    where: { slug: 'dindago-atelier' },
    update: {},
    create: {
      slug: 'dindago-atelier',
      name: 'Dindagó Atelier',
      segment: 'Artesanato autoral em papel-machê',
      slogan: 'Arte que nasce da cultura popular e das mãos que transformam.',
      description:
        'Esculturas em papel-machê que celebram a vida, a fé e a cultura popular nordestina.',
      logoUrl: '/images/logo/dindago-atelier.svg',
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

  await prisma.contactInfo.upsert({
    where: { clientId: dindago.id },
    update: {},
    create: {
      clientId: dindago.id,
      // Telefone segue pendente: o número do mockup era fictício.
      phone: null,
      whatsapp: null,
      whatsappDisplay: null,
      email: 'contato@dindagoatelier.com.br',
      address: 'Santana do Ipanema – AL',
      addressNote: 'Visitas ao atelier com agendamento prévio.',
    },
  });

  // Capa
  const hero = await prisma.heroContent.upsert({
    where: { clientId: dindago.id },
    update: {},
    create: {
      clientId: dindago.id,
      titleLine1: 'Arte que nasce',
      titleLine2: 'da memória, da cultura',
      titleHighlight: 'e das mãos.',
      subtitle:
        'Peças artesanais que carregam a identidade e a beleza do Nordeste brasileiro.',
      imageUrl: '/images/hero/peca-principal.jpg',
      imageAlt:
        'Escultura em papel-machê de uma mulher com cabelos em forma de mar, peixes e um barco',
      imageCaption: 'Mulher do Mar — papel-machê sobre estrutura de arame',
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
    update: {},
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
        '[BIOGRAFIA DA ARTESÃ] Espaço reservado para formação, trajetória, o começo do atelier e o que a levou ao papel-machê. Substitua por suas próprias palavras — é o texto que mais aproxima quem chega ao site.',
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
        name: 'Ciranda do Sertão',
        slug: 'ciranda-do-sertao',
        category: 'Escultura em papel-machê',
        description: 'Roda de figuras de mãos dadas, celebrando a festa que reúne o povo no terreiro.',
        story:
          'A ciranda é dança de roda: ninguém dança sozinho. Esta peça reúne figuras de mãos dadas em movimento contínuo, modeladas uma a uma sobre estrutura de arame e papelão reaproveitado. As saias ganham volume no papel-machê ainda úmido e a pintura final acompanha as cores da festa no sertão.',
        price: null,
        imageUrl: '/images/products/ciranda-do-sertao.jpg',
        imageAlt: 'Escultura em papel-machê representando uma roda de ciranda com figuras de mãos dadas',
        badge: 'Peça única',
        featured: true,
        order: 0,
      },
      {
        clientId: dindago.id,
        name: 'Mãe e Filho',
        slug: 'mae-e-filho',
        category: 'Escultura em papel-machê',
        description: 'O gesto do colo transformado em volume: afeto, cuidado e memória em uma só forma.',
        story:
          'Nasce da memória do colo — o corpo que abriga outro corpo. A construção começa pelo desenho, passa pela estrutura interna e chega à modelagem das mãos, sempre a parte mais delicada. O acabamento mantém a textura do papel visível, para que a matéria-prima continue reconhecível na obra pronta.',
        price: null,
        imageUrl: '/images/products/mae-e-filho.jpg',
        imageAlt: 'Escultura em papel-machê de uma mãe segurando o filho no colo',
        badge: 'Peça única',
        order: 1,
      },
      {
        clientId: dindago.id,
        name: 'Sanfoneiro',
        slug: 'sanfoneiro',
        category: 'Escultura em papel-machê',
        description: 'Figura popular do forró, com o fole aberto no meio da música.',
        story:
          'Homenagem aos músicos que atravessam gerações tocando nas feiras, nos arraiais e nas calçadas. O fole é construído em camadas dobradas de papel, técnica que exige secagem lenta para manter as pregas firmes. O chapéu de couro e a postura do corpo foram estudados em fotografias e registros de mestres da sanfona.',
        price: null,
        imageUrl: '/images/products/sanfoneiro.jpg',
        imageAlt: 'Escultura em papel-machê de um sanfoneiro tocando com o fole aberto',
        order: 2,
      },
      {
        clientId: dindago.id,
        name: 'Mulher do Mar',
        slug: 'mulher-do-mar',
        category: 'Escultura em papel-machê',
        description: 'Presença serena das mulheres que vivem do mar, entre a maré e a espera.',
        story:
          'Entre o sertão e o litoral existe uma mesma força: a de quem espera e trabalha. Os cabelos viram mar, com peixes e um barco que carrega uma pequena igreja — devoção e travessia na mesma peça. Os tons de azul foram escolhidos para contrastar com a paleta de barro do restante da coleção.',
        price: null,
        imageUrl: '/images/products/mulher-do-mar.jpg',
        imageAlt: 'Escultura em papel-machê de uma mulher com cabelos em forma de mar, peixes e um barco',
        badge: 'Peça única',
        order: 3,
      },
    ],
  });

  // Galeria — caminhos reservados para as fotografias reais
  await prisma.galleryItem.deleteMany({ where: { clientId: dindago.id } });
  const galeria = [
    ['Obras', 'obra-01', 'Escultura em papel-machê finalizada sobre fundo neutro'],
    ['Obras', 'obra-02', 'Conjunto de figuras em papel-machê inspiradas na cultura popular'],
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

  // Depoimentos ficam vazios de propósito: depoimento é palavra de cliente
  // real, não se inventa nem em dado de desenvolvimento.

  // --------------------------------------------------------------------------
  // Segundo cliente — existe apenas para demonstrar o multi-cliente
  // --------------------------------------------------------------------------
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

  // --------------------------------------------------------------------------
  // Usuários do painel
  // --------------------------------------------------------------------------
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
