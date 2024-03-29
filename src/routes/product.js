const express = require("express");
const router = express.Router();
const { uploadProducts } = require("../middlewares/multer");

const productsController = require("../controllers/productsController");

// Obtener TODOS los productos.
router.get("/", productsController.list);

// Crear UN producto
router.get("/create/", productsController.createProduct);
router.post(
  "/",
  uploadProducts.single("image"),
  productsController.storeProduct
); // método p/crear productos con POST

// Obtener UN producto.
router.get("/:id", productsController.productDetail);

// Editar UN producto.
router.get("/:id?/edit", productsController.editProduct);
router.put(
  "/:id",
  uploadProducts.single("image"),
  productsController.updateProduct
); // para edición con método PUT

// Eliminar UN producto.
router.delete("/:id", productsController.deleteProduct);

// Obtener carrito
router.get("/cart", productsController.getCart);

module.exports = router;
