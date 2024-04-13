//rquires
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const productsRouter = require("./src/routes/product.js");
const mainRouter = require("./src/routes/main.js");
const usersRouter = require("./src/routes/users.js");
const cartsRouter = require("./src/routes/carts.js");
const session = require("express-session");
const userLogged = require("./src/middlewares/userLoggedMiddleware.js");
const cookies = require("cookie-parser");

const port = 3005;

//config
const rute = path.join(__dirname, "public");

app.use(
  session({
    secret: "secreto",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(cookies());

app.use(userLogged);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/src/views"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(rute));

app.use("/", mainRouter);
app.use("/products", productsRouter);
app.use("/users", usersRouter);
app.use("/carts", cartsRouter);

app.listen(port, () => {
  console.log(`Nuestra app corre en http://localhost:${port}`);
});
