import { DataTypes, Model, Sequelize } from 'sequelize';
import { IAddress } from '../interface/IAddress.js';
import mysql from '../config/mysql.js';

const sequelize = new Sequelize(mysql)

const Address = sequelize.define<Model<IAddress>, IAddress>('Address', {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  cep: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  neighborhood: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  street: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  uf: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  // Other model options go here
});

export default Address