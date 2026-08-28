# Dindagó Atelier — Aplicação Full Stack

Landing page do **Dindagó Atelier** com backend, banco de dados, API e painel
administrativo. O mesmo código serve **vários clientes**: cada um tem seus
textos, cores, peças e contatos.

A página apresenta a artista, o processo de criação das peças, a galeria de
obras e os canais para encomendas e contato. A proposta **não é uma loja
virtual**: é um portfólio digital que transmite arte, cultura, memória,
sustentabilidade, trabalho manual e identidade nordestina.

---

## Sumário

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
              Banco (SQLite / Postgres)
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
| Google Fonts                                 | tipografias Fraunces e Karla        |

Não há back-end: o site é estático e pode ser publicado em Vercel, Netlify,
GitHub Pages ou qualquer hospedagem de arquivos.

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

### Criar o banco e popular

```bash
npm run db:migrate   # cria o banco e aplica as migrations
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
| `npm run db:migrate` | cria/aplica migrations          |
| `npm run db:seed`    | popula dados de desenvolvimento |
| `npm run db:reset`   | apaga o banco e recria do zero  |

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

| Nº    | Seção                    | Composição                                                        |
| ----- | ------------------------ | ----------------------------------------------------------------- |
| 01    | Capa                     | Manchete em degrau + prancha em sangria total                     |
| 02    | Diferenciais             | Bento assimétrico com superfícies de tinta, tijolo, barro e papel |
| 03    | O artesanato             | Ensaio em duas colunas com capitular + etapas em faixa de seis    |
| 04    | Coleções                 | Espelho de pranchas em proporções e alturas diferentes            |
| 05    | Galeria                  | Mosaico com lightbox                                              |
| 06    | Nossa história           | Retrato estreito + citação em corpo grande                        |
| 07    | Sobre o atelier          | Caderno escuro — o ponto de virada da leitura                     |
| 08    | Encomendas               | Quadrantes com numeral em marca-d'água + chamada em sangria       |
| 09–11 | Contato, atelier e redes | Fechamento, com o colofão no rodapé                               |

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
| `ui/SmartImage.tsx`     | prancha de catálogo (ver abaixo)                               |
| `ui/Button.tsx`         | `Button` (bloco chapado) e `LinkEditorial` (etiqueta + fio)    |
| `ui/SectionHeading.tsx` | abertura de caderno                                            |
| `ui/Reveal.tsx`         | entrada no scroll, com rede de segurança de 1,5s               |

### Pranchas de imagem

**Nenhuma fotografia fictícia foi usada.** Onde entra imagem real existe uma
prancha de catálogo: campo chapado de barro, fio de contorno, numeração
`fig. NN` e a descrição do que vai ali.

Cada prancha já tem a **proporção, posição, sangria e o hover** da fotografia
definitiva. Ao colocar o arquivo em `public/images/`, ele ocupa exatamente
aquele lugar — nada se desloca.

> Enquanto as fotos não chegam, a página mostra vários campos de barro vazios.
> É proposital: o espaço está reservado, não preenchido com imagem genérica.

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
| Etapas do processo               | `process`                    |
| Peças e preços                   | `products`                   |
| Fotos da galeria                 | `gallery`                    |
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
`public/images/README.md`. Enquanto o arquivo não existir, aparece um marcador
identificado no lugar — nunca uma foto genérica.

- **Logo:** `public/images/logo/dindago-atelier.svg`
- **Favicon:** substitua `public/favicon.svg`
- **Peças e galeria:** caminhos em `src/data/products.ts` e `src/data/gallery.ts`

Exporte em JPG ou WebP com no máximo ~1600px no maior lado, para o site
continuar leve.

---

## Variáveis de ambiente

O projeto funciona **sem nenhuma variável de ambiente**. Elas existem para
integrações futuras (formulário, analytics).

```bash
cp .env.example .env      # Linux/macOS
copy .env.example .env    # Windows
```

Preencha o `.env` com seus valores locais.

> ⚠️ **O `.env` nunca vai para o GitHub** — ele está no `.gitignore`. Só o
> `.env.example` é versionado, e ele não contém valores reais.
>
> No Vite, tudo que tem prefixo `VITE_` fica **visível no navegador**. Nunca
> coloque senha, chave privada ou token secreto nessas variáveis.

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
- Todas as imagens com `alt`, todos os campos com `label`, foco sempre visível.
- Diálogos (busca, detalhes da peça e galeria) fecham com `Esc`, prendem o foco
  e o devolvem ao elemento de origem; a galeria navega com as setas.
- Sem rolagem horizontal em 360, 390, 430, 768, 1024, 1440 e 1920px.
- Animações respeitam `prefers-reduced-motion`.
- Contraste de 7:1 no texto e 12,8:1 nos títulos.
