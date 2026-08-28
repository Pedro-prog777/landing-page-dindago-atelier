# Histórico — migrations do SQLite

Este diretório guarda a migration que existiu enquanto o projeto usava SQLite.

Ela **não roda no PostgreSQL**: o SQL era específico do SQLite (`DATETIME`,
`TEXT PRIMARY KEY`, chaves estrangeiras declaradas dentro do `CREATE TABLE`).
Por isso foi movida para cá em vez de adaptada, e a migration inicial do
PostgreSQL foi gerada do zero a partir do mesmo `schema.prisma`.

Está preservada apenas como registro: nenhum comando do Prisma lê este
diretório. Se um dia for preciso reabrir um backup `.db` antigo, é aqui que
está a estrutura que ele tinha.

Os dados daquele banco foram exportados para `backend/backups/` antes da
migração, em `.db` e em JSON.
