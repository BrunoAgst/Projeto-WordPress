const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');

//importando as rotas de categoria
const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");
const userController = require("./user/UserController");

//importando os models
const Article = require("./articles/Article");
const Category = require("./categories/Category");
const User = require("./user/User");

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
app.use("/", userController);

app.get("/", (req, res) => {
    Article.findAll({
        order: [ //ordenando os artigos de forma decrescente
            ['id', 'DESC']
        ],
        limit: 4
    }).then(article => {
        Category.findAll().then( category => {           
            res.render("index",{articles : article, categories : category});
        });
    });
});

app.get("/:slug", (req, res) => {
    var slug = req.params.slug;
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if(article != undefined){
            Category.findAll().then( category => { //chamando o categoria 
                res.render("article", {articles: article, categories: category});
        })}
        else{
            res.redirect("/");
        }  
    }).catch(error => {
        res.redirect("/");
    });
});

app.get("/category/:slug", (req, res) => {
    var slug = req.params.slug;
    Category.findOne({
        where: {
            slug: slug
        },
       include: [{model : Article}] //nessa linha fazemos o join e informamos para buscar toda os artigos dentro da categoria
    }).then(category => {
        if(category != undefined){
            Category.findAll().then(category => {
                res.render("category", {article: category.article, categories: category}); //passando para a via as categorias e os artigos através das categorias
            });
        }else{
            res.redirect("/");
        }
    }).catch(err => {
        res.redirect("/");
    });
});

app.listen(3000, () => {
    console.log("Servidor rodando");
});