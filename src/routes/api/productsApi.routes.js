const express = require("express");
const router = express.Router();
const productsAPIController = require("../../controllers/api/productsAPIController");

//API
router.get("/", productsAPIController.list);
router.get("/:id", productsAPIController.productDetail);


module.exports = router;
