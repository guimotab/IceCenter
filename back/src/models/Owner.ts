import { DataTypes, Model, Sequelize } from 'sequelize';
import { IOwner } from '../interface/IOwner';
import mysql from '../config/mysql';

const sequelize = new Sequelize(mysql)

const Owner = sequelize.define<Model<any, any>, IOwner>('Owner', {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  // Other model options go here
});

export default Owner