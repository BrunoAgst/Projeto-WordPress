const express = require("express");
const router = express.Router();

//definimos todas as de categoria utilizando o recurso router e exportamos com o module.exports
router.get("/articles", (req, res) => {
    res.send("ROTA DE ARTIGO")
});

router.get("/admin/articles/new", (req, res) => {
    res.send("ROTA PARA CRIAR NOVO ARTIGO")
});

module.exports = router;