import { DataTypes, Sequelize } from 'sequelize';
import mysql from '../config/mysql.js';
import FlavorsIceCream from './IFlavorsIceCream.js';
const sequelize = new Sequelize(mysql);
const StockStore = sequelize.define('StockStore', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    idFlavors: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: FlavorsIceCream,
            key: "id"
        }
    },
    cone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {});
export default StockStore;
//# sourceMappingURL=IStockStore.js.map