import { DataTypes, Sequelize } from 'sequelize';
import mysql from '../config/mysql.js';
import Company from './Company.js';
import RevenueStore from './RevenueStore.js';
import StockStore from './StockStore.js';
import Address from './Address.js';
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
    idRevenue: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: RevenueStore,
            key: "id"
        }
    },
    idStock: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: StockStore,
            key: "id"
        }
    },
    idAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Address,
            key: "id"
        }
    },
}, {});
export default Store;
//# sourceMappingURL=Store.js.map