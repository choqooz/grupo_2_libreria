const fs = require("fs");
const path = require("path");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const db = require("../../database/models");
const sequelize = db.sequelize;

//Middlewares
const { validationResult } = require("express-validator");


const controller = {
  login: (req, res) => {
    res.render("login.ejs", { pageTitle: "Login" });
  },
  processLogin: async (req, res) => {
    let userToLogin = await db.User.findOne({
      where: {
        email: req.body.email,
      },
    });

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
      errors: { email: { msg: "Credenciales invalido" } },
      old: req.body,
      pageTitle: "Formulario de Login",
    });
  },
  register: (req, res) => {
    res.render("register.ejs", { pageTitle: "Formulario de Registro" });
  },
  processRegister: async (req, res) => {
    const errors = validationResult(req);

    if (errors.errors.length > 0) {
      return res.render("register.ejs", {
        errors: errors.mapped(),
        old: req.body,
        pageTitle: "Formulario de Registro",
      });
    }

    let userInDB = await db.User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (userInDB) {
      return res.render("register.ejs", {
        errors: { email: { msg: "Este email ya está registrado" } },
        old: req.body,
        pageTitle: "Formulario de Registro",
      });
    }

    let newUser = {
      ...req.body,
      information: 1,
      terms: 1,
      password: bcrypt.hashSync(req.body.password, 10),
      avatar: req.file.filename,
    };

    await db.User.create(newUser);
    return res.render("login.ejs", { pageTitle: "Formulario de Registro" });
  },
  profile: (req, res) => {
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

  userDetail: (req, res) => {
    db.User.findByPk(req.params.id).then((user) => {
      res.json(user);
    });
  },
  userEdit: async (req, res) => {
    let userId = req.params.id;
    let updatedUser = {
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      date: req.body.date,
      prefix: req.body.prefix,
      phone: req.body.phone,
      password: bcrypt.hashSync(req.body.password, 10),
    };

    await db.User.update(updatedUser, {
      where: { user_id: userId },
    })
      .then(() => {
        return res.json(updatedUser);
      })
      .catch((e) => {
        console.log(e);
      });
  },
};

module.exports = controller;
