const express = require("express");
const router = express.Router();
const cartsController = require("../controllers/cartsController");

//Rutas exigidas para la creación del CRUD
router.get("/", cartsController.list);
router.get("/detail/:id", cartsController.detail);
router.post("/create", cartsController.create);
router.get("/update/:id", cartsController.edit);
router.put("/update/:id", cartsController.update);
router.delete("/delete/:id", cartsController.destroy);

module.exports = router;
