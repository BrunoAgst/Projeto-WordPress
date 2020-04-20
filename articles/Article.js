const Sequelize = require('sequelize');
const connection = require('../database/database');

const Article = connection.define('articles', {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },slug:{ //endereço da categoria
        type: Sequelize.STRING,
        allowNull: false
    },body: { //conteudo do artigo
        type: Sequelize.TEXT, //tipo texto pq o artigo longo
        allowNull: false
    }
});

module.exports = Article;