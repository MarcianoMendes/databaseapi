
var knex = require("../database/connection");
var bcrypt = require("bcrypt");
class User {
    async allUsers() {
        try {
            return await knex.select("id", "name", "email", "role").table("users");

        } catch (err) {
            console.log(err);
            return [];
        }
    }

    async findById(id) {
        try {
            var result = await knex.select("id", "name", "email", "role").where({ id: id }).table("users");
            if (result.length > 0) {
                return result[0];
            }

            return undefined;

        } catch (err) {
            console.log(err);
            return undefined;
        }
    }

    async create(name, email, password) {
        try {
            var hash = await bcrypt.hash(password, 10);
            await knex.insert({ name, email, password: hash, role: 0 }).table("users");
        } catch (err) {
            console.log(err)
        }
    }

    async findEmail(email) {
        try {
            var result = await knex.select("email").from("users").where({ email: email });
            return result.length > 0;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    async update(id, name, email, role) {
        var user = await this.findById(id);
        if (user != undefined) {
            var editUser = {};
            if (email != undefined) {
                if (email != user.email) {
                    var result = await this.findEmail(email);
                    if (result != undefined) {
                        return { status: false, message: "O e-mail já está cadastrado!" }
                    }

                    editUser.email = email;
                }
            }

            if (name != undefined) {
                editUser.name = name;
            }

            if (role != undefined) {
                editUser.role = role;
            }

            try {
                await knex.update(editUser).where({ id: id }).table("users");
            } catch (err) {
                return { status: false, message: err };
            }

            return { status: true };
        }

        return { status: false, message: "Usuário não existe!" }
    }
}

module.exports = new User();