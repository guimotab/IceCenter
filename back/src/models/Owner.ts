import { DataTypes, Model, Sequelize } from 'sequelize';
import { IOwner } from '../interface/IOwner.js';
import mysql from '../config/mysql.js';

const sequelize = new Sequelize(mysql)

const Owner = sequelize.define<Model<IOwner, IOwner>, IOwner>('Owner', {
  
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
});

export default Owner