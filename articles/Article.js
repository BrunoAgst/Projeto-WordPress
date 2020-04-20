const Sequelize = require('sequelize');
const connection = require('../database/database');

//importando o modulo que desejo fazer o relacionamento
const Category = require('../categories/Category');

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

//definindo relacionamentos

//Relacionamento de mão dupla
Category.hasMany(Article); // hasMany significa tem muitos, ou seja, uma categoria tem vários artigos
Article.belongsTo(Category); // belongsTo significa pertence há, ou seja, neste caso um artigo pertence a uma categoria

//toda vez que criar um relacionamento precisa atualizar o banco de dados
//Article.sync({force: true}); //como esse método recria a nossa tabela no banco de dados depois precisamos retirar para que não acontece sempre.

module.exports = Article;