const fs = require("fs");
const path = require("path");
const db = require("../../database/models");
const sequelize = db.sequelize;

const productsFilePath = path.join(__dirname, "../data/products.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const controller = {
  index: (req, res) => {
    res.render("index.ejs", { pageTitle: "Página de Incio" });
  },
  search: (req, res) => {
    let productSearch = req.query.search.toUpperCase();
    let results = products.filter((product) => {
      return product.nombre.toUpperCase().includes(productSearch);
    });
    res.render("search.ejs", { results, productSearch, pageTitle: "Búsqueda" });
  },
  listar: (req, res) => {
    db.Product.findAll().then((carts) => {
      res.json(carts);
    });
  },
};

module.exports = controller;
