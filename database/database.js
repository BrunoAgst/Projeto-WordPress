const Sequelize = require('sequelize');

const connection = new Sequelize('wordpress', 'root', '15121996br.',{
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00' //definindo a timezone
});

module.exports = connection;