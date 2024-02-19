const express = require("express");
const router = express.Router();
const path = require("node:path");
const multer = require("multer");

const productsController = require("../controllers/productsController");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images/products");
    },
    filename: (req, file, cb) => {
      const fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
      cb(null, fileName);
    },
  });

const upload = multer({ storage });

// Obtener TODOS los productos.
router.get("/", productsController.list);

// Crear UN producto
router.get("/create/", productsController.createProduct);
router.post("/", upload.single("image"), productsController.storeProduct); // método p/crear productos con POST

// Obtener UN producto.
router.get("/:id", productsController.productDetail);

// Editar UN producto.
router.get("/:id?/edit", productsController.editProduct);
router.put("/:id", productsController.updateProduct); // para edición con método PUT

// Eliminar UN producto.
router.delete("/:id", productsController.deleteProduct);

// Obtener carrito
router.get("/cart", productsController.getCart);

module.exports = router;
