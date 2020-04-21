const express = require("express");
const router = express.Router();
const Category = require("./Category"); //carregando o model
const slugify = require("slugify"); //carregando o slugfy

//definimos todas as de categoria utilizando o recurso router e exportamos com o module.exports
router.get("/admin/categories/new", (req, res) => {
    res.render("admin/categories/new");
});


//definindo a rota para salvar no banco
router.post("/categories/save", (req, res) => {
    var title = req.body.title;
    if(title != undefined){ //verificando o campo não está undefined
       Category.create({
           title: title,
           slug: slugify(title) //versão do titulo otimizado para URL
       }).then(() => {
            res.redirect("/admin/categories");
       });
    }else{
        res.redirect("/admin/categories/new");
    }
});

//rota para exibir as categorias do banco de dados
router.get("/admin/categories", (req, res) => {

    Category.findAll().then(category => {
        res.render("admin/categories/index", {categories : category}); //informando um JSON para passar as cateforias para a view
    });
});

//rota para deletar categoria do banco
router.post("/categories/delete", (req, res) => {
    var id = req.body.id;
    if(id != undefined){ //verificando se o id não é nulo
        if(!isNaN(id)){ //verifica se o id é um numero

            Category.destroy({ //excluindo uma categoria
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/categories");
            });

        }else{
            res.redirect("/admin/categories");
        }
    }else{
        res.redirect("/admin/categories");
    }
});

module.exports = router;