import { DataTypes, Sequelize } from 'sequelize';
import mysql from '../config/mysql';
import Owner from './Owner';
const sequelize = new Sequelize(mysql);
const Company = sequelize.define('Company', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    idOwner: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Owner,
            key: "id"
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {});
export default Company;
//# sourceMappingURL=Company%20copy.js.map