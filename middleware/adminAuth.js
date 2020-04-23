function adminAuth(req, res, next){ //next da continuidade na requisição
    if(req.session.user != undefined){//isso verifica se o usuário está logado, caso sim da continuidade
        next();
    }else{
        res.redirect("/login");
    } 
}

module.exports = adminAuth;