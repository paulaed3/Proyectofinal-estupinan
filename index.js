// Declarar la variable total como global
let total = 0;

// Esperar a que se cargue el contenido del documento
document.addEventListener("DOMContentLoaded", function () {
  // Obtener referencias a elementos relevantes del DOM
  const calcularTotalButton = document.getElementById("calcularTotalButton");
  const totalElement = document.getElementById("total");
  const totalConEnvioElement = document.getElementById("totalConEnvio");

  // Agregar un evento al botón de calcular total
  calcularTotalButton.addEventListener("click", function () {
    mostrarTotalCarrito();
    calcularTotalConEnvio();
  });

  // Función para verificar el contenido del almacenamiento local
  function checkLocalStorage() {
    const productos = JSON.parse(localStorage.getItem("cart")) || [];

    if (productos.length === 0) {
      return null;
    }

    const productsContainer = document.getElementById("cart_product");
    productsContainer.innerHTML = "";

    productos.forEach((product) => {
      const productHTML = `
        <div class="card_product" data-id="${product.id}">
          <img class="card_product_image" src="${product.thumbnail}" alt="${product.title}" />
          <p class="card_product_price">$${product.price}</p>
          <h3 class="card_product_title">${product.title}</h3>
          <button class="card_product_button" data-id="${product.id}">Eliminar del carrito</button>
        </div>
      `;
      productsContainer.innerHTML += productHTML;
    });

    // Asignar funcion al boton de eliminar
    const removeButtons = productsContainer.querySelectorAll(
      ".card_product_button"
    );
    removeButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const productId = button.getAttribute("data-id");
        removeFromCart(productId);
      });
    });
  }

  // Llamar a la función para verificar el almacenamiento local
  checkLocalStorage();

  // Función para eliminar todo el contenido del carrito
  function eliminarTodoElCarrito() {
    const cartProductsContainer = document.getElementById("cart_product");
    cartProductsContainer.innerHTML = "";

    localStorage.setItem("cart", JSON.stringify([]));
    actualizarTotales(0);
  }

  // Obtener referencia al botón de eliminar carrito y agregar evento
  const deleteCartButton = document.getElementById("deletecartbutton");
  deleteCartButton.addEventListener("click", eliminarTodoElCarrito);

  // Función para mostrar el total del carrito
  function mostrarTotalCarrito() {
    const productos = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;

    productos.forEach((product) => {
      total += product.price;
    });

    actualizarTotales(total);
  }

  // Llamar a la función para mostrar el total del carrito
  mostrarTotalCarrito();

  // Función para calcular el total con envío
  function calcularTotalConEnvio() {
    const tipoEnvio = document.querySelector(
      'input[name="tipoEnvio"]:checked'
    ).value;

    let totalConEnvio = parseFloat(totalElement.textContent.replace("$", ""));

    if (totalConEnvio === 0) {
      totalConEnvio = 0;
    } else {
      if (tipoEnvio === "n" && totalConEnvio < 1000) {
        totalConEnvio += 5;
      } else if (tipoEnvio === "i") {
        totalConEnvio += 15;
      }
    }

    totalConEnvioElement.textContent = "$" + totalConEnvio.toFixed(2);
    localStorage.setItem("totalConEnvio", totalConEnvio.toFixed(2));
  }

  function actualizarTotales(total) {
    totalElement.textContent = "$" + total.toFixed(2);
    calcularTotalConEnvio();
  }

  function removeFromCart(productId) {
    const productos = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedProductos = productos.filter(
      (product) => product.id !== productId
    );
    localStorage.setItem("cart", JSON.stringify(updatedProductos));

    // Eliminar la tarjeta del producto del DOM
    const productCard = document.querySelector(`[data-id="${productId}"]`);
    if (productCard) {
      productCard.remove();
    }

    mostrarTotalCarrito();
  }
});
