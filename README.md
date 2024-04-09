## Visualização Rápida para o FrontEnd

**Antes de acessar o projeto pela visualização rápida, você precisa seguir o passo a passo [#Iniciando o BackEnd](#Iniciando-o-BackEnd)**

Após iniciar o backend, e rodá-lo, acesse o link <https://icecenter.vercel.app/> para visualizar o projeto

## Requisitos para rodar o projeto
* NodeJs instalado ( [baixar](https://nodejs.org/en/download) )
* Postgresql instalado ( [baixar](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads) )

## Iniciando o FrontEnd
Crie um arquivo `.env` na pasta `back` e copie o padrão do arquivo `.env.example`

Digite qualquer coisa nos campos `NEXT_PUBLIC_SECRET`, `NEXT_PUBLIC_REFRESH` e salve.

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

Em `General`, coloque um nome para seu database.

Em `Connection` coloque no campo Password uma senha para acessar o banco de dados.

**Anote o Host, Port, Username e o Password, pois será necessário para próxima etapa!** 

Então clique no botão `Save`.

## Iniciando o BackEnd
Abra o terminal na pasta `back` ou, no diretório raiz, use os comandos:
```
cd back
npm i
```

Crie um arquivo `.env` na pasta `back` e copie o padrão do arquivo `.env.example`.

Se você está seguindo pelo [#Visualização Rápida para o FrontEnd](#Visualização-Rápida-para-o-FrontEnd), então adicione nos campos `SECRET`, `REFRESH` e `SALT` os seguintes valores:
```
SECRET="njofdsnuoniooi"
REFRESH="d13d31fd"
SALT="O2f3g5gtdfh"
```

Caso esteja você não esteja fazendo a [#Visualização Rápida para o FrontEnd](#Visualização-Rápida-para-o-FrontEnd), então adicione nos campos `SECRET`, `REFRESH` e `SALT` os mesmos valores colocados em [#Iniciando o FrontEnd](#Iniciando-o-FrontEnd).

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
