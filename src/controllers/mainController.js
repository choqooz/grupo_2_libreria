const fs = require("fs");
const path = require("path");

// const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");
// const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const controller = {
  index: (req, res) => {
    res.render("index.ejs",{pageTitle: "Pógina de Incio"});
  },
  login: (req, res) => {
    res.render("login.ejs",{pageTitle: "Login"});
  },
  register: (req, res) => {
    res.render("register.ejs",{pageTitle: "Formulario de Registro"});
  },
};

module.exports = controller;
