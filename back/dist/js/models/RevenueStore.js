import { DataTypes, Sequelize } from 'sequelize';
import mysql from '../config/mysql.js';
const sequelize = new Sequelize(mysql);
const RevenueStore = sequelize.define('RevenueStore', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    cash: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    profit: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    expenses: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
}, {});
export default RevenueStore;
//# sourceMappingURL=RevenueStore.js.map