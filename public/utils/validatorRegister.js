const formRegister = document.getElementById("form-reg");

formRegister.addEventListener("submit", (e) => {
  e.preventDefault();

  let name = document.getElementById("name-field").value;
  let surname = document.getElementById("surname-field").value;
  let email = document.getElementById("email-field").value;
  let date = document.getElementById("date-field").value;
  let prefix = document.getElementById("prefix-field").value;
  let phone = document.getElementById("phone-field").value;
  let password = document.getElementById("password-field").value;
  let avatar = document.getElementById("avatar-field").value;
  let category = document.getElementById("category-field").value;

  if (validator.isEmpty(name)) {
    alert("Ingrese su nombre.");
    return;
  }
  if (validator.isEmpty(surname)) {
    alert("Ingrese su apellido.");
    return;
  }
  if (!validator.isEmail(email)) {
    alert("Ingrese su email.");
    return;
  }
  // REVISAR, NO FUNCIONA
  //   if ((validator.isDate(date), { format: "YYYY-DD-MM" })) {
  //     console.log(date);
  //     alert("Ingrese su fecha de nacimiento.");
  //     return;
  //   }
  if (!validator.isLength(prefix, { min: 1, max: 3 })) {
    alert("Ingrese prefijo válido.");
    return;
  }
  if (!validator.isMobilePhone(phone)) {
    alert("Ingrese su numero de telefono.");
    return;
  }
  if (validator.isEmpty(password)) {
    alert("Ingrese su contraseña.");
    return;
  }
  if (validator.isEmpty(avatar)) {
    alert("Ingrese su avatar.");
    return;
  }
  if (validator.isEmpty(category)) {
    alert("Ingrese la categoria.");
    return;
  }

  formRegister.submit();
});
