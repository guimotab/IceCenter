import express from 'express'
import cors from "cors"
import bodyParser from 'body-parser'
import { Sequelize } from 'sequelize';
import mysql from './config/mysql.js';
import routes from './routes/index.js';

//permite as origens fazer requisição ("*" - todas)
const app = express()
app.listen(4000, ()=> console.log("servidor conectado"))
app.use(bodyParser.json({limit: "1mb"}))
app.use(cors({origin: "*"}))
routes(app)

const sequelize = new Sequelize(mysql)
try {
  await sequelize.authenticate()
  console.log("Conexão feita com sucesso\n\n");
} catch (err) {
  console.log("Houve um problema na conexão", err);
}


