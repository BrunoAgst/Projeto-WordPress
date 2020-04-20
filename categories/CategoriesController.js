const express = require("express");
const router = express.Router();

//definimos todas as de categoria utilizando o recurso router e exportamos com o module.exports
router.get("/admin/categories/new", (req, res) => {
    res.render("admin/categories/new");
});



module.exports = router;