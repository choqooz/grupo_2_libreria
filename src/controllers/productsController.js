const fs = require("fs");
const path = require("path");
const { Association } = require("sequelize");
const db = require("../../database/models");
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { name } = require("ejs");


//Middlewares
const { validationResult } = require("express-validator");

const Products = db.Product;
const controller = {
  list: async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Página actual, por defecto 1
    const limit = parseInt(req.query.limit) || 24; // Número de productos por página, por defecto 10
    const offset = (page - 1) * limit;

    try {
      const { count, rows } = await Products.findAndCountAll({
        limit: limit,
        offset: offset,
      });

      const totalPages = Math.ceil(count / limit);

      res.render("products", {
        products: rows,
        currentPage: page,
        totalPages: totalPages,
        limit: limit,
      });
    } catch (error) {
      res.status(500).send("Error al obtener los productos");
    }

    // const products = await Products.findAll();
    // res.render("products.ejs", { products });
  },
  productDetail: async (req, res) => {
    let product = await Products.findByPk(req.params.id);
    res.render("productDetail.ejs", { product });
  },
  getCart: (req, res) => {
    res.render("productCart.ejs");
  },
  createProduct: function (req, res) {
    return res.render("product-create-form.ejs");

    /*.then(function() {
    res.redirect('/products');
})
.catch(function(err) {
    console.error('Error al crear el producto:', err);
    res.status(500).send('Error interno del servidor');
})*/
  },
  // guardado: function (req, res) {
  //   db.Product.create({
  //     name: req.body.nombre,
  //     description: req.body.descripcion,
  //     image: req.body.image,
  //     category: req.body.categoria,
  //     color: req.body.color,
  //     price: req.body.precio,
  //   });
  //   res.redirect("/products");
  // },
  editProduct: async (req, res) => {
    let product = await Products.findByPk(req.params.id);
    if (product) {
      return res.render("product-edit-form.ejs", { product });
    }

    res.send(`
    <h1> El producto que intentas editar no existe </h1>
    <a href='/products'>Volver al catalogo </a>
    `);
  },
  updateProduct: async (req, res) => {
    let productId = req.params.id;

    // Verificamos si se envió una imagen en la solicitud
    if (req.file && req.file.filename) {
      // Si hay una imagen, actualizamos el producto incluyendo la imagen
      await Products.update(
        {
          name: req.body.nombre,
          description: req.body.descripcion,
          image: req.file.filename,
          category: req.body.categoria,
          color: req.body.color,
          price: req.body.precio,
        },
        {
          where: {
            product_id: productId, // Especifica el ID del producto que quieres actualizar
          },
        }
      )
        .then(() => {
          // Redireccionamos al usuario a la página de detalles del producto actualizado
          res.redirect(`/products/${productId}`);
        })
        .catch((err) => {
          // Manejo de errores si la actualización falla
          console.error("Error al actualizar el producto:", err);
          res.status(500).send("Error al actualizar el producto");
        });
    } else {
      // Si no hay imagen en la solicitud, actualizamos el producto sin incluir la imagen
      await Products.update(
        {
          name: req.body.nombre,
          description: req.body.descripcion,
          category: req.body.categoria,
          color: req.body.color,
          price: req.body.precio,
        },
        {
          where: {
            product_id: productId, // Especifica el ID del producto que quieres actualizar
          },
        }
      )
        .then(() => {
          // Redireccionamos al usuario a la página de detalles del producto actualizado
          res.redirect(`/products/${productId}`);
        })
        .catch((err) => {
          // Manejo de errores si la actualización falla
          console.error("Error al actualizar el producto:", err);
          res.status(500).send("Error al actualizar el producto");
        });
    }
  },

  storeProduct: async (req, res) => {
    const errors = validationResult(req);

    if (errors.errors.length > 0) {
      return res.render("product-create-form.ejs", {
        errors: errors.mapped(),
        old: req.body,
      });
    }

    const newProduct = {
      id: Date.now(),
      name: req.body.nombre,
      description: req.body.descripcion,
      price: req.body.precio,
      category: req.body.categoria,
      color: req.body.color,
      image: req.file.filename || "default-img.png",
    };

    await Products.create(newProduct)
      .then(() => {
        res.redirect(`/products/`);
      })
      .catch((err) => {
        res.redirect(`/products/`);
        return console.error("Error al crear el producto: \n", err);
      });
  },
  deleteProduct: (req, res) => {
    const productId = req.params.id;

    Products.destroy({ where: { product_id: productId }, force: true })
      .then(() => {
        return res.redirect("/products");
      })
      .catch((err) => {
        res.send(`
      <h1> Hubo un error revise la consola</h1>
      <a href='/products'>Volver al catálogo </a>
    `);
        console.log("Error: \n", err);
      });
  },
};

module.exports = controller;
