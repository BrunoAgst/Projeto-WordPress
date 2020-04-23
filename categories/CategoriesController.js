const express = require("express");
const router = express.Router();
const Category = require("./Category"); //carregando o model
const slugify = require("slugify"); //carregando o slugfy
const adminAuth = require("../middleware/adminAuth");

//definimos todas as de categoria utilizando o recurso router e exportamos com o module.exports
router.get("/admin/categories/new", adminAuth, (req, res) => {
    res.render("admin/categories/new");
});


//definindo a rota para salvar no banco
router.post("/categories/save", adminAuth, (req, res) => {
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
router.get("/admin/categories", adminAuth, (req, res) => {

    Category.findAll().then(category => {
        res.render("admin/categories/index", {categories : category}); //informando um JSON para passar as cateforias para a view
    });
});

//rota para deletar categoria do banco
router.post("/categories/delete", adminAuth, (req, res) => {
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

//rota para a view de editar o uma categoria
router.get("/admin/categories/edit/:id", adminAuth, (req, res) => {
    var id = req.params.id;

    //devido ao bug que qualquer string depois do número no id, o sequelize localiza a categoria vamps verificar se o id é um número
    if(isNaN(id)){
        res.redirect("/admin/categories");
    };

    Category.findByPk(id).then(category => { //método específico para buscar um item pelo ID
        if(category != undefined){//verificando se não é nulo
            res.render("admin/categories/edit", {
                categories : category
            })
        } else{
            res.redirect("/admin/categories");
        }
    }).catch(error => {
        res.redirect("/admin/categories");
    }); 
});
//rota que faz a alteração da categoria no banco
router.post("/categories/update", adminAuth, (req, res) => {
    var id = req.body.id;
    var title = req.body.title;

    Category.update({title: title, slug: slugify(title)},{ // esse código informa que queremos atualizar uma categoria pelo seu ID
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/admin/categories");
    });
});

module.exports = router;