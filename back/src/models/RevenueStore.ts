import { DataTypes, Model, Sequelize } from 'sequelize';
import { IRevenueStore } from '../interface/IRevenueStore.js';
import mysql from '../config/mysql.js';

const sequelize = new Sequelize(mysql)

const RevenueStore = sequelize.define<Model<IRevenueStore>, IRevenueStore>('RevenueStore', {
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
}, {
  // Other model options go here
});

export default RevenueStore