const formProducts = document.getElementById("form-products");

formProducts.addEventListener("submit", (e) => {
  e.preventDefault();

  let productName = document.getElementById("nombre").value;
  let productDescription = document.getElementById("descripcion").value;
  let productImage = document.getElementById("image").value;
  let productCategory = document.getElementById("categoria").value;
  let productColor = document.getElementById("color").value;
  let productPrice = document.getElementById("precio").value;

  if (validator.isEmpty(productName)) {
    alert("Ingrese nombre de producto.");
    return;
  }
  if (validator.isEmpty(productDescription)) {
    alert("Ingrese descripcion del producto.");
    return;
  }
  if (validator.isEmpty(productImage)) {
    alert("Ingrese imagen del producto.");
    return;
  }
  if (validator.isEmpty(productCategory)) {
    alert("Ingrese categoria del producto.");
    return;
  }
  if (validator.isEmpty(productColor)) {
    alert("Ingrese color/es del producto.");
    return;
  }
  if (
    !validator.isFloat(productPrice, {
      force_decimal: true,
      locale: "en-US",
    }) ||
    !productPrice.includes(".")
  ) {
    alert("Ingrese un precio válido.");
    return false;
  }

  formProducts.submit();
});
