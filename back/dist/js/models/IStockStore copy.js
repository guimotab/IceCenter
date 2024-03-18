import { DataTypes, Sequelize } from 'sequelize';
import mysql from '../config/mysql';
import FlavorsIceCream from './IFlavorsIceCream';
const sequelize = new Sequelize(mysql);
const StockStore = sequelize.define('StockStore', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    flavors: {
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
//# sourceMappingURL=IStockStore%20copy.js.map