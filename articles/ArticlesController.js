const express = require("express");
const router = express.Router();
const Category = require("../categories/Category");

//definimos todas as de categoria utilizando o recurso router e exportamos com o module.exports
router.get("/articles", (req, res) => {
    res.send("ROTA DE ARTIGO")
});

router.get("/admin/articles/new", (req, res) => {
    Category.findAll().then(category => {
        res.render("admin/articles/new",{categories: category})    
    });
    
});

module.exports = router;