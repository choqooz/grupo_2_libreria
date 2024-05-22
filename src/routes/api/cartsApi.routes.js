const express = require("express");
const router = express.Router();
const cartsAPIController = require("../../controllers/api/cartsAPIController");

//API
router.get("/", cartsAPIController.list);
router.get("/:id", cartsAPIController.detail);

module.exports = router;
