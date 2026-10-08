# Dindagó Atelier — Landing Page

Landing page do **Dindagó Atelier**, espaço criativo da artista alagoana
**Goretti Brandão**, que cria esculturas autorais em **papel-machê** inspiradas
na cultura popular nordestina. Acompanha backend, banco de dados, API e painel
administrativo; o mesmo código serve **vários clientes**, cada um com seus
textos, cores, peças e contatos.

A proposta **não é uma loja virtual**: é um portfólio digital que apresenta as
peças, conta a história da artista, ensina o básico do papel-machê e leva o
visitante a pedir uma encomenda ou entrar em contato.

## Sobre o projeto

**Objetivo:** dar ao atelier uma presença on-line profissional, em que quem
nunca ouviu falar dele entenda em poucos segundos o que é, veja as obras e
saiba como encomendar.

**Para quem:** pessoas que procuram arte popular e decoração com identidade,
quem quer dar um presente feito à mão e lojistas, arquitetos e decoradores
interessados em peças autorais.

**Ordem de leitura da página**

| Nº  | Seção           | Responde a                                                |
| --- | --------------- | --------------------------------------------------------- |
| 01  | Capa            | O que é: esculturas em papel-machê de Goretti Brandão, AL |
| 02  | Diferenciais    | Por que importa: feito à mão, sustentável, autoral        |
| 03  | Coleções        | O trabalho: 10 obras, com detalhes de cada uma            |
| 04  | O artesanato    | Como se faz: tutorial "Como fazer papel-machê?"           |
| 05  | Sobre o atelier | Quem é e no que acredita                                  |
| 06  | Nossa história  | A artista, em retrato e depoimento                        |
| 07  | Encomendas      | Como funciona uma peça personalizada, em 4 etapas         |
| 08  | Contato         | Formulário + canais de atendimento                        |
| 09  | Localização     | Onde fica o atelier (mapa e rota)                         |
| 10  | Redes sociais   | Aparece sozinha quando os links reais forem preenchidos   |

**Principais funcionalidades**

- Mosaico de peças com diálogo de detalhes: foto inteira, ficha técnica e
  navegação entre as peças (botões e setas do teclado).
- "Tenho interesse" numa peça e "Fazer uma encomenda" levam ao formulário já
  preenchido com a peça e o assunto.
- Formulário de contato com validação, proteção anti-robô e três desfechos:
  grava na API; sem API, monta a mensagem no WhatsApp ou no e-mail do atelier.
- Busca no site (peças e seções); um resultado de peça abre a própria peça.
- Menu com a seção atual destacada, menu mobile e botão flutuante de contato.
- Painel `/admin` para editar textos, cores e peças e ler as mensagens.
- Funciona sem backend: o conteúdo padrão está em `src/data/clientData.ts`.

---

## Para a apresentação

O jeito mais simples (não precisa de banco de dados):

```bash
npm install
npm run dev        # abre em http://localhost:5173
```

Para mostrar também o painel administrativo e o formulário gravando no banco,
rode a API em outro terminal (`npm run dev:api`) — veja [Instalação](#instalação).

Roteiro sugerido de demonstração:

1. Capa: o que é o atelier, em uma frase, e a arte "Eu amo meu Nordeste".
2. Coleções: abrir uma peça, navegar com as setas, clicar em "Tenho interesse"
   e mostrar o formulário já preenchido.
3. Busca (lupa no topo): digitar "sereia" e abrir a peça.
4. Encomendas: as 4 etapas e o botão que escolhe o assunto do formulário.
5. Celular: no navegador, `F12` → ícone de celular (`Ctrl+Shift+M`), escolher
   um iPhone ou Galaxy e abrir o menu ☰.

> Sem a API rodando, o console do navegador mostra um aviso de que ela está
> indisponível — é esperado, e o site segue com o conteúdo local. Para não ter
> nem esse aviso, use `VITE_SEM_API=true` no `.env` (ver
> [Variáveis de ambiente](#variáveis-de-ambiente)).

---

> **É a sua primeira vez neste projeto?** Comece pelo **[SETUP.md](SETUP.md)** —
> guia passo a passo desde a instalação do Git, do Node e do PostgreSQL numa
> máquina zerada, com cada comando verificado. Este README é a referência
> técnica; o SETUP é o caminho de instalação.

---

## Sumário

- [Sobre o projeto](#sobre-o-projeto)
- [Para a apresentação](#para-a-apresentação)
- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pré-requisitos)
- [Como clonar](#como-clonar)
- [Instalação](#instalação)
- [Como executar](#como-executar)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Direção de design](#direção-de-design)
- [Configuração do cliente](#configuração-do-cliente)
- [Imagens](#imagens)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Publicação gratuita](#publicação-gratuita)
- [Desenvolvimento em equipe](#desenvolvimento-em-equipe)
- [Padrão de commits](#padrão-de-commits)
- [Fluxo de Pull Request](#fluxo-de-pull-request)
- [Comandos Git do dia a dia](#comandos-git-do-dia-a-dia)
- [Problemas comuns](#problemas-comuns)
- [Acessibilidade e responsividade](#acessibilidade-e-responsividade)

---

## Arquitetura

```
VISITANTE                        ADMINISTRADOR
    |                                  |
    v                                  v
Landing page  (React)            Painel  /admin  (React)
    |                                  |
    +--------------> API <-------------+
                  (Express)
                      |
                      v
                   Prisma
                      |
                      v
              Banco (PostgreSQL padrão / SQLite local)
```

**O design nunca depende da rede.** A landing page começa a renderizar com o
conteúdo de `src/data/clientData.ts` e substitui campo a campo quando a API
responde. Com o backend fora do ar, o site continua idêntico — só um aviso no
console registra o ocorrido.

| Camada       | Onde                             |
| ------------ | -------------------------------- |
| Landing page | `src/components`, `src/conteudo` |
| Painel       | `src/admin`                      |
| Cliente HTTP | `src/api/cliente.ts`             |
| API          | `backend/src/rotas`              |
| Validação    | `backend/src/schemas`            |
| Banco        | `backend/prisma/schema.prisma`   |

---

## Tecnologias

| Ferramenta                                   | Para que serve                      |
| -------------------------------------------- | ----------------------------------- |
| [React 19](https://react.dev)                | biblioteca de interface             |
| [TypeScript](https://www.typescriptlang.org) | JavaScript com tipagem              |
| [Vite](https://vite.dev)                     | servidor de desenvolvimento e build |
| [Tailwind CSS v4](https://tailwindcss.com)   | estilização por classes utilitárias |
| [lucide-react](https://lucide.dev)           | ícones                              |
| [oxlint](https://oxc.rs)                     | análise estática do código          |
| Google Fonts                                 | tipografias Instrument Serif e Archivo |

O site público continua funcionando com conteúdo local sem o backend. O painel
administrativo e os formulários usam a API Express e o banco configurado.

---

## Pré-requisitos

Cada integrante precisa instalar na própria máquina:

| Programa            | Versão                     | Onde baixar                     |
| ------------------- | -------------------------- | ------------------------------- |
| **Git**             | 2.40+                      | <https://git-scm.com/downloads> |
| **Node.js**         | 20.19+ (recomendado 24)    | <https://nodejs.org>            |
| **npm**             | 10+ (vem junto com o Node) | —                               |
| **VS Code**         | atual                      | <https://code.visualstudio.com> |
| **Conta no GitHub** | —                          | <https://github.com>            |

Confira se está tudo certo:

```bash
git --version
node --version
npm --version
```

> Ao abrir o projeto no VS Code, aceite a sugestão de instalar as extensões
> recomendadas (Tailwind CSS IntelliSense, Prettier, ESLint e GitLens).

**Antes do primeiro `git push`,** configure seu nome e e-mail — eles aparecem
em cada commit:

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu-email@exemplo.com"
```

---

## Como clonar

```bash
git clone https://github.com/USUARIO/landing-page-dindago-atelier.git
cd landing-page-dindago-atelier
```

> Troque `USUARIO` pelo dono do repositório. O endereço exato aparece no botão
> verde **Code** da página do projeto no GitHub.

---

## Instalação

```bash
npm install
```

Instala frontend e backend de uma vez (o backend é um workspace npm).

### Configurar as variáveis de ambiente

```bash
cp .env.example .env                  # frontend
cp backend/.env.example backend/.env  # backend
```

No `backend/.env`, troque o `JWT_SECRET` por um valor aleatório de pelo menos
32 caracteres. Em produção:

```bash
openssl rand -base64 48
```

> Os arquivos `.env` **nunca** vão para o GitHub — estão no `.gitignore`. Só os
> `.env.example` são versionados, e eles não têm valores reais.

### Banco local — PostgreSQL

Para usar PostgreSQL, baixe em <https://www.postgresql.org/download/windows/> e instale. Durante a
instalação ele pede uma senha para o usuário `postgres` — **anote**, você vai
precisar dela.

Anote também a **porta** (o padrão é 5432, mas o instalador pode sugerir outra).

Depois crie o banco. Pelo pgAdmin, que vem junto com a instalação:
**Databases** → botão direito → **Create** → **Database** → nome `dindago`.

Configure `DATABASE_URL` no `backend/.env` com a sua senha e a sua porta:

```env
DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/dindago?schema=public"
```

> Cada pessoa tem o seu próprio banco, na própria máquina. O `.env` não vai
> para o Git justamente por isso.

SQLite continua disponível como alternativa para desenvolvimento sem servidor.
Nesse caso, use `DATABASE_URL="file:./dev.db"` e `npm run db:push`.

### Criar as tabelas e popular

```bash
npm run db:migrate   # cria as tabelas
npm run db:seed      # popula com dados de desenvolvimento
```

O seed cria:

- o cliente **dindago-atelier**, com o conteúdo real do site;
- o cliente **atelier-demo**, só para demonstrar o multi-cliente;
- dois usuários de **desenvolvimento** para entrar no painel.

```
OWNER    admin@dindago.local   / dindago123
EDITOR   editor@dindago.local  / dindago123
```

> ⚠️ Essas credenciais são de desenvolvimento. Antes de publicar, crie um
> usuário real e apague estes.

---

## Como executar

São dois processos. Abra dois terminais:

```bash
npm run dev:api    # API em http://localhost:3333
npm run dev        # site em http://localhost:5173
```

- **Site:** <http://localhost:5173>
- **Painel:** <http://localhost:5173/admin>
- **API:** <http://localhost:3333/api/health>

O Vite faz proxy de `/api` e `/uploads` para o backend, então o navegador vê
tudo na mesma origem — sem CORS e com o cookie de sessão funcionando.

> O site **funciona sem o backend**. Se você rodar só `npm run dev`, a landing
> page aparece completa com o conteúdo local. Só o painel e o formulário
> precisam da API.

Outros comandos:

| Comando              | O que faz                       |
| -------------------- | ------------------------------- |
| `npm run build`      | build do frontend               |
| `npm run build:api`  | build do backend                |
| `npm run lint`       | análise estática                |
| `npm run db:push`    | sincroniza o schema diretamente (útil para SQLite local) |
| `npm run db:migrate` | cria/aplica migrations PostgreSQL |
| `npm run db:seed`    | popula dados de desenvolvimento |
| `npm run db:reset`   | reinicia o banco PostgreSQL     |

---

## API

Formato de resposta, sempre:

```json
{ "success": true,  "data": { } }
{ "success": false, "message": "Peça não encontrada.", "errors": { } }
```

### Público (sem login)

| Método | Rota                      | O que faz                            |
| ------ | ------------------------- | ------------------------------------ |
| `GET`  | `/api/site/:slug`         | conteúdo inteiro de uma landing page |
| `POST` | `/api/site/:slug/contact` | recebe o formulário de contato       |
| `GET`  | `/api/health`             | verificação de saúde                 |

### Autenticação

| Método | Rota               |
| ------ | ------------------ |
| `POST` | `/api/auth/login`  |
| `POST` | `/api/auth/logout` |
| `GET`  | `/api/auth/me`     |
| `POST` | `/api/auth/senha`  |

### Administração (exige sessão)

| Método               | Rota                                                                             |
| -------------------- | -------------------------------------------------------------------------------- |
| `GET` `POST`         | `/api/clients`                                                                   |
| `GET` `PUT` `DELETE` | `/api/clients/:id`                                                               |
| `PUT`                | `/api/clients/:id/settings` · `contact-info` · `hero` · `about` · `process`      |
| `GET` `POST`         | `/api/clients/:id/products` · `benefits` · `gallery` · `testimonials` · `social` |
| `GET` `POST`         | `/api/clients/:id/process-steps` · `hero-facts` · `about-pillars`                |
| `PUT` `DELETE`       | `/api/products/:id` (e o mesmo para as demais coleções)                          |
| `GET`                | `/api/clients/:id/messages`                                                      |
| `PUT` `DELETE`       | `/api/messages/:id/status` · `/api/messages/:id`                                 |
| `POST`               | `/api/upload`                                                                    |

### Permissões

| Perfil   | Pode                                                |
| -------- | --------------------------------------------------- |
| `OWNER`  | tudo, em todos os clientes; criar e apagar clientes |
| `EDITOR` | editar apenas o cliente ao qual está vinculado      |

---

## Segurança

- Senha guardada com **bcrypt** (12 rodadas), nunca em texto puro.
- Sessão em **cookie httpOnly**: o JavaScript da página não lê o token, o que
  fecha a porta para roubo de sessão por XSS.
- **Toda** entrada passa por Zod antes de tocar o banco; campos extras são
  descartados.
- Consultas via Prisma — sem concatenação de SQL.
- **Rate limit**: 8 tentativas de login por 10 min, 10 mensagens por hora,
  600 requisições por 15 min no geral.
- Erros em produção não expõem stack trace nem detalhe interno.
- Upload aceita só imagem, no máximo 8 MB, e o nome do arquivo é sempre gerado
  pelo servidor (nunca o enviado pelo usuário).
- Armadilha anti-robô no formulário, que aceita em silêncio e descarta.

---

## Multi-cliente

Um mesmo código serve várias landing pages. Para publicar outra:

1. No painel, **Novo cliente** (só o perfil OWNER pode).
2. Preencha identidade, cores, capa, contato e as coleções.
3. Na instalação que vai servir esse cliente, ajuste o `.env`:

```env
VITE_CLIENT_SLUG=slug-do-novo-cliente
```

Nenhum componente muda. As cores do cliente repintam o site inteiro, porque
alimentam as mesmas variáveis CSS que o Tailwind usa.

---

## Estrutura do projeto

```text
landing-page-dindago-atelier/
├── backend/                     API, banco e autenticação
│   ├── prisma/
│   │   ├── schema.prisma        modelo de dados (16 tabelas)
│   │   ├── migrations/          histórico do banco
│   │   └── seed.ts              DADOS DE DESENVOLVIMENTO
│   ├── src/
│   │   ├── rotas/               auth, site, clientes, coleções, upload
│   │   ├── schemas/             validação com Zod
│   │   ├── middleware/          sessão, erros, rate limit
│   │   ├── lib/                 respostas, senha, token
│   │   ├── env.ts               configuração validada no boot
│   │   ├── db.ts                cliente do Prisma
│   │   └── app.ts / index.ts    servidor
│   ├── uploads/                 fotografias enviadas pelo painel
│   └── .env.example
├── src/                         frontend
│   ├── components/              seções da landing page
│   ├── admin/                   painel administrativo
│   ├── conteudo/                provider, mescla e ajudantes
│   ├── api/cliente.ts           cliente HTTP
│   ├── data/clientData.ts       conteúdo padrão (fallback da API)
│   ├── lib/theme.ts             cores e SEO dinâmicos
│   └── index.css                paleta, tipografia e texturas
├── public/images/               fotografias reais do ateliê
└── .env.example
```

**Onde mexer no quê**

| Quero...                     | Vou em                                                |
| ---------------------------- | ----------------------------------------------------- |
| mudar o conteúdo do site     | painel `/admin` (ou `clientData.ts` para o padrão)    |
| criar um endpoint            | `backend/src/rotas`                                   |
| mudar uma regra de validação | `backend/src/schemas/index.ts`                        |
| alterar o banco              | `backend/prisma/schema.prisma` + `npm run db:migrate` |
| mexer no visual do site      | `src/components` e `src/index.css`                    |
| mexer no painel              | `src/admin`                                           |

---

## Direção de design

A página é montada como um **catálogo de arte impresso** — não como um site de
blocos empilhados. O que constrói a identidade é a composição, a régua e o
tipo; não há ícone folclórico espalhado nem card com sombra.

### Princípios

| Decisão                        | Por quê                                                                                          |
| ------------------------------ | ------------------------------------------------------------------------------------------------ |
| **Cantos retos em tudo**       | É papel impresso. Não existe `rounded-*` no projeto.                                             |
| **Sem caixa central**          | As seções vão de margem a margem; algumas pranchas sangram até a borda.                          |
| **Grade de impressão visível** | Fios finíssimos marcam as colunas, como a diagramação de uma revista.                            |
| **Numeração de caderno**       | Cada seção abre com `NN — Nome`, e as pranchas levam `fig. NN`.                                  |
| **Desenhos com critério**      | Sol, cactos, pássaros e flor em traço fino ocupam margens e quinas — nunca competem com o texto. |
| **Papel rasgado**              | A transição entre a capa e o caderno seguinte, como na identidade aprovada.                      |

### Cadernos

| Nº    | Seção                    | Composição                                                          |
| ----- | ------------------------ | ------------------------------------------------------------------- |
| 01    | Capa                     | Manchete em degrau + prancha na proporção original da arte          |
| 02    | Diferenciais             | Bento assimétrico com superfícies de tinta, tijolo, barro e papel   |
| 03    | Coleções                 | Mosaico em retrato: duas pranchas grandes alternando o lado         |
| 04    | O artesanato             | Tutorial: pergunta fixa à esquerda + materiais em cartões numerados |
| 05    | Sobre o atelier          | Caderno escuro — o ponto de virada da leitura                       |
| 06    | Nossa história           | Retrato estreito + citação em corpo grande                          |
| 07    | Encomendas               | Quadrantes com numeral em marca-d'água + chamada em sangria         |
| 08–10 | Contato, atelier e redes | Fechamento, com o colofão no rodapé                                 |

A numeração fica nos campos `numero` de `src/data/clientData.ts` e segue a
ordem de `src/App.tsx`. O menu (`nav`) usa a mesma ordem.

### Sistema visual

Tudo vem de tokens em `src/index.css` (bloco `@theme`):

- **Papel** — `papel`, `papel-claro`, `papel-escuro`: creme quente, como o da
  referência impressa.
- **Terra** — `areia`, `barro`, `ocre`, `ambar`.
- **Fogo** — `tijolo`, `tijolo-claro`: o vermelho-tijolo é o acento da marca.
- **Tinta** — `tinta`, `tinta-media`, `tinta-suave`: marrom quente de barro
  queimado, nunca preto. É superfície, não só cor de texto.
- **Cacto** — verde em doses mínimas.

**Tipografia:** Instrument Serif (display, alto contraste) + Archivo (texto).
Títulos usam `clamp()` e entrelinha curta.

**Textura:** `.grao` aplica granulado de papel gerado por SVG, sem requisição de
rede. Em superfícies escuras, `.grao-claro` inverte a mistura.

### Componentes de vocabulário

| Arquivo                 | Papel                                                          |
| ----------------------- | -------------------------------------------------------------- |
| `ui/Catalogo.tsx`       | `Fio`, `Caderno`, `Numeral`, `Xilogravura`                     |
| `ui/Decorations.tsx`    | `Sol`, `Cacto`, `Passaros`, `Flor`, `PapelRasgado`, `Arabesco` |
| `ui/iconMap.ts`         | liga o campo `icon` do clientData ao desenho                   |
| `ui/SmartImage.tsx`     | imagem com prancha de reserva se o arquivo faltar              |
| `ui/Button.tsx`         | `Button` (bloco chapado) e `LinkEditorial` (etiqueta + fio)    |
| `ui/SectionHeading.tsx` | abertura de caderno                                            |
| `ui/Reveal.tsx`         | entrada no scroll, com rede de segurança de 1,5s               |

### Pranchas de imagem

**Nenhuma fotografia fictícia foi usada:** todas as imagens são do atelier.
Se um arquivo faltar ou falhar ao carregar, o lugar dele vira uma prancha de
catálogo (campo de barro, fio de contorno e `fig. NN`) com a mesma proporção —
nunca uma imagem quebrada.

As fotos das peças são verticais, então o mosaico de coleções usa pranchas em
retrato; no diálogo de detalhes a foto aparece inteira, sem corte.

## Configuração do cliente

> **Este é o coração do projeto.** A landing page foi construída como um
> **template reutilizável**: para publicar o site de outro cliente, você altera
> **um único arquivo** — nenhum componente precisa ser reescrito.

### O arquivo único: `src/data/clientData.ts`

Tudo que é do cliente mora ali: nome, textos, peças, galeria, contatos, redes
sociais, cores e SEO.

| Quero mudar...                   | Onde, dentro de `clientData` |
| -------------------------------- | ---------------------------- |
| Nome, slogan, logo               | `company`                    |
| **Cores do site**                | `colors`                     |
| Título e imagem do topo          | `hero`                       |
| Os 5 diferenciais                | `benefits`                   |
| Tutorial de papel-machê          | `tutorial`                   |
| Peças e preços                   | `products`                   |
| Texto da localização             | `mapSection`                 |
| História e dados da artista      | `about`                      |
| Blocos de valores                | `culture`                    |
| Fluxo de encomendas              | `orders`                     |
| Telefone, e-mail, endereço       | `contact`                    |
| Instagram, Facebook              | `social`                     |
| Links e ano do rodapé            | `footer`                     |
| Itens do menu                    | `nav`                        |
| Título e descrição para o Google | `seo`                        |

### As cores mudam o site inteiro

As quatro cores de `colors` são injetadas como variáveis CSS ao carregar a
página (ver `src/lib/theme.ts`). Trocar estes valores repinta tudo:

```ts
colors: {
  primary: '#c89434',    // botões, barra superior, ícones
  secondary: '#a8432a',  // destaques, rodapé, CTA
  accent: '#d4a03c',     // ornamentos e detalhes
  background: '#fdfaf4', // fundo da página
}
```

### Campos ainda não definidos

Enquanto um campo estiver como `INSERIR_ALGUMA_COISA`, **o site não inventa
nada**: o link some, o mapa vira um aviso e o botão passa a levar ao
formulário de contato. Preencheu o valor real, tudo funciona sozinho.

**Preços:** as peças estão com `price: null`, o que exibe _"Consultar valor"_.
Para publicar um preço, troque por um número em reais:

```ts
{ id: 3, name: 'Sanfoneiro', price: 780 /* ... */ }
```

**Depoimentos:** `testimonials` está vazio de propósito — depoimento é palavra
de cliente real, não se inventa. Ao preencher, a seção aparece sozinha.

### Trocando de cliente (checklist)

1. Edite `src/data/clientData.ts` com os dados do novo cliente.
2. Ajuste `colors` com a paleta da nova marca.
3. Troque as imagens em `public/images/` (mesmos nomes, ou ajuste os caminhos).
4. Atualize `<title>` e a meta description no `index.html` (os robôs de busca
   leem o HTML antes do JavaScript rodar).
5. Troque `public/favicon.svg` pela logo do cliente.
6. `npm run build` para conferir.

Nenhum componente em `src/components/` precisa ser tocado.

## Imagens

Coloque as fotografias em `public/images/`, seguindo os nomes descritos em
`public/images/README.md`. Se um arquivo não existir, aparece uma prancha de
reserva no lugar — nunca uma foto genérica nem um ícone de imagem quebrada.

- **Logo:** salve o arquivo em `public/images/logo/` e escreva o caminho em
  `company.logo` no `clientData.ts`. Vazio, o site usa a assinatura tipográfica.
- **Favicon:** `public/favicon.svg` (sol do sertão) e
  `public/apple-touch-icon.png`; troque pela logo quando ela existir.
- **Compartilhamento:** `public/images/hero/og-image.jpg` (1200×630).
- **Peças e galeria:** caminhos em `src/data/clientData.ts`

Exporte em JPG ou WebP com no máximo ~1600px no maior lado, para o site
continuar leve.

---

## Variáveis de ambiente

O site funciona **sem nenhuma variável de ambiente**. As do frontend ficam no
`.env` da raiz; as da API, em `backend/.env`.

```bash
cp .env.example .env      # Linux/macOS
copy .env.example .env    # Windows
```

| Variável           | Para que serve                                                  |
| ------------------ | --------------------------------------------------------------- |
| `VITE_API_URL`     | endereço da API quando ela não está no mesmo domínio (produção) |
| `VITE_CLIENT_SLUG` | qual cliente o site exibe (padrão: `dindago-atelier`)           |
| `VITE_SEM_API`     | `true` para publicar só o site, sem backend (ver abaixo)        |

> ⚠️ **O `.env` nunca vai para o GitHub** — ele está no `.gitignore`. Só o
> `.env.example` é versionado, e ele não contém valores reais.
>
> No Vite, tudo que tem prefixo `VITE_` fica **visível no navegador**. Nunca
> coloque senha, chave privada ou token secreto nessas variáveis.

---

## Publicação gratuita

Depois do build, o site é um conjunto de arquivos estáticos: qualquer
hospedagem gratuita de sites estáticos serve (Vercel, Netlify, Cloudflare
Pages).

1. Na hospedagem, configure o comando de build `npm run build`, a pasta de
   saída `dist` e Node 20.19 ou maior.
2. Sem backend publicado, defina a variável `VITE_SEM_API=true`. O site mostra
   o conteúdo de `src/data/clientData.ts` e o formulário monta a mensagem no
   WhatsApp ou no e-mail do atelier.
3. Com a API publicada em outro endereço, defina `VITE_API_URL` (ex.:
   `https://api.seudominio.com.br/api`) e, no `backend/.env`, `CORS_ORIGIN`
   com o endereço do site.
4. Troque `https://dindagoatelier.com.br/` no `index.html` e em `seo.url` pelo
   endereço final, e deixe `og:image` com o endereço absoluto da imagem.

> O painel `/admin` só funciona com a API. Em hospedagem estática, a rota
> `/admin` também precisa de uma regra de rewrite para `index.html`.

---

## Desenvolvimento em equipe

### Regra principal

> **Ninguém trabalha direto na `main`.**
> Cada pessoa cria a própria branch, desenvolve, envia e abre um Pull Request.

O fluxo é sempre este:

```text
main
 ↓  cada dev cria sua branch
feature/minha-alteracao
 ↓  desenvolve
 ↓  git add + git commit
 ↓  git push
Pull Request
 ↓  revisão de outro integrante
merge na main
```

### Começando (novo integrante)

```bash
git clone https://github.com/Pedro-prog777/landing-page-dindago-atelier.git
cd landing-page-dindago-atelier
git checkout main
git pull origin main

npm install                            # frontend + backend
cp .env.example .env                   # variáveis do frontend
cp backend/.env.example backend/.env   # variáveis do backend
npm run db:migrate                     # cria o banco
npm run db:seed                        # popula dados de desenvolvimento

npm run dev:api                        # terminal 1 — API
npm run dev                            # terminal 2 — site
```

Pronto: site em <http://localhost:5173> e painel em
<http://localhost:5173/admin>.

> Depois de um `git pull` que traga mudanças no `schema.prisma`, rode
> `npm run db:migrate` para atualizar o seu banco local.

### Trabalhando em uma alteração

**1. Atualize a main antes de começar** (evita conflito depois):

```bash
git checkout main
git pull origin main
```

**2. Crie sua branch** a partir da main atualizada:

```bash
git checkout -b feature/minha-alteracao
```

**3. Desenvolva e salve seu trabalho:**

```bash
git status                                  # veja o que mudou
git add .                                   # marque as alterações
git commit -m "feat: minha alteração"       # salve no histórico local
```

**4. Envie para o GitHub:**

```bash
git push -u origin feature/minha-alteracao
```

> O `-u` só é necessário no **primeiro** push da branch. Depois, basta
> `git push`.

**5. Abra o Pull Request** no GitHub (o site mostra um botão
_"Compare & pull request"_ logo após o push) e peça a revisão de alguém.

**6. Depois que o PR for aprovado e mesclado,** volte para a main e atualize:

```bash
git checkout main
git pull origin main
git branch -d feature/minha-alteracao       # apaga a branch local já mesclada
```

### Atualizando sua branch com o que mudou na main

Se a `main` recebeu alterações enquanto você trabalhava:

```bash
git checkout main
git pull origin main
git checkout feature/minha-alteracao
git merge main
```

Resolva eventuais conflitos, faça `git commit` e siga com `git push`.

### Nomes de branch

| Prefixo    | Quando usar             | Exemplo                       |
| ---------- | ----------------------- | ----------------------------- |
| `feature/` | funcionalidade nova     | `feature/secao-depoimentos`   |
| `fix/`     | correção de erro        | `fix/menu-mobile`             |
| `style/`   | ajuste visual           | `style/espacamento-hero`      |
| `docs/`    | documentação            | `docs/atualiza-readme`        |
| `chore/`   | configuração/manutenção | `chore/atualiza-dependencias` |

Use letras minúsculas, sem acento e com hífen no lugar do espaço.

---

## Padrão de commits

Toda mensagem começa com o tipo da alteração:

```text
feat:     nova funcionalidade
fix:      correção de erro
style:    alteração visual
refactor: refatoração
docs:     documentação
chore:    configuração/manutenção
```

Exemplos:

```bash
git commit -m "feat: adiciona seção sobre a empresa"
git commit -m "style: melhora responsividade da landing page"
git commit -m "fix: corrige menu mobile"
git commit -m "docs: atualiza instruções de instalação"
```

Escreva em português, no presente e de forma direta. Um commit deve conter
**uma** alteração com sentido próprio — nada de "várias coisas" no mesmo
commit.

---

## Fluxo de Pull Request

1. Faça o push da sua branch.
2. No GitHub, abra o Pull Request de `sua-branch` → `main`.
3. Preencha o modelo (ele aparece sozinho) explicando o que foi feito.
4. Peça revisão de outro integrante.
5. Só faça o merge depois da aprovação.
6. Após o merge, apague a branch no GitHub (há um botão para isso).

Antes de abrir o PR, confira:

```bash
npm run build     # precisa terminar sem erro
npm run lint      # precisa terminar sem erro
```

---

## Comandos Git do dia a dia

| Comando                | O que faz                                    |
| ---------------------- | -------------------------------------------- |
| `git status`           | mostra o que mudou e em que branch você está |
| `git branch`           | lista as branches locais                     |
| `git checkout main`    | muda para a branch `main`                    |
| `git checkout -b nome` | cria uma branch nova e já muda para ela      |
| `git pull origin main` | traz as novidades do GitHub                  |
| `git add .`            | marca todas as alterações para o commit      |
| `git commit -m "..."`  | salva as alterações no histórico local       |
| `git push`             | envia os commits para o GitHub               |
| `git log --oneline -5` | mostra os 5 últimos commits                  |
| `git remote -v`        | mostra o endereço do repositório remoto      |

---

## Problemas comuns

**"Já commitei na `main` sem querer."**
Ainda não deu push? Leve o commit para uma branch nova:

```bash
git branch feature/minha-alteracao   # guarda o commit em uma branch
git reset --hard origin/main         # volta a main ao estado do GitHub
git checkout feature/minha-alteracao
```

**"Meu `git push` foi recusado (`rejected`)."**
Alguém enviou algo antes de você. Traga as novidades e envie de novo:

```bash
git pull origin main
git push
```

**"Apareceu conflito."**
O Git marca o trecho com `<<<<<<<` e `>>>>>>>` no arquivo. Escolha a versão
correta, apague as marcações, salve e então:

```bash
git add .
git commit -m "fix: resolve conflito de merge"
```

**"O site não abre depois do `git pull`."**
Alguém adicionou uma dependência nova:

```bash
npm install
```

**"Commitei um arquivo que não devia."**
Remova do controle de versão mantendo o arquivo no seu computador:

```bash
git rm --cached caminho/do/arquivo
git commit -m "chore: remove arquivo do versionamento"
```

Se for um **segredo** (token, senha, chave), avise a equipe: além de remover,
ele precisa ser **revogado e trocado**, pois continua no histórico do Git.

---

## Acessibilidade e responsividade

O que já está garantido e precisa ser mantido nas próximas alterações:

- HTML semântico, um único `h1` e hierarquia de títulos sem saltos.
- Todas as imagens com `alt`, todos os campos com `label`, foco sempre visível
  e link "Ir para o conteúdo" no primeiro `Tab`.
- Diálogos (busca e detalhes da peça) fecham com `Esc`, prendem o foco e o
  devolvem ao elemento de origem; o detalhe da peça navega com as setas.
- Sem rolagem horizontal em 320, 375, 390, 414, 430, 768, 834, 1024, 1280,
  1440 e 1920px (verificado no navegador).
- Botões principais com área de toque de 44px; campos com 16px no celular
  (o iPhone não dá zoom ao focar).
- Texto de apoio em `tinta-media` ou `tinta-suave` sobre papel, acima de
  4,5:1 de contraste. Evite rótulos em `text-tinta/40` ou mais claros.
- Animações respeitam `prefers-reduced-motion`.
