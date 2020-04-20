const Sequelize = require('sequelize');
const connection = require('../database/database');

const Category = connection.define('categories', {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },slug:{ //endereço da categoria
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Category;