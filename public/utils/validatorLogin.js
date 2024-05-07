const formLogin = document.getElementById("form");

formLogin.addEventListener("submit", (e) => {
  e.preventDefault();

  let email = document.querySelector("#email").value;
  let password = document.querySelector("#password").value;

  if (!validator.isEmail(email)) {
    alert("Ingrese email valido.");
    return;
  }
  if (validator.isEmpty(password)) {
    alert("Ingrese su contraseña.");
    return;
  }
  formLogin.submit();
});
