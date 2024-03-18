import { DataTypes, Model, Sequelize } from 'sequelize';
import { IManager } from '../interface/IManager.js';
import mysql from '../config/mysql.js';
import Store from './Store.js';

const sequelize = new Sequelize(mysql)

const Manager = sequelize.define<Model<IManager>, IManager>('Manager', {
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
}, {
  // Other model options go here
});

export default Manager