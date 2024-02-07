const fs = require("fs");
const path = require("path");

// const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");
// const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const controller = {
  list: (req, res) => {
    res.render("products.ejs",{pageTitle: "Listado de Productos"});
  },
  productDetail: (req, res) => {
    res.render("productDetail.ejs",{pageTitle: "Detalle de Productos"});
  },
  getCart: (req, res) => {
    res.render("productCart.ejs",{pageTitle: "Carrrito de Compra"});
  },
  createProduct: (req, res) => {
    res.render("product-create-form.ejs",{pageTitle: "Creacion de Productos"});
  },
  editProduct: (req, res) => {
    res.render("product-edit-form.ejs",{pageTitle: "Edicion de Productos"});
  },
  updateProduct: (req, res) => {
    res.render("product-edit-form.ejs",{pageTitle: "Edicion de Productos"});
  },
  storeProduct: (req, res) => {},
  deleteProduct: (req, res) => {},
};

module.exports = controller;
