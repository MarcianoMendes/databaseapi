class HomeController {
  async index(req, res) {
    res.send("API REST");
  }

  async validate(req, res) {
    res.send("Ok");
  }
}

module.exports = new HomeController();
