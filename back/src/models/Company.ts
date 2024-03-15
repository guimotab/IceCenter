import { DataTypes, Model, Sequelize } from 'sequelize';
import { ICompany } from '../interface/ICompany';
import mysql from '../config/mysql';
import Owner from './Owner';

const sequelize = new Sequelize(mysql)

const Company = sequelize.define<Model<any, any>, ICompany>('Company', {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  idOwner: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Owner,
      key: "id"
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  // Other model options go here
});

export default Company