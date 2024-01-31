const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');


const ProductCart = sequelize.define('productCart', {
    quantity: {
        type: DataTypes.STRING,
        allowNull: false
    },
});



module.exports = ProductCart;