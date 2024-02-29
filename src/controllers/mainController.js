const fs = require("fs");
const path = require("path");

// const productsFilePath = path.join(__dirname, "../data/products.json");
// const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const controller = {
  index: (req, res) => {
    res.render("index.ejs", { pageTitle: "Página de Incio" });
  },
};

module.exports = controller;
