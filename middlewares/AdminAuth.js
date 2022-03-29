var jwt = require("jsonwebtoken");
var secret = "fhsdflsfsfkskfjsfksfsfsriwnsxnsmnhlfowurewncvnfj";


module.exports = function (req, res, next) {
    const authToken = req.headers["authorization"];
    if (authToken != undefined) {
        const bearer = authToken.split(' ');
        var token = bearer[1];
        try {
            var user = jwt.verify(token, secret);
            if (user.role == 1) {
                next();
                return;
            }

            res.status(403);
            res.send("Você não tem permisão para acessar esse recurso!");
            return;            
        } catch (err) {
            res.status(403);
            res.send("Você não está autencicado!");
            return;
        }
    }

    res.status(403);
    res.send("Você não está autencicado!");
}