import { DataTypes, Sequelize } from 'sequelize';
import FlavorsIceCream from './FlavorsIceCream';
import mysql from '../config/mysql';
import StockStore from './StockStore';


const sequelize = new Sequelize(mysql)

const StockStore_FlavorsIcreCream = sequelize.define('StockStore_FlavorsIcreCream', {}, {});



export default StockStore_FlavorsIcreCream