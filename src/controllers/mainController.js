const db = require("../../database/models");
const sequelize = db.sequelize;

const controller = {
  index: (req, res) => {
    res.render("index.ejs");
  },
  search: async (req, res) => {
    let products = await db.Product.findAll({ raw: true });
    let productSearch = req.query.search.toUpperCase();
    let results = products.filter((product) => {
      return product.name.toUpperCase().includes(productSearch);
    });
    res.render("search.ejs", { results, productSearch });
  },
};
db.sequelize = sequelize;

module.exports = controller;
