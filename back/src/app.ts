import express from 'express'
import cors from "cors"
import routes from './routes/index.js'
import bodyParser from 'body-parser'
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({ dialect: "mysql", host: "localhost", username: "root", password: "#Sm4shero", database: "icecenter" })
try {
  await sequelize.authenticate()
  console.log("Conexão feita com sucesso");
} catch (err) {
  console.log("Houve um problema na conexão", err);
}

// //permite as origens fazer requisição ("*" - todas)
// const app = express()
// app.use(bodyParser.json({limit: "1mb"}))
// app.use(cors({origin: "*"}))
// // routes(app)

