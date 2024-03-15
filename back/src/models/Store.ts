import { DataTypes, Model, Sequelize } from 'sequelize';
import { IStore } from '../interface/IStore';
import mysql from '../config/mysql';
import Owner from './Owner';
import Company from './Company';

const sequelize = new Sequelize(mysql)

const Store = sequelize.define<Model<any, any>, IStore>('Store', {
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
  revenue: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stock: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  // Other model options go here
});

export default Store