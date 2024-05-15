const db = require("../../../database/models");
const sequelize = db.sequelize;

//Middlewares

const Users = db.User;
const controller = {
  list: async (req, res) => {
    try {
      const users = await Users.findAll();
      const modifiedUSers = users.map((u) => {
        // Agregar el ID como un enlace al objeto del producto
        return {
          id: u.dataValues.user_id,
          name: u.dataValues.name,
          email: u.dataValues.email,
          detail: `http://localhost:3005/users/${u.user_id}`, // Crear un enlace con el ID del producto
        };
      });

      // Enviar la respuesta al cliente
      res.status(200).json({
        message: "OK",
        status: 200,
        count: users.length,
        users: modifiedUSers,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", status: 500 });
    }
  },
  userDetail: async (req, res) => {
    try {
      let user = await Users.findByPk(req.params.id);
      let modifiedUser = {
        id: user.user_id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        date: user.date,
        prefix: user.prefix,
        phone: user.phone,
        avatar: user.avatar,
      };
      res.status(201).json({ message: "OK", status: 201, user: modifiedUser });
    } catch (error) {
      res
        .status(500)
        .json({ message: `Internal Server Error: ${error}`, status: 500 });
    }
  },
};

module.exports = controller;
