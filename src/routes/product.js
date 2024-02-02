const express = require("express");
const router = express.Router();
const path = require("node:path");

const productsController = require("../controllers/productsController");

// Obtener TODOS los productos.
router.get("/", productsController.list);

// Crear UN producto
router.get("/create/", productsController.createProduct);
router.post("/create/", productsController.storeProduct);

// Obtener UN producto.
router.get("/detail/:id", productsController.productDetail);

// Editar UN producto.
router.get("/edit/:id?", productsController.editProduct);
router.put("/edit/:id", productsController.updateProduct);

// Eliminar UN producto.
router.delete("/delete/:id", productsController.deleteProduct);

// Obtener carrito
router.get("/cart", productsController.getCart);

module.exports = router;
