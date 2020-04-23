const express = require('express');
const router = express.Router();
const User = require("./User");
const bcrypt = require("bcryptjs");

router.get("/admin/users", (req, res) => {
    User.findAll().then(user => {
        res.render("admin/users/index",{users: user});
    });
});

router.get("/admin/users/create", (req, res) => {
    res.render("admin/users/create");
});


router.post("/users/create", (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({ //verificando se o e-mail já foi cadastrado no banco de dados
        where: {
            email: email
        }
    }).then(user => {
        if(user == undefined){

            var salt = bcrypt.genSaltSync(10); //algo a mais que voce coloca no hash para aumentar a segurança
            var hash = bcrypt.hashSync(password, salt);//gerando o hsh
            
            User.create({
                email: email,
                password: hash
            }).then(() => {
                res.redirect("/");
            }).catch((err) => {
                res.redirect("/");
            });

        }else{
            res.redirect("/admin/users/create")
        }
    })
});

router.get("/login", (req, res) => {
    res.render("admin/users/login");
});

//rota de autenticação
router.post("/authenticate", (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({ //pesquisando se o e-mail existe no banco
        where: {
            email : email
        }
    }).then(user => {
        if(user != undefined){ //verifica se existe um usuário com esse e-mail
            //valida a senha
            var correct = bcrypt.compareSync(password, user.password);
            if(correct){ //verifica se está correta
                req.session.user = { //cria a sessao de login
                    id: user.id,
                    email: user.email
                }
                res.json(req.session.user);
            }else{
                res.redirect("/login");
            }
        }else{
            res.redirect("/login");
        }
    });
});

module.exports = router