var Knex = require("../database/connection");
var User = require("./user");
const uniqid = require('uniqid');
const knex = require("../database/connection");

class Token {
    async create(email) {
        var user = await User.findByEmail(email);
        if (user != undefined) {
            try {
                var token = uniqid();
                await Knex.insert({
                    token: token,
                    id_user: user.id,
                    used: 0
                }).table("tokens");
                return { status: true, token: token };

            } catch (err) {
                return { status: false, message: err }
            }
        }

        return { status: false, message: "E-mail repassado não existe na base de dados!" }
    }

    async validate(token) {
        try {
            var result = await Knex.select().where({ token: token }).table("tokens");
            if (result.length > 0) {
                var toKenUser = result[0];
                if (toKenUser.used) {
                    return { status: false };
                }

                return { status: true, token: toKenUser };
            }

            return { status: false };
        } catch (err) {
            console.log(err);
            return { status: false };
        }
    }

    async setUsed(token) {
        try {
            await knex.update({ used: 1 }).where({ token: token }).from("tokens");
        } catch (err) {
            console.log(err)
        }
    }

}

module.exports = new Token();