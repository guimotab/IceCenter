## Visualização Rápida para o FrontEnd

Acesse o link <https://icecenter.vercel.app/> para visualizar o projeto

## Requisitos para rodar o projeto
* NodeJs instalado ( [baixar](https://nodejs.org/en/download) )
* Postgresql instalado ( [baixar](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads) )


## Configurando Postgresql
Após [baixar o Postgresql](https://nodejs.org/en/download), siga o [tutorial de instalação](https://youtu.be/UbX-2Xud1JA?si=3yfqEYU-ol6L6Xg_&t=56).

Após instalado, abra o programa. Crie um novo database clicando com o botão direito em `Servers` e em `Register`:

Em `General`, coloque um nome para seu database.

Em `Connection` coloque no campo Host o valor `localhost` e no campo Password uma senha para acessar o banco de dados.

**Anote o Host, Port, Username e o Password, pois será necessário para próxima etapa!** 

Então clique no botão `Save`.

## Iniciando o Projeto
Crie um arquivo `.env`

Digite qualquer texto nos campos `SECRET`, `REFRESH` e salve.

No campo `DATABASE_URL`, substitua as letras maiúsculas pelos seus dados do banco de dados do postgresql.

Para baixar as dependências e rodar o projeto, use os comandos:
```
npm i
npx prisma migrate dev
npm run build
npm run start
```
