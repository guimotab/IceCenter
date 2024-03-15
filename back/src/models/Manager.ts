import { DataTypes, Model, Sequelize } from 'sequelize';
import { IManager } from '../interface/IManager';
import mysql from '../config/mysql';
import Owner from './Owner';
import Store from './Store';

const sequelize = new Sequelize(mysql)

const Manager = sequelize.define<Model<any, any>, IManager>('Manager', {
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
}, {
  // Other model options go here
});

export default Manager