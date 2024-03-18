import { Sequelize, DataTypes } from 'sequelize';
import mysql from '../config/mysql.js';
const sequelize = new Sequelize(mysql);
const StockStore = sequelize.define('StockStore', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    cone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {});
export default StockStore;
//# sourceMappingURL=StockStore.js.map