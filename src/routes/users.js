const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

// Middlewares
const validator = require("../middlewares/validator");
const { uploadUsers } = require("../middlewares/multer");

router.get("/login", usersController.login);

router.get("/register", usersController.register);
router.post(
  "/register",
  uploadUsers.single("avatar"),
  validator,
  usersController.processRegister
);

// router.get("/profile/:id", usersController.profile);

module.exports = router;
