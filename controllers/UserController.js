class UserController {
    async index(req, res) { }

    async create(req, res) {
        var{name,email,password} = req.body;
        if(name == undefined) {
            res.status(400);
            res.json({message:"Informe o nome"})
            return;
        }

        if(email == undefined) {
            res.status(400);
            res.json({message:"O email é inválido"})
            return;
        }

        if(password == undefined) {
            res.status(400);
            res.json({message:"Informe o password"})
            return;
        }

        res.status(200);
        res.send("Pegando o corpo da requisição");
    }
}

module.exports = new UserController();