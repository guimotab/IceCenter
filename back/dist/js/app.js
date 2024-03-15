import { Sequelize } from 'sequelize';
const sequelize = new Sequelize({ dialect: "mysql", host: "localhost", username: "root", password: "#Sm4shero", database: "icecenter" });
try {
    await sequelize.authenticate();
    console.log("Conexão feita com sucesso");
}
catch (err) {
    console.log("Houve um problema na conexão", err);
}
//# sourceMappingURL=app.js.map