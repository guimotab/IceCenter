import { DataTypes, Sequelize } from 'sequelize';
import mysql from '../config/mysql';
const sequelize = new Sequelize(mysql);
const Address = sequelize.define('Address', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    cep: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    neighborhood: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    street: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    uf: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {});
export default Address;
//# sourceMappingURL=IAddress.js.map