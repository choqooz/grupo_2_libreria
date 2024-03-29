const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

// Middlewares
const validator = require("../middlewares/validator");
const { uploadUsers } = require("../middlewares/multer");
const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/login", guestMiddleware, usersController.login);
router.post("/login", usersController.processLogin);

router.get("/register", guestMiddleware, usersController.register);
router.post(
  "/register",
  uploadUsers.single("avatar"),
  validator,
  usersController.processRegister
);

router.get("/profile/", authMiddleware, usersController.profile);
router.get("/logout", usersController.logout);

module.exports = router;
