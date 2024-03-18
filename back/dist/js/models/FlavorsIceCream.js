import { DataTypes, Sequelize } from 'sequelize';
import mysql from '../config/mysql.js';
const sequelize = new Sequelize(mysql);
const FlavorsIceCream = sequelize.define('FlavorsIceCream', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
}, {});
export default FlavorsIceCream;
//# sourceMappingURL=FlavorsIceCream.js.map