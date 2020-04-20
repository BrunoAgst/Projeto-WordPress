const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');

//importando as rotas de categoria
const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");

//importando os models
const Article = require("./articles/Article");
const Category = require("./categories/Category");

//conectando ao banco
connection
    .authenticate()
    .then(() => {
        console.log("Conectado com sucesso");
    }).catch((error) => {
        console.log(error);
    });

//carregando a view engine
app.set('view engine', 'ejs');

//carregando arquivos estaticos
app.use(express.static('public'));

//Configurando o body-parser
app.use(bodyParser.urlencoded({extended: false})); //aceitando dados de formulario
app.use(bodyParser.json()); //aceitando json

//link entre a aplicação principal e as rotas de categoria
app.use("/", categoriesController); //"/" => define o prefixo
app.use("/", articlesController);

app.get("/", (req, res) => {
    res.render("index");
});

app.listen(3000, () => {
    console.log("Servidor rodando");
});