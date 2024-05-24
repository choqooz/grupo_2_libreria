const db = require("../../../database/models");
const sequelize = db.sequelize;

//Middlewares

const Products = db.Product;
const controller = {
  list: async (req, res) => {
    try {
      const products = await Products.findAll();

      // Modificar la respuesta antes de enviarla
      const modifiedProducts = products.map((product) => {
        // Agregar el ID como un enlace al objeto del producto
        return {
          ...product.dataValues, // Mantener los atributos originales del producto
          link: `http://localhost:3005/products/${product.product_id}`, // Crear un enlace con el ID del producto
        };
      });
      const lastProduct = modifiedProducts.pop();
      const ficcion = modifiedProducts.filter((p) => p.category === "Ficción");
      const noFiccion = modifiedProducts.filter(
        (p) => p.category === "No Ficción"
      );
      const materialEscolar = modifiedProducts.filter(
        (p) => p.category === "Material Escolar"
      );
      const countByCategory = {
        countFiccion: ficcion.length,
        ficcion: ficcion,
        countNoFiccion: noFiccion.length,
        noFiccion: noFiccion,
        countMaterialEscolar: materialEscolar.length,
        materialEscolar: materialEscolar,
      };

      // Enviar la respuesta modificada al cliente
      res.status(200).json({
        message: "OK",
        status: 200,
        count: modifiedProducts.length,
        products: modifiedProducts,
        countByCategory: countByCategory,
        lastProduct: lastProduct,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", status: 500 });
    }
  },
  productDetail: async (req, res) => {
    try {
      let product = await Products.findByPk(req.params.id);
      res.status(201).json({ message: "OK", status: 201, product });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", status: 500 });
    }
  },
};

module.exports = controller;
