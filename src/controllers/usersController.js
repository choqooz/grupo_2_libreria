const fs = require("fs");
const path = require("path");

//Middlewares
const { validationResult } = require("express-validator");

// const productsFilePath = path.join(__dirname, "../data/users.json");
// const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const controller = {
  login: (req, res) => {
    res.render("login.ejs", { pageTitle: "Login" });
  },
  register: (req, res) => {
    res.render("register.ejs", { pageTitle: "Formulario de Registro" });
  },
  processRegister: (req, res) => {
    const errors = validationResult(req);

    if (errors.errors.length > 0) {
      return res.render("register.ejs", {
        errors: errors.mapped(),
        old: req.body,
        pageTitle: "Formulario de Registro",
      });
    }
  },
};

module.exports = controller;
