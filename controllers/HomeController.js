class HomeController{

    async index(req, res){
        res.send("API REST");
    }

}

module.exports = new HomeController();