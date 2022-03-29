var User = require("../models/User");
var Token = require("../models/Token");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

var secret = "fhsdflsfsfkskfjsfksfsfsriwnsxnsmnhlfowurewncvnfj";

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

    async edit(req, res) {
        var { id, name, email, role } = req.body;
        var result = await User.update(id, name, email, role);
        if (result != undefined) {
            if (result.status) {
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


    async delete(req, res) {
        var id = req.params.id;
        var result = await User.delete(id);
        if (result.status) {
            res.send("Usuário excluído com sucesso!");
            return;
        }

        res.status(406);
        res.send(result.message);
    }

    async recoveryPassword(req, res) {
        var email = req.body.email;
        var result = await Token.create(email);
        if (result.status) {
            console.log(result);
            res.send(result.token);
            return;
        }

        res.status(406);
        res.send(result.message);

    }

    async changePassword(req, res) {
        var token = req.body.token;
        var password = req.body.password;
        var tokenValided = await Token.validate(token);
        if (tokenValided.status) {
            await User.changePassword(tokenValided.token.id_user, password, token);
            res.send("Senha alterada com sucesso!");
            return;
        }

        res.status(406);
        res.send("O token não é válido!");
    }

    async login(req, res) {
        var { email, password } = req.body;
        var user = await User.findByEmail(email);
        if (user != undefined) {
            var result = await bcrypt.compare(password, user.password);
            if (result) {
                var token = jwt.sign({ email: user.email, role: user.role }, secret);
                res.json({ token: token });
                return;
            }

            res.status(406);
            res.send("Senha incorreta");
            return;
        }

        res.json({ status: false });
    }
}

module.exports = new UserController();