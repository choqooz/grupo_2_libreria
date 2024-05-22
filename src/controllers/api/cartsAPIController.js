const db = require("../../../database/models");
const sequelize = db.sequelize;

//Aqui tienen otra forma de llamar a cada uno de los modelos
const Carts = db.Cart;

const cartsController = {
  list: async (req, res) => {
    try {
      const carts = await Carts.findAll({
        include: ["user"],
      });
      res.status(200).json({
        message: "OK",
        status: 200,
        count: carts.length,
        carts: carts,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", status: 500 });
    }
  },
  detail: async (req, res) => {
    try {
      let cart = await Carts.findByPk(req.params.id, { include: ["user"] });
      res.status(201).json({ message: "OK", status: 201, cart });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", status: 500 });
    }
  },
};

module.exports = cartsController;
