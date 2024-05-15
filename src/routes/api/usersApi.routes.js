const express = require("express");
const router = express.Router();
const usersAPIController = require("../../controllers/api/usersAPIController");

//API
router.get("/", usersAPIController.list);
router.get("/:id", usersAPIController.userDetail);

module.exports = router;
