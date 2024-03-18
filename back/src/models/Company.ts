import { DataTypes, Model, Sequelize } from 'sequelize';
import { ICompany } from '../interface/ICompany.js';
import mysql from '../config/mysql.js';
import Owner from './Owner.js';

const sequelize = new Sequelize(mysql)

const Company = sequelize.define<Model<ICompany>, ICompany>('Company', {
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