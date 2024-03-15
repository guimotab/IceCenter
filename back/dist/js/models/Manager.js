import { DataTypes, Sequelize } from 'sequelize';
import mysql from '../config/mysql';
import Store from './Store';
const sequelize = new Sequelize(mysql);
const Manager = sequelize.define('Manager', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
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