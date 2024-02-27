const fs = require("fs");
const path = require("path");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

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

    let userInDB = User.findByField("email", req.body.email);

    console.log("userindb: ", userInDB);

    if (userInDB.length > 0) {
      return res.render("register.ejs", {
        errors: { email: { msg: "Este email ya está registrado" } },
        old: req.body,
        pageTitle: "Formulario de Registro",
      });
    }

    let newUser = {
      ...req.body,
      password: bcrypt.hashSync(req.body.password, 10),
      avatar: req.file.filename,
    };

    User.create(newUser);
    return res.render("login.ejs", { pageTitle: "Formulario de Registro" });
  },
};

module.exports = controller;
