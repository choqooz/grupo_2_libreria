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
  processLogin: (req, res) => {
    let userToLogin = User.findByField("email", req.body.email);

    if (userToLogin) {
      let isOkThePassword = bcrypt.compareSync(
        req.body.password,
        userToLogin.password
      );

      if (isOkThePassword) {
        delete userToLogin.password;
        req.session.userLogged = userToLogin;

        if (req.body.remember_me === "on") {
          res.cookie("email", req.body.email, { maxAge: 1000 * 60 * 2 });
        }

        return res.redirect("/users/profile");
      }

      return res.render("login.ejs", {
        errors: { email: { msg: "Credenciales invalidas" } },
        old: req.body,
        pageTitle: "Formulario de Login",
      });
    }

    return res.render("login.ejs", {
      errors: { email: { msg: "Email invalido" } },
      old: req.body,
      pageTitle: "Formulario de Login",
    });
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

    if (userInDB) {
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
  profile: (req, res) => {
    console.log(req.cookies.email);
    return res.render("usersProfile.ejs", {
      user: req.session.userLogged,
      pageTitle: "Perfil de usuario",
    });
  },
  logout: (req, res) => {
    res.clearCookie("email");
    req.session.destroy();
    res.redirect("/");
  },
};

module.exports = controller;
