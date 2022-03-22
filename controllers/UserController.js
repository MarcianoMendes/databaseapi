const user = require("../models/User");
var User = require("../models/User");
class UserController {
    async index(req, res) {
        res.json(await User.allUsers());
    }

    async findUser(req, res) {
        var id = req.params.id;
        var user = await User.findById(id);
        if (user == undefined) {
            res.status(404);
            res.json({});
            return;
        }

        res.json(user);
    }

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

    async edit(req, res){
        var { id, name, email, role} = req.body;
        var result = await User.update(id, name, email, role);
        if(result != undefined){
            if(result.status){
                res.send("Usuário atualizado com sucesso!");
                return;
            }

            res.status(406);
            res.send(result.message);
            return;
        }
       
        res.status(406);
        res.send("Ocorreo um erro no processo de edição");
    }
}

module.exports = new UserController();