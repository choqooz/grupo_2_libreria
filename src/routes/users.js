const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

// Middlewares
const validator = require("../middlewares/validatorUserMiddleware");
const { uploadUsers } = require("../middlewares/multerMiddleware");
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

//CRUD

//Get / List
router.get("/detail/:id", usersController.userDetail);
// //Edit
router.put("/edit/:id", usersController.userEdit);

module.exports = router;
