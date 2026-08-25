# Dindagó Atelier — Landing Page

Site institucional do **Dindagó Atelier**, ateliê de artesanato autoral em
papel-machê.

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
- [Configuração do site (dados do cliente)](#configuração-do-site-dados-do-cliente)
- [Imagens](#imagens)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Desenvolvimento em equipe](#desenvolvimento-em-equipe)
- [Padrão de commits](#padrão-de-commits)
- [Fluxo de Pull Request](#fluxo-de-pull-request)
- [Comandos Git do dia a dia](#comandos-git-do-dia-a-dia)
- [Problemas comuns](#problemas-comuns)
- [Acessibilidade e responsividade](#acessibilidade-e-responsividade)

---

## Tecnologias

| Ferramenta | Para que serve |
| --- | --- |
| [React 19](https://react.dev) | biblioteca de interface |
| [TypeScript](https://www.typescriptlang.org) | JavaScript com tipagem |
| [Vite](https://vite.dev) | servidor de desenvolvimento e build |
| [Tailwind CSS v4](https://tailwindcss.com) | estilização por classes utilitárias |
| [lucide-react](https://lucide.dev) | ícones |
| [oxlint](https://oxc.rs) | análise estática do código |
| Google Fonts | tipografias Fraunces e Karla |

Não há back-end: o site é estático e pode ser publicado em Vercel, Netlify,
GitHub Pages ou qualquer hospedagem de arquivos.

---

## Pré-requisitos

Cada integrante precisa instalar na própria máquina:

| Programa | Versão | Onde baixar |
| --- | --- | --- |
| **Git** | 2.40+ | <https://git-scm.com/downloads> |
| **Node.js** | 20.19+ (recomendado 24) | <https://nodejs.org> |
| **npm** | 10+ (vem junto com o Node) | — |
| **VS Code** | atual | <https://code.visualstudio.com> |
| **Conta no GitHub** | — | <https://github.com> |

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

Isso baixa as dependências para a pasta `node_modules/`, que **não** vai para o
GitHub — cada pessoa gera a sua.

---

## Como executar

```bash
npm run dev
```

Abra <http://localhost:5173>. A página recarrega sozinha a cada alteração
salva.

Outros comandos:

| Comando | O que faz |
| --- | --- |
| `npm run dev` | ambiente de desenvolvimento |
| `npm run build` | gera a versão de produção em `dist/` |
| `npm run preview` | visualiza localmente o resultado do build |
| `npm run lint` | verifica problemas no código |

> Rode `npm run build` e `npm run lint` **antes de abrir um Pull Request**.

---

## Estrutura do projeto

```text
landing-page-dindago-atelier/
├── public/
│   ├── favicon.svg              ícone da aba (substituir pela logo real)
│   └── images/                  fotografias do ateliê
│       ├── logo/  hero/  products/  artist/  gallery/
├── src/
│   ├── components/              seções da página
│   │   ├── Header.tsx  Hero.tsx  ValuesSection.tsx  ProcessSection.tsx
│   │   ├── FeaturedPieces.tsx  Gallery.tsx  AboutArtist.tsx
│   │   ├── CultureSection.tsx  OrdersSection.tsx  ContactSection.tsx
│   │   ├── MapSection.tsx  SocialSection.tsx  Footer.tsx
│   │   ├── WhatsAppButton.tsx  Lightbox.tsx  SearchDialog.tsx
│   │   ├── ProductCard.tsx  ProductDialog.tsx  Logo.tsx
│   │   └── ui/                  peças reutilizáveis
│   │       └── Button.tsx  Reveal.tsx  SmartImage.tsx
│   │           SectionHeading.tsx  BrandIcons.tsx
│   ├── config/site.ts           ← DADOS DO CLIENTE (WhatsApp, e-mail, endereço)
│   ├── data/                    peças, galeria e índice de busca
│   ├── hooks/                   scroll, seção ativa e diálogos
│   ├── App.tsx                  ordem das seções da página
│   ├── main.tsx                 ponto de entrada
│   └── index.css                paleta, tipografia e animações
├── .env.example                 modelo de variáveis de ambiente
├── .gitignore                   o que não vai para o GitHub
├── .gitattributes               padroniza quebras de linha entre sistemas
├── index.html                   HTML base, título e metatags de SEO
└── package.json                 dependências e scripts
```

**Uma seção = um arquivo.** Ao criar uma seção nova, crie um componente em
`src/components/` e adicione-o em `src/App.tsx`.

---

## Configuração do site (dados do cliente)

Todos os dados comerciais ficam em **um único arquivo**: `src/config/site.ts`.
Nunca escreva telefone, e-mail ou endereço direto em um componente.

| Campo | Onde aparece |
| --- | --- |
| `WHATSAPP_NUMBER` | botão flutuante, header, cards, encomendas, rodapé |
| `whatsappDisplay` | número como é exibido, ex.: `(81) 99999-9999` |
| `email` | seção de contato e rodapé |
| `instagram` / `facebook` | header, redes sociais e rodapé |
| `ATELIER_ADDRESS` | seção "Visite o Dindagó Atelier", mapa e rodapé |
| `artistConfig.name` | assinatura da citação em "Nossa História" |

Enquanto um campo estiver como `INSERIR_...`, **o site não inventa nada**: o
link some ou vira um aviso discreto e o botão leva ao formulário de contato.
Preencheu o valor real, tudo passa a funcionar sozinho.

**Preços:** as peças estão com `price: null`, o que exibe *"Consultar valor"*.
Para publicar um preço, troque por um número em reais em `src/data/products.ts`:

```ts
{ id: 3, name: 'Sanfoneiro', price: 780 /* ... */ }
```

---

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
git clone https://github.com/USUARIO/landing-page-dindago-atelier.git
cd landing-page-dindago-atelier
git checkout main
git pull origin main
npm install
npm run dev
```

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
*"Compare & pull request"* logo após o push) e peça a revisão de alguém.

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

| Prefixo | Quando usar | Exemplo |
| --- | --- | --- |
| `feature/` | funcionalidade nova | `feature/secao-depoimentos` |
| `fix/` | correção de erro | `fix/menu-mobile` |
| `style/` | ajuste visual | `style/espacamento-hero` |
| `docs/` | documentação | `docs/atualiza-readme` |
| `chore/` | configuração/manutenção | `chore/atualiza-dependencias` |

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

| Comando | O que faz |
| --- | --- |
| `git status` | mostra o que mudou e em que branch você está |
| `git branch` | lista as branches locais |
| `git checkout main` | muda para a branch `main` |
| `git checkout -b nome` | cria uma branch nova e já muda para ela |
| `git pull origin main` | traz as novidades do GitHub |
| `git add .` | marca todas as alterações para o commit |
| `git commit -m "..."` | salva as alterações no histórico local |
| `git push` | envia os commits para o GitHub |
| `git log --oneline -5` | mostra os 5 últimos commits |
| `git remote -v` | mostra o endereço do repositório remoto |

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
