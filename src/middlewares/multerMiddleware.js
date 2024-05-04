const path = require("node:path");
const multer = require("multer");

// Configuración para productos
const storageProducts = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/products");
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
    cb(null, fileName);
  },
});

const uploadProducts = multer({ storage: storageProducts });

// Configuración para usuarios
const storageUsers = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/users");
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
    cb(null, fileName);
  },
});

const uploadUsers = multer({ storage: storageUsers });

module.exports = { uploadProducts, uploadUsers };
