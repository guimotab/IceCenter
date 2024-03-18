import { Sequelize } from 'sequelize';
import mysql from '../config/mysql';
const sequelize = new Sequelize(mysql);
const StockStore_FlavorsIcreCream = sequelize.define('StockStore_FlavorsIcreCream', {}, {});
export default StockStore_FlavorsIcreCream;
//# sourceMappingURL=StockStore_FlavorsIcreCream.js.map