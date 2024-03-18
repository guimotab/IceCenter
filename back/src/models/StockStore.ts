import { Sequelize, DataTypes, Model } from 'sequelize';
import { IStockStore } from '../interface/IStockStore.js';
import FlavorsIceCream from './FlavorsIceCream.js';
import mysql from '../config/mysql.js';
import StockStore_FlavorsIcreCream from './StockStore_FlavorsIcreCream.js';


const sequelize = new Sequelize(mysql)

const StockStore = sequelize.define<Model<IStockStore>, IStockStore>('StockStore', {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  cone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  // Other model options go here
});

export default StockStore