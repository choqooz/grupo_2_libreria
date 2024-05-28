const express = require("express");
const router = express.Router();

const mainController = require("../controllers/mainController");

router.get("/", mainController.index);
router.get("/search", mainController.search);
// router.get("/listar", mainController.listar);

module.exports = router;
