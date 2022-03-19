
var knex = require("../database/connection");
var bcrypt = require("bcrypt");
class User {
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
            console.log(result);
            return result.length > 0;
        } catch (err) {
            console.log(err);
            return false;
        }
    }
}

module.exports = new User();