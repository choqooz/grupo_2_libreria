const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/products.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const controller = {
  list: (req, res) => {
    res.render("products.ejs", { pageTitle: "Listado de Productos", products });
  },
  productDetail: (req, res) => {
    let product = products.find((product) => product.id == req.params.id);
    res.render("productDetail.ejs", {
      pageTitle: "Detalle de Productos",
      product,
    });
  },
  getCart: (req, res) => {
    res.render("productCart.ejs", { pageTitle: "Carrrito de Compra" });
  },
  createProduct: (req, res) => {
    res.render("product-create-form.ejs", {
      pageTitle: "Creacion de Productos",
    });
  },
  editProduct: (req, res) => {
    let product = products.find((product) => product.id == req.params.id);
    if (product) {
      return res.render("product-edit-form.ejs", {
        pageTitle: "Editar un producto",
        product,
      });
    }

    res.send(`
    <h1> El producto que intentas editar no existe </h1>
    <a href='/products'>Volver al catalogo </a>
    `);
  },
  updateProduct: (req, res) => {
    let { id, nombre, descripcion, categoria, color, precio } = req.body;

    const index = products.findIndex((product) => product.id == req.params.id);

    if (index !== -1) {
      // Actualiza las propiedades del producto
      products[index].nombre = nombre;
      products[index].descripcion = descripcion;
      products[index].categoria = categoria;
      products[index].color = color;
      products[index].precio = precio;

      if (req.file && req.file.filename) {
        products[index].image = req.file.filename;
      }

      console.log(products[index]);

      fs.writeFileSync(
        productsFilePath,
        JSON.stringify(products, null, 2),
        "utf-8"
      );

      return res.redirect(`/products/${req.params.id}`);
    }

    res.send(`
      <h1> El producto que intentas editar no existe </h1>
      <a href='/products'>Volver al catálogo </a>
    `);

    res.render("product-edit-form.ejs", { pageTitle: "Edicion de Productos" });
  },
  storeProduct: (req, res) => {
    let { nombre, descripcion, image, categoria, color, precio } = req.body;
    const newProduct = {
      id: Date.now(),
      nombre,
      precio: parseInt(precio, 10),
      categoria,
      descripcion,
      color,
      image: req.file.filename || "default-img.png",
    };

    products.push(newProduct);
    fs.writeFileSync(
      productsFilePath,
      JSON.stringify(products, null, 2),
      "utf-8"
    );
    res.redirect("/products");
  },
  deleteProduct: (req, res) => {
    const productId = req.params.id;
    const index = products.findIndex((product) => product.id == productId);

    if (index !== -1) {
      products.splice(index, 1);

      fs.writeFileSync(
        productsFilePath,
        JSON.stringify(products, null, 2),
        "utf-8"
      );

      return res.redirect("/products");
    }

    res.send(`
      <h1> El producto que intentas eliminar no existe </h1>
      <a href='/products'>Volver al catálogo </a>
    `);
  },
};

module.exports = controller;
