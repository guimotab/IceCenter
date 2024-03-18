import { Options } from "sequelize";
import dot from "dotenv"
dot.config()
const dbPassword = process.env.PASS_DB!
const mysql = { dialect: "mysql", host: "localhost", username: "root", password: dbPassword, database: "icecenter", define: { timestamps: false } } as Options
export default mysql