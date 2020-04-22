const express = require("express");
const router = express.Router();
const Category = require("../categories/Category");
const Article = require("./Article");
const slugify = require("slugify");



//definimos todas as de categoria utilizando o recurso router e exportamos com o module.exports
router.get("/admin/articles", (req, res) => {
    Article.findAll({
        include: [{model: Category}] //realizando o join incluindo model category na busca
    }).then(article =>{
        res.render("admin/articles/index", {articles : article});
    });
});


router.get("/admin/articles/new", (req, res) => {
    Category.findAll().then(category => {
        res.render("admin/articles/new",{categories: category})    
    });
    
});

router.post("/articles/save", (req, res) => {
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category;

    Article.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: category //esse id é gerando quando criamos o relacionamento entre as tabelas, mais conhecido como chave estrangeira
    }).then(() => {
        res.redirect("/admin/articles");
    });
});

router.post("/articles/delete", (req, res) => {
    var id = req.body.id;
    if(id != undefined){ //verificando se o id não é nulo
        if(!isNaN(id)){ //verifica se o id é um numero

            Article.destroy({ //excluindo uma categoria
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/articles");
            });

        }else{
            res.redirect("/admin/articles");
        }
    }else{
        res.redirect("/admin/articles");
    }
});

router.get("/admin/articles/edit/:id", (req, res) => {
    var id = req.params.id;

    if(isNaN(id)){
        res.redirect("/admin/articles");
    }

    Article.findByPk(id).then(article => {
        if(article != undefined){
            res.render("admin/articles/edit", {
                articles : article
            })
        }else{
            res.redirect("admin/articles");
        }
    }).catch(error => {
        res.redirect("/admin/artibles");
    });
})

router.post("/articles/update", (req, res) => {
    var id = req.body.id;
    var title = req.body.title;
    var body = req.body.body;

    Article.update({title: title, slug: slugify(title), body: body}, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/admin/articles");
    });
})

module.exports = router;