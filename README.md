## Visualização Rápida para o FrontEnd
Não disponível ainda!
<!-- Para visualizar o projeto de maneira fácil, basta acessar o link <https://guibank.vercel.app/> -->

## Requisitos para rodar o projeto
* NodeJs instalado ( [baixar](https://nodejs.org/en/download) )
* Postgresql instalado ( [baixar](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads) )

## Iniciando o FrontEnd
Crie um arquivo `.env` na pasta `back` e copie o padrão do arquivo `.env.example`

Digite qualquer coisa nos campos `SECRET`, `REFRESH`, `SALT` e salve.

Abra o terminal na pasta `front` ou, no diretório raiz, use o comando:
```
cd front
```

Para baixar as dependências e rodar o projeto, use os comandos:
```
npm i
npm run start
```

## Configurando Postgresql
Após [instalar o Postgresql](https://nodejs.org/en/download), siga o [tutorial de instalação](https://youtu.be/UbX-2Xud1JA?si=3yfqEYU-ol6L6Xg_&t=56).

Após instalado, abra o programa. Crie um novo database clicando com o botão direito em `Servers` e em `Register`:

![alt text](../imagesReadMe/createrServer.png)

Em `General`, coloque um nome para seu database. Ex.:

![alt text](../imagesReadMe/namedb.png)

Em `Connection` coloque no campo Password uma senha para acessar o db. Ex: `123456`.

**Anote o Host, Port, Username e o Password, pois será necessário para próxima etapa!** 

Então clique no botão `Save`.

## Iniciando o BackEnd
Abra o terminal na pasta `back` ou, no diretório raiz, use os comandos:
```
cd back
npm i
```

Crie um arquivo `.env` na pasta `back` e copie o padrão do arquivo `.env.example`.

No campo `SECRET`, `REFRESH` e `SALT`, coloque os mesmos valores colocados em [#Iniciando o FrontEnd](#Iniciando-o-FrontEnd).

No campo `DATABASE_URL`, substitua as letras maiúsculas pelos seus dados.

```
postgresql://USERNAME:PASSWORD@HOST:PORT/postgres
```

Após salvar o arquivo, use o comando :
```
npx prisma migrate dev
```

Por fim, use o comando para rodar o servidor:
```
npm run start
```
