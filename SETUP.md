# SETUP — Dindagó Atelier

Guia de instalação do zero, para quem nunca configurou este projeto.

Todos os comandos abaixo foram executados e verificados numa simulação de
máquina nova: clone limpo do GitHub, cache do npm apagado e banco PostgreSQL
recém-criado.

**Windows/PowerShell é o caminho principal.** Onde Linux e macOS diferem, há
uma seção separada no final.

---

## O que este projeto usa

Descoberto a partir dos arquivos do repositório, não de suposição.

| Camada          | Tecnologia             | Versão                    |
| --------------- | ---------------------- | ------------------------- |
| Linguagem       | TypeScript             | 6.0.3                     |
| Frontend        | React                  | 19.2.8                    |
| Build           | Vite                   | 8.2.2                     |
| Estilo          | Tailwind CSS           | 4.3.3                     |
| Ícones          | lucide-react           | 1.34.0                    |
| Rotas (front)   | react-router-dom       | 7.18.2                    |
| Backend         | Express                | 5.2.1                     |
| ORM             | Prisma                 | 7.10.0                    |
| Driver do banco | pg (JavaScript puro)   | 8.23.0                    |
| Validação       | Zod                    | 4.5.2                     |
| Senhas          | bcryptjs               | 3.0.3                     |
| Sessão          | jsonwebtoken em cookie | 9.0.3                     |
| Banco           | **PostgreSQL**         | 16+                       |
| Runtime         | Node.js                | 20.19+ (`.nvmrc` pede 24) |
| Gerenciador     | npm (workspaces)       | 10+                       |
| Lint            | oxlint                 | 1.79.0                    |

**Não são usados:** Python, Java/JDK, Docker, pnpm, yarn. Não existem
`requirements.txt`, `pyproject.toml`, `pom.xml`, `build.gradle`, `Dockerfile`
nem `docker-compose.yml` neste repositório.

Nenhum serviço externo é chamado. Não há chave de API de terceiros.

### Portas

| Porta | Quem usa             | Onde muda                |
| ----- | -------------------- | ------------------------ |
| 5173  | Vite (site e painel) | `vite.config.ts`         |
| 3333  | API Express          | `PORT` no `backend/.env` |
| 5432  | PostgreSQL (padrão)  | definido ao instalar     |

---

## SOFTWARES NECESSÁRIOS

- [x] **Git**
- [x] **Node.js 20.19+** (traz o npm junto)
- [x] **PostgreSQL 16+**
- [ ] ~~Python~~ — não usado
- [ ] ~~Java/JDK~~ — não usado
- [ ] ~~Docker~~ — não usado
- [ ] ~~pnpm / yarn~~ — o projeto usa npm

São **três** programas. Nada além disso.

---

# PARTE 1 — Preparar a máquina

## 1.1 Instalar o Git

**COMANDO**

```powershell
winget install --id Git.Git -e --source winget
```

**O QUE FAZ:** instala o Git. Se preferir, baixe de
<https://git-scm.com/downloads> e instale clicando.

**RESULTADO ESPERADO:** ao final, `Successfully installed`.
**Feche e abra o terminal** para o `git` entrar no PATH.

---

## 1.2 Instalar o Node.js

**COMANDO**

```powershell
winget install --id OpenJS.NodeJS.LTS -e --source winget
```

**O QUE FAZ:** instala o Node.js e o npm juntos. Alternativa:
<https://nodejs.org> (baixe a versão LTS).

**RESULTADO ESPERADO:** `Successfully installed`. Feche e abra o terminal.

---

## 1.3 Instalar o PostgreSQL

**COMANDO**

```powershell
winget install --id PostgreSQL.PostgreSQL.18 -e --source winget
```

**O QUE FAZ:** instala o servidor PostgreSQL e o pgAdmin.

Se preferir o instalador gráfico:
<https://www.postgresql.org/download/windows/>

> **DUAS TELAS IMPORTAM:**
>
> 1. A que pede a **senha** do usuário `postgres`. **Anote.** Sem ela nada
>    funciona, e recuperar depois dá bastante trabalho.
> 2. A que mostra a **porta**. O padrão é `5432`; se já houver outro PostgreSQL
>    na máquina, o instalador sugere `5433`. **Anote qual apareceu.**

**RESULTADO ESPERADO:** o serviço fica rodando sozinho depois da instalação.

---

## 1.4 Conferir as três instalações

**COMANDO**

```powershell
git --version
node --version
npm --version
Get-Service postgresql*
```

**O QUE FAZ:** confirma que tudo entrou no PATH e que o banco está no ar.

**RESULTADO ESPERADO:**

```
git version 2.x.x
v24.x.x          (precisa ser 20.19 ou maior)
10.x.x
Status: Running
```

Se algum não responder, feche e abra o terminal. Se ainda faltar, reinstale
aquele item.

---

## 1.5 Descobrir a porta do PostgreSQL

**COMANDO**

```powershell
Get-NetTCPConnection -State Listen | Where-Object LocalPort -in 5432,5433 | Select-Object LocalPort -Unique
```

**O QUE FAZ:** mostra em qual porta o PostgreSQL está escutando.

**RESULTADO ESPERADO:** `5432` ou `5433`. **Anote** — vai no `.env` no passo
3.2.

---

## 1.6 Liberar a execução de scripts

**COMANDO**

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned -Force
```

**O QUE FAZ:** o npm no Windows usa scripts `.ps1` (`npm.ps1`, `vite.ps1`).
Sem isto o PowerShell recusa e aparece **"o arquivo não reside em uma pasta
confiável"**.

**RESULTADO ESPERADO:** nenhuma saída. Confira com:

```powershell
Get-ExecutionPolicy -Scope CurrentUser
```

Precisa responder `RemoteSigned`.

---

## 1.7 Configurar sua identidade no Git

**COMANDO**

```powershell
git config --global user.name "Seu Nome"
git config --global user.email "seu-email@exemplo.com"
```

**O QUE FAZ:** define o autor dos seus commits. Só na primeira vez.

**RESULTADO ESPERADO:** nenhuma saída. Confira com `git config --global --list`.

---

# PARTE 2 — Clonar e instalar

## 2.1 Clonar o repositório

**COMANDO**

```powershell
New-Item -ItemType Directory -Force C:\dev | Out-Null
Set-Location C:\dev
git clone https://github.com/Pedro-prog777/landing-page-dindago-atelier.git
Set-Location C:\dev\landing-page-dindago-atelier
```

**O QUE FAZ:** baixa o projeto para `C:\dev`.

> **Não clone dentro do OneDrive.** O OneDrive tenta sincronizar as dezenas de
> milhares de arquivos do `node_modules`, trava arquivos durante a instalação
> (`EBUSY`, `EPERM`) e marca tudo como vindo da internet — a origem do erro de
> "pasta não confiável".

**RESULTADO ESPERADO:** `Cloning into 'landing-page-dindago-atelier'...`
seguido de `Resolving deltas: 100%`.

---

## 2.2 Desmarcar os arquivos baixados

**COMANDO**

```powershell
Get-ChildItem -Recurse -File | Unblock-File
```

**O QUE FAZ:** remove a marca de "arquivo vindo da internet" que o Windows
aplica em downloads.

**RESULTADO ESPERADO:** nenhuma saída.

---

## 2.3 Instalar as dependências

**COMANDO**

```powershell
npm install
```

**O QUE FAZ:** instala site e API de uma vez — são npm workspaces. Ao final, o
`postinstall` gera o cliente do Prisma automaticamente.

**RESULTADO ESPERADO:**

```
added 319 packages, and audited 321 packages in 51s
```

O número pode variar um pouco. **Não deve aparecer `node-gyp`, `gyp ERR!` nem
pedido de Visual Studio** — nenhuma dependência deste projeto compila código
nativo.

---

# PARTE 3 — Configurar

## 3.1 Criar o banco

**COMANDO** (troque `SUA_SENHA`; ajuste a porta se for 5433)

```powershell
$env:PGPASSWORD = "SUA_SENHA"
& "$env:ProgramFiles\PostgreSQL\18\bin\psql.exe" -h localhost -p 5432 -U postgres -c "CREATE DATABASE dindago;"
```

**O QUE FAZ:** cria o banco `dindago`, vazio.

Se a sua versão do PostgreSQL não for a 18, ajuste o número no caminho.

**RESULTADO ESPERADO:** `CREATE DATABASE`.
Se disser `already exists`, tudo bem — pode seguir.

**ALTERNATIVA pelo pgAdmin**, que veio junto com o PostgreSQL:
**Databases** → botão direito → **Create** → **Database** → nome `dindago`.

---

## 3.2 Criar os arquivos de ambiente

**COMANDO**

```powershell
Copy-Item .env.example .env
Copy-Item backend\.env.example backend\.env
notepad backend\.env
```

**O QUE FAZ:** cria as duas configurações locais e abre a do backend para
edição.

**AJUSTE UMA LINHA** — sua senha e sua porta:

```
DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/dindago?schema=public"
```

Salve e feche.

> Se a sua senha tiver `@`, `:`, `/` ou `#`, ela precisa ser codificada:
> `@` vira `%40`, `:` vira `%3A`, `/` vira `%2F`, `#` vira `%23`.
> Mais simples é usar senha só com letras e números.

**O `.env` da raiz não precisa de ajuste** — os valores padrão já funcionam.

**RESULTADO ESPERADO:** os dois arquivos existem. Eles nunca vão para o
GitHub; cada pessoa tem os seus.

### Variáveis, uma a uma

**`.env` da raiz (frontend)**

| Variável           | Obrigatória | De onde vem                                                                                                                                 |
| ------------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `VITE_API_URL`     | não         | Deixe comentada em desenvolvimento: o Vite faz proxy de `/api` para a porta 3333. Só preencha ao publicar o site, com a URL pública da API. |
| `VITE_CLIENT_SLUG` | sim         | Qual cliente o site exibe. Precisa bater com o `slug` cadastrado no banco. O seed cria `dindago-atelier`.                                   |

> Só variáveis com prefixo `VITE_` chegam ao navegador. **Nunca coloque senha
> ou chave aqui** — o conteúdo vai junto no pacote entregue ao visitante.

**`backend/.env`**

| Variável              | Obrigatória | De onde vem                                                                                                                                                     |
| --------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DATABASE_URL`        | **sim**     | Você monta: usuário `postgres`, a senha definida ao instalar, a porta do passo 1.5 e o banco `dindago`.                                                         |
| `JWT_SECRET`          | **sim**     | Assina o cookie de sessão. **Mínimo 32 caracteres** — o backend não sobe se for menor. O valor do exemplo serve para desenvolvimento; em produção gere um novo. |
| `PORT`                | não         | Porta da API. Padrão 3333.                                                                                                                                      |
| `CORS_ORIGIN`         | não         | Padrão `http://localhost:5173`.                                                                                                                                 |
| `NODE_ENV`            | não         | Padrão `development`.                                                                                                                                           |
| `SEED_ADMIN_EMAIL`    | não         | Só o seed usa, para criar o administrador de desenvolvimento.                                                                                                   |
| `SEED_ADMIN_PASSWORD` | não         | Idem. **Não use em produção.**                                                                                                                                  |

Para gerar um `JWT_SECRET` novo:

```powershell
[Convert]::ToBase64String((1..48 | ForEach-Object { Get-Random -Max 256 }))
```

---

## 3.3 Criar as tabelas

**COMANDO**

```powershell
npm run db:migrate
```

**O QUE FAZ:** aplica a migration e cria as 16 tabelas no banco `dindago`.

**RESULTADO ESPERADO:**

```
Applying migration `20260829000000_inicial_postgresql`
The following migration(s) have been applied:
Your database is now in sync with your schema.
```

Se aparecer `P1001: Can't reach database server`, o PostgreSQL não está rodando
ou a porta no `.env` está errada. Volte ao passo 1.5.

---

## 3.4 Popular com conteúdo

**COMANDO**

```powershell
npm run db:seed
```

**O QUE FAZ:** insere o conteúdo do site e cria dois usuários do painel.

**RESULTADO ESPERADO:**

```
Clientes:
  dindago-atelier (conteúdo real do atelier)
  atelier-demo (demonstração de multi-cliente)

Acesso ao painel (SOMENTE DESENVOLVIMENTO):
  OWNER   admin@dindago.local / dindago123
  EDITOR  editor@dindago.local / dindago123
```

---

# PARTE 4 — Executar

São **dois processos**, então **dois terminais**, ambos em
`C:\dev\landing-page-dindago-atelier`.

## 4.1 Terminal 1 — a API (backend)

**COMANDO**

```powershell
npm run dev:api
```

**RESULTADO ESPERADO:**

```
API do Dindagó em http://localhost:3333
Ambiente: development
```

## 4.2 Terminal 2 — o site (frontend)

**COMANDO**

```powershell
npm run dev
```

**RESULTADO ESPERADO:**

```
  ➜  Local:   http://localhost:5173/
```

Deixe os dois rodando enquanto trabalha.

## 4.3 Abrir

| O quê  | Endereço                         |
| ------ | -------------------------------- |
| Site   | http://localhost:5173            |
| Painel | http://localhost:5173/admin      |
| API    | http://localhost:3333/api/health |

**Login do painel** (desenvolvimento):

```
admin@dindago.local    /  dindago123     (vê todos os clientes)
editor@dindago.local   /  dindago123     (só o Dindagó)
```

---

## 4.4 Confirmar que funcionou

Num terceiro terminal:

```powershell
curl.exe -s -o NUL -w "site  %{http_code}\n" http://localhost:5173
curl.exe -s -o NUL -w "api   %{http_code}\n" http://localhost:3333/api/health
curl.exe -s -o NUL -w "proxy %{http_code}\n" http://localhost:5173/api/health
```

**RESULTADO ESPERADO:** `200` nas três linhas. A terceira é a mais importante:
prova que o site consegue falar com a API.

Confira também, no navegador:

1. O site abre com o título grande "Arte que nasce da memória..."
2. O painel aceita o login acima
3. Na aba **Peças** aparecem 4 peças, todas com "Consultar valor"

---

# PARTE 5 — Trabalhar com Git

## 5.1 Antes de começar, atualize

```powershell
git checkout main
git pull origin main
npm install
```

O `npm install` só é necessário quando alguém mudou dependências, mas rodar
sempre não faz mal. Se alguém mudou o banco, rode também `npm run db:migrate`.

## 5.2 Ver o que você alterou

```powershell
git status
```

Mostra arquivos modificados e os que estão prontos para commit.

## 5.3 Criar uma branch

```powershell
git checkout -b feature/nome-do-que-vou-fazer
```

| Prefixo    | Quando              |
| ---------- | ------------------- |
| `feature/` | funcionalidade nova |
| `fix/`     | correção            |
| `style/`   | ajuste visual       |
| `docs/`    | documentação        |

## 5.4 Salvar o trabalho

```powershell
git add .
git commit -m "feat: descrição do que fiz"
```

Prefixos de commit: `feat:`, `fix:`, `style:`, `refactor:`, `docs:`, `chore:`.

## 5.5 Enviar para o GitHub

```powershell
git push -u origin feature/nome-do-que-vou-fazer
```

O `-u` só no primeiro push da branch. Depois, só `git push`.

## 5.6 Abrir o Pull Request

No GitHub aparece um botão **Compare & pull request**. Descreva o que fez e
peça revisão. **Ninguém envia direto para a `main`.**

Antes de abrir o PR, os dois precisam passar:

```powershell
npm run build
npm run lint
```

## 5.7 Atualizar de novo

```powershell
git checkout main
git pull origin main
```

Se o `git push` for recusado porque alguém enviou antes:

```powershell
git pull origin main
git push
```

---

# Banco de dados — referência

| Item          | Valor                                                         |
| ------------- | ------------------------------------------------------------- |
| Sistema       | PostgreSQL 16+                                                |
| Nome do banco | `dindago`                                                     |
| Usuário       | `postgres` (o padrão da instalação)                           |
| Porta         | 5432, ou o que apareceu no passo 1.5                          |
| Tabelas       | 16                                                            |
| Migration     | `backend/prisma/migrations/20260829000000_inicial_postgresql` |
| Schema        | `backend/prisma/schema.prisma`                                |

### Tabelas

`User`, `Client`, `ClientSettings`, `ContactInfo`, `HeroContent`, `HeroFact`,
`AboutContent`, `AboutPillar`, `ProcessContent`, `ProcessStep`, `Product`,
`Benefit`, `GalleryItem`, `Testimonial`, `SocialLink`, `ContactMessage`.

Tudo pendura em `Client` com `onDelete: Cascade` — apagar um cliente leva junto
o conteúdo dele.

### Comandos do banco

```powershell
npm run db:migrate    # aplica migrations pendentes
npm run db:seed       # popula com conteúdo de desenvolvimento
npm run db:reset      # APAGA tudo e recria (só a sua máquina)
```

Ver o banco pelo navegador:

```powershell
npm run prisma:studio --workspace @dindago/backend
```

Testar a conexão sem subir a aplicação:

```powershell
$env:PGPASSWORD = "SUA_SENHA"
& "$env:ProgramFiles\PostgreSQL\18\bin\psql.exe" -h localhost -p 5432 -U postgres -d dindago -c "\dt"
```

Deve listar as 16 tabelas.

> **Por que cada pessoa tem o próprio banco:** o banco fica na máquina de cada
> um. Assim você pode apagar, quebrar e recriar sem afetar ninguém. Em produção
> é o contrário: um banco só, compartilhado, e o `db:seed` **nunca** roda lá.

### Docker?

Não é usado, e não recomendo adicionar agora. A instalação local do PostgreSQL
resolve, e o projeto não tem outros serviços que justifiquem orquestração.

---

# API — rotas

Base: `http://localhost:3333/api`

| Grupo             | Arquivo                         | O que faz                          |
| ----------------- | ------------------------------- | ---------------------------------- |
| `/api/auth`       | `backend/src/rotas/auth.ts`     | login, logout, sessão              |
| `/api/site/:slug` | `backend/src/rotas/site.ts`     | conteúdo público do site           |
| `/api/clients`    | `backend/src/rotas/clientes.ts` | administração de clientes          |
| coleções          | `backend/src/rotas/colecoes.ts` | peças, galeria, depoimentos, redes |
| `/api/upload`     | `backend/src/rotas/upload.ts`   | envio de imagens                   |

Rotas administrativas exigem cookie de sessão — sem ele respondem `401`.

---

# Windows, Linux e macOS

O guia acima é para Windows. As diferenças:

| Passo            | Windows                                 | Linux / macOS       |
| ---------------- | --------------------------------------- | ------------------- |
| Copiar arquivo   | `Copy-Item a b`                         | `cp a b`            |
| Entrar em pasta  | `Set-Location x`                        | `cd x`              |
| Criar pasta      | `New-Item -ItemType Directory -Force x` | `mkdir -p x`        |
| Execution policy | necessário (passo 1.6)                  | não existe, pule    |
| Unblock-File     | necessário (passo 2.2)                  | não existe, pule    |
| Editar `.env`    | `notepad backend\.env`                  | `nano backend/.env` |
| psql             | caminho completo do `Program Files`     | `psql` direto       |

**Instalar no Ubuntu/Debian:**

```bash
sudo apt update
sudo apt install -y git curl postgresql
curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash -
sudo apt install -y nodejs
```

**Instalar no macOS (Homebrew):**

```bash
brew install git node postgresql@16
brew services start postgresql@16
```

Do passo 2.1 em diante, os comandos `npm` são idênticos nos três sistemas.

---

# Problemas conhecidos

**"o arquivo não reside em uma pasta confiável"**
O passo 1.6 não foi executado. Rode e confira com
`Get-ExecutionPolicy -Scope CurrentUser`.

**`P1001: Can't reach database server`**
PostgreSQL parado ou porta errada. `Get-Service postgresql*` precisa dizer
`Running`. Confira a porta com o passo 1.5.

**`autenticação do tipo senha falhou para o usuário postgres`**
A senha no `backend/.env` não confere com a definida na instalação. Se a senha
tiver caractere especial, veja a codificação no passo 3.2.

**`JWT_SECRET precisa de pelo menos 32 caracteres`**
O `backend/.env` foi editado e o valor ficou curto. Use o do `.env.example` ou
gere um maior.

**`node-gyp` ou pedido de Visual Studio**
Não deve acontecer neste projeto — nenhuma dependência compila código nativo.
Se acontecer, você está numa branch antiga: `git checkout main && git pull`.

**Erros `EBUSY` / `EPERM` durante o `npm install`**
O projeto está dentro do OneDrive. Mova para `C:\dev`.

**Porta 3333 ou 5173 em uso**

```powershell
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
```

**O site abre mas o painel não fala com o servidor**
A API não está rodando. Volte ao terminal 1.

**Quero recomeçar o banco**

```powershell
npm run db:reset
npm run db:seed
```

---

# Onde mexer no quê

| Quero...                       | Vou em                                                |
| ------------------------------ | ----------------------------------------------------- |
| mudar o visual                 | `src/components/` e `src/index.css`                   |
| mudar textos e conteúdo        | pelo painel `/admin`                                  |
| mexer no painel                | `src/admin/`                                          |
| criar um endpoint              | `backend/src/rotas/`                                  |
| mudar validação                | `backend/src/schemas/index.ts`                        |
| mudar o banco                  | `backend/prisma/schema.prisma` + `npm run db:migrate` |
| ajustar o conteúdo de fallback | `src/data/clientData.ts`                              |

---

# Uma coisa para saber

**Os espaços de imagem estão vazios de propósito.** Onde vão as fotografias do
ateliê existem marcações hachuradas. Nenhuma foto genérica ou de banco de
imagens foi usada. Quando os arquivos reais forem colocados em
`public/images/`, eles aparecem sozinhos.
