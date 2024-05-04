const { body } = require("express-validator");

const validations = [
  body("nombre")
    .notEmpty()
    .withMessage("El nombre del producto es obligatorio.")
    .isLength({ min: 5 })
    .withMessage("Debe tener por lo menos 5 cáracteres."),
  body("descripcion")
    .notEmpty()
    .withMessage("La descripcion es obligatoria.")
    .isLength({ min: 20 })
    .withMessage("Debe tener por lo menos 20 cáracteres."),
  body("categoria")
    .notEmpty()
    .withMessage("Debe ingresar una categoria.")
    .isLength({ min: 5 })
    .withMessage("Debe tener por lo menos 5 cáracteres."),
  body("color")
    .notEmpty()
    .withMessage("Debe ingresar un color.")
    .isLength({ min: 5 })
    .withMessage("Debe tener por lo menos 5 cáracteres."),
  body("precio")
    .notEmpty()
    .withMessage("Debe ingresar un precio.")
    .isDecimal({ decimal_digits: "2", force_decimal: true })
    .withMessage("Debe ingresar un precio con formato decimal."),

  body("image").custom((value, { req }) => {
    if (!req.file) {
      throw new Error("La imagen del producto es obligatoria.");
    }
    const avatar = req.file;
    // Añadir lógica adicional para validar el tipo de archivo, tamaño, etc.
    // Ejemplo básico: solo permitir archivos de imagen (jpeg, png, gif)
    const allowedExtensions = ["jpeg", "jpg", "png", "gif"];
    const extension = avatar.originalname.split(".").pop().toLowerCase();
    if (!allowedExtensions.includes(extension)) {
      throw new Error("El avatar debe ser una imagen (jpeg, jpg, png, gif)");
    }
    // Puedes realizar más validaciones según tus necesidades
    return true;
  }),
];

module.exports = validations;
