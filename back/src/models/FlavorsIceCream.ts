import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from 'sequelize';
import { IFlavorsIceCream } from '../interface/IFlavorsIceCream.js';
import mysql from '../config/mysql.js';
import StockStore from './StockStore.js';
import StockStore_FlavorsIcreCream from './StockStore_FlavorsIcreCream.js';

const sequelize = new Sequelize(mysql)

const FlavorsIceCream = sequelize.define<Model<IFlavorsIceCream>, IFlavorsIceCream>('FlavorsIceCream', {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
}, {
});


export default FlavorsIceCream