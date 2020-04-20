const Sequelize = require('sequelize');

const connection = new Sequelize('wordpress', 'root', '15121996br.',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;