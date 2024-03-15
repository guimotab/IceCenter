import { DataTypes, Sequelize } from 'sequelize';
import mysql from '../config/mysql';
const sequelize = new Sequelize(mysql);
const Owner = sequelize.define('Owner', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {});
export default Owner;
//# sourceMappingURL=Owner%20copy.js.map