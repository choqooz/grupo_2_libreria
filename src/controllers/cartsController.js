const db = require("../../database/models");
const sequelize = db.sequelize;

//Aqui tienen otra forma de llamar a cada uno de los modelos
const Carts = db.Cart;

const cartsController = {
  list: async (req, res) => {
    const carts = await Carts.findAll({
      include: ["user"],
    });
    res.render("carts.ejs", { carts });
  },
  detail: (req, res) => {
    Carts.findByPk(req.params.id, {
      include: ["user"],
    })
      .then((cart) => {
        if (!cart) {
          res.send("No se encontro el carrito buscado.");
        } else {
          res.json(cart);
        }
      })
      .catch((error) => res.send(error));
  },

  create: function (req, res) {
    Carts.create({
      quantity: req.body.quantity,
      subtotal: req.body.subtotal,
      user_id: req.body.user_id,
      product_id: req.body.product_id,
    })

      .then(async (cart) => {
        return res.json(cart);
      })
      .catch((error) => res.send(error));
  },
  edit: async (req, res) => {
    let cart = await Carts.findByPk(req.params.id);
    if (cart) {
      return res.render("carts-edit-form.ejs", { cart });
    }
    console.log(cart);

    res.send(`
    <h1> El producto que intentas editar no existe </h1>
    <a href='/products'>Volver al catalogo </a>
    `);
  },
  update: async function (req, res) {
    let cartId = req.params.id;
    await Carts.update(
      {
        quantity: req.body.quantity,
        subtotal: req.body.subtotal,
      },
      {
        where: { cart_id: cartId },
      }
    )
      .then(() => {
        return res.send(
          `El carrito con id ${cartId} fue actualizado con éxito.`
        );
      })
      .catch((error) => res.send(error));
  },
  destroy: function (req, res) {
    let cartId = req.params.id;
    Carts.destroy({ where: { cart_id: cartId }, force: true }) // force: true es para asegurar que se ejecute la acción
      .then(() => {
        return res.send(`Carrito con id ${cartId} eliminado con éxito.`);
      })
      .catch((error) => res.send(error));
  },
};

module.exports = cartsController;
