const validator = validator;

let form = document.querySelector("form.form_reg");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("test");

  let email = document.querySelector("#email").value;
  let password = document.querySelector("#password").value;

  if (!validator.isEmail(email)) {
    alert("Ingrese email valido!");
    return;
  }
});
