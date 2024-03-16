const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/products.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const controller = {
  index: (req, res) => {
    res.render("index.ejs", { pageTitle: "Página de Incio" });
  },
  search: (req, res) => {
    let productSearch = req.query.search.toUpperCase();
    let results = products.filter(product => {
			return product.nombre.toUpperCase().includes(productSearch)
		})
    res.render("search.ejs", {results, pageTitle: "Página de Incio"})
}}

module.exports = controller;
