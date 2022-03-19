var User = require("../models/User");
class UserController {
    async index(req, res) { }

    async create(req, res) {
        var { name, email, password } = req.body;
        if (name == undefined) {
            res.status(400);
            res.json({ message: "Informe o nome" })
            return;
        }

        if (email == undefined) {
            res.status(400);
            res.json({ message: "O email é inválido" })
            return;
        }
        
        if (await User.findEmail(email)) {
            res.status(406);
            res.json({ message: "O email já existe na base de dados" })
            return;
        }

        if (password == undefined) {
            res.status(400);
            res.json({ message: "Informe o password" })
            return;
        }

        await User.create(name, email, password);
        res.status(200);
        res.send("Usuário inserido com sucesso!");
    }
}

module.exports = new UserController();