const fs = require("fs");
const path = require("path");
const db = require("../../database/models");
const sequelize = db.sequelize;
//const productsFilePath = path.join(__dirname, "../data/products.json");
//const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const controller = {
  index: (req, res) => {
    res.render("index.ejs");
  },
  search: (req, res) => {
    let productSearch = req.query.search.toUpperCase();
    let results = products.filter((product) => {
      return product.nombre.toUpperCase().includes(productSearch);
    });
    res.render("search.ejs", { results, productSearch });
  },
  /*listar: (req, res) => {
    db.Product.findAll().then((carts) => {
      res.json(carts);
    });
  },*/
  listar: function (req, res) {
    db.Pelicula.findAll().then(function (productos) {
      res.render("products", { productos: productos });
    });
  },
};
db.sequelize = sequelize;

module.exports = controller;
