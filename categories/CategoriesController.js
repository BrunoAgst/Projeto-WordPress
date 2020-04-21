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
            res.redirect("/");
       });
    }else{
        res.redirect("/admin/categories/new");
    }
});

module.exports = router;