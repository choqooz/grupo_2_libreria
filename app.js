//rquires
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const cookies = require("cookie-parser");
const cors = require("cors");
const session = require("express-session");
const userLogged = require("./src/middlewares/userLoggedMiddleware.js");
const productsRouter = require("./src/routes/product.js");
const mainRouter = require("./src/routes/main.js");
const usersRouter = require("./src/routes/users.js");
const cartsRouter = require("./src/routes/carts.js");
const productsAPIRouter = require("./src/routes/api/productsApi.routes.js");
const usersAPIRouter = require("./src/routes/api/usersApi.routes.js");
const cartsAPIRouter = require("./src/routes/api/cartsApi.routes.js");

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

app.use(cors());
app.use(cookies());

app.use(userLogged);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/src/views"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(rute));
app.use(
  express.static("public", {
    setHeaders: function (res, path) {
      if (path.match(/\.js$/)) {
        res.set("Content-Type", "application/javascript; charset=utf-8");
      }
    },
  })
);

app.use("/", mainRouter);
app.use("/products", productsRouter);
app.use("/users", usersRouter);
app.use("/carts", cartsRouter);

//API
app.use("/api/products", productsAPIRouter);
app.use("/api/users", usersAPIRouter);
app.use("/api/carts", cartsAPIRouter);

app.listen(port, () => {
  console.log(`Nuestra app corre en http://localhost:${port}`);
});
