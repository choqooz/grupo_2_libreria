const fs = require("fs");
const path = require("path");

// const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");
// const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const controller = {
  list: (req, res) => {
    res.render("products.ejs");
  },
  productDetail: (req, res) => {
    res.render("productDetail.ejs");
  },
  getCart: (req, res) => {
    res.render("productCart.ejs");
  },
  createProduct: (req, res) => {
    res.render("product-create-form.ejs");
  },
  editProduct: (req, res) => {
    res.render("product-edit-form.ejs");
  },
  updateProduct: (req, res) => {
    res.render("product-edit-form.ejs");
  },
  storeProduct: (req, res) => {},
  deleteProduct: (req, res) => {},
};

module.exports = controller;
