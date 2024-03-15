import { DataTypes, Sequelize } from 'sequelize';
import mysql from '../config/mysql';
import Company from './Company';
const sequelize = new Sequelize(mysql);
const Store = sequelize.define('Store', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    idCompany: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Company,
            key: "id"
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    revenue: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    stock: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {});
export default Store;
//# sourceMappingURL=Store.js.map