const { body } = require("express-validator");

const validations = [
  body("name").notEmpty().withMessage("El nombre es obligatorio"),
  body("surname").notEmpty().withMessage("El apellido es obligatorio"),
  body("email").isEmail().withMessage("Ingresa un correo electrónico válido"),
  body("date").isISO8601().withMessage("Ingresa una fecha válida"),
  body("prefix").notEmpty().withMessage("El prefijo es obligatorio"),
  body("phone")
    .isMobilePhone()
    .withMessage("Ingresa un número de teléfono válido"),
  body("avatar").custom((value, { req }) => {
    if (!req.file) {
      throw new Error("El avatar es obligatorio");
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
  body("category").notEmpty().withMessage("La categoría es obligatoria"),
  body("terms").custom((value, { req }) => {
    // Manejar el caso específico cuando el checkbox está marcado
    if (value === "on" || value === true) {
      return true;
    } else {
      throw new Error("Debes aceptar los términos y condiciones");
    }
  }),
];

module.exports = validations;
