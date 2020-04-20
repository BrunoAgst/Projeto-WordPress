const express = require("express");
const router = express.Router();

//definimos todas as de categoria utilizando o recurso router e exportamos com o module.exports
router.get("/categories", (req, res) => {
    res.send("ROTA DE CATEGORIAS")
});

router.get("/admin/categories/new", (req, res) => {
    res.send("ROTA PARA CRIAR NOVA CATEGORIA")
});

module.exports = router;