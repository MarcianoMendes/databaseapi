
var knex = require("../database/connection");
var bcrypt = require("bcrypt");
class User {
    async create(name, email, password) {
        try {
            await knex.insert({ name, email, password, role: 0 }).table("users");
        } catch (err) {
            console.log(err)
        }
    }

}

module.exports = new User();