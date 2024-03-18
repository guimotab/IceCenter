import dot from "dotenv";
dot.config();
const dbPassword = process.env.PASS_DB;
const mysql = { dialect: "mysql", host: "localhost", username: "root", password: dbPassword, database: "icecenter", define: { timestamps: false } };
export default mysql;
//# sourceMappingURL=mysql.js.map