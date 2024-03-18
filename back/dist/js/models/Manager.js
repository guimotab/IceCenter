import { DataTypes, Sequelize } from 'sequelize';
import mysql from '../config/mysql.js';
import Store from './Store.js';
const sequelize = new Sequelize(mysql);
const Manager = sequelize.define('Manager', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: true
    },
    idStore: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Store,
            key: "id"
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {});
export default Manager;
//# sourceMappingURL=Manager.js.map