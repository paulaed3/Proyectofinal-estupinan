// Declaraciones iniciales
let productos = [];
let total = 0;

// Función para generar un ID único para cada producto
function generarID() {
  return Math.random().toString(36).substr(2, 8);
}

// Función para agregar un producto al carrito
function agregarProducto() {
  const productName = document.getElementById("productName").value;
  const productPrice = parseFloat(
    document.getElementById("productPrice").value
  );

  // Validar si el nombre y el precio son válidos
  if (!productName || isNaN(productPrice)) {
    alert("Por favor, ingresa un nombre y un precio válido para el producto.");
    return;
  }

  // Generar un ID único para el producto
  const idGenerado = generarID();

  // Crear un objeto para el nuevo producto con todos sus atributos
  const nuevoProducto = {
    id: idGenerado,
    nombre: productName,
    precio: productPrice,
  };

  // Agregar el producto al array de productos
  productos.push(nuevoProducto);

  // Crear el elemento visual para el nuevo producto en el carrito
  const cartProduct = document.createElement("div");
  cartProduct.classList.add("cart_product");
  cartProduct.innerHTML = `
    <div data-producto-id="${idGenerado}" class="product__info">
      <h3 id="name-product">${productName}</h3>
      <p id="price-product">$${productPrice.toFixed(2)}</p>
      <div class="product__actions">
        <button class="action__delete" onclick="eliminarProductoEspecifico('${idGenerado}')">Eliminar</button>
      </div>
    </div>
  `;

  // Agregar el nuevo producto al carrito visual en la página
  const cartProducts = document.querySelector(".cart_products");
  cartProducts.appendChild(cartProduct);

  // Actualizar el total con el nuevo precio del producto
  total += productPrice;

  // Actualizar el total en la página
  const totalElement = document.getElementById("total");
  totalElement.textContent = "$" + total.toFixed(2);

  // Guardar el carrito en el almacenamiento local
  guardarCarritoEnLocalStorage();
}

// Función para calcular el total con envío
function calcularTotalConEnvio() {
  const tipoEnvio = document.querySelector(
    'input[name="tipoEnvio"]:checked'
  ).value;

  let totalConEnvio = total;

  // Verificar si el valor total del carrito es cero, en ese caso, el envío también es cero.
  if (total === 0) {
    totalConEnvio = 0;
  } else {
    // Calcular el total con envío normal o internacional
    if (tipoEnvio === "n" && totalConEnvio < 50000) {
      totalConEnvio += 8000;
    } else if (tipoEnvio === "i") {
      totalConEnvio += 18000;
    }
  }

  // Mostrar el total con envío en la página
  const totalConEnvioElemento = document.getElementById("totalConEnvio");
  totalConEnvioElemento.textContent = "$" + totalConEnvio.toFixed(2);

  // Guardar el total con envío en localStorage
  localStorage.setItem("totalConEnvio", totalConEnvio.toFixed(2));
}

// Función para guardar el carrito de compras en localStorage
function guardarCarritoEnLocalStorage() {
  localStorage.setItem("productos", JSON.stringify(productos));
}

// Función para eliminar un producto específico del carrito
function eliminarProductoEspecifico(idProducto) {
  const index = productos.findIndex((producto) => producto.id === idProducto);

  if (index !== -1) {
    // Si se encontró el producto, restar su precio del total
    total -= productos[index].precio;

    // Eliminar el producto del array productos
    productos.splice(index, 1);

    // Actualizar el total en la página
    const totalElement = document.getElementById("total");
    totalElement.textContent = "$" + total.toFixed(2);

    // Buscar la etiqueta del producto y eliminarlo del carrito en la página
    const productElement = document.querySelector(
      `[data-producto-id="${idProducto}"]`
    );
    if (productElement) {
      const productParent = productElement.parentNode;
      productParent.remove(); // Eliminar la etiqueta y su elemento padre visualmente del DOM
    }

    // Guardar el carrito actualizado en el almacenamiento local
    guardarCarritoEnLocalStorage();
  }
}

// Función para vaciar el carrito
function eliminarTodoElCarrito() {
  // Vaciar el carrito en el HTML
  const cartProductsContainer = document.querySelector(".cart_products");
  cartProductsContainer.innerHTML = "";

  // Reiniciar el total a cero y el total con envío a cero
  total = 0;
  const totalElement = document.getElementById("total");
  totalElement.textContent = "$" + total.toFixed(2);

  const totalConEnvioElemento = document.getElementById("totalConEnvio");
  totalConEnvioElemento.textContent = "$0.00"; // Establecer el total con envío a cero

  // Actualizar el Local Storage con el carrito vacío y el total con envío a cero
  productos = [];
  localStorage.setItem("productos", JSON.stringify(productos));
  localStorage.setItem("totalConEnvio", "0.00");
}

// Función para inicializar la página y cargar datos desde el localStorage
function init() {
  // Obtener el total con envío desde localStorage, si existe
  const totalConEnvioGuardado = localStorage.getItem("totalConEnvio");
  if (totalConEnvioGuardado) {
    const totalConEnvioElemento = document.getElementById("totalConEnvio");
    totalConEnvioElemento.textContent = "$" + totalConEnvioGuardado;
  }

  // Inicializar el carrito de compras y los productos desde localStorage, si existen
  const productosGuardados = localStorage.getItem("productos");
  if (productosGuardados) {
    productos = JSON.parse(productosGuardados);

    productos.forEach((producto) => {
      total += producto.precio;
      const cartProduct = document.createElement("div");
      cartProduct.classList.add("cart_product");
      cartProduct.innerHTML = `
        <div class="product__info" data-producto-id="${producto.id}">
          <h3 id="name-product">${producto.nombre}</h3>
          <p id="price-product">$${producto.precio.toFixed(2)}</p>
          <div class="product__actions">
            <button class="action__delete" onclick="eliminarProductoEspecifico('${
              producto.id
            }')">Eliminar</button>
          </div>
        </div>
      `;

      const cartProducts = document.querySelector(".cart_products");
      cartProducts.appendChild(cartProduct);
    });

    // Mostrar el total en la página
    const totalElement = document.getElementById("total");
    totalElement.textContent = "$" + total.toFixed(2);
  }
}

// Función para manejar el evento cuando se agrega un producto
function handleProductFormSubmit(event) {
  event.preventDefault();
  agregarProducto();
  productForm.reset();
}

// Función para manejar el evento cuando se calcula el total con envío
function handleCalcularTotalButtonClick() {
  calcularTotalConEnvio();
}

// Función para manejar el evento cuando se elimina todo el carrito
function handleEliminarTodoButtonClick() {
  eliminarTodoElCarrito();
}

// Event listeners
// Escuchar el evento de envío del formulario de agregar producto
const productForm = document.getElementById("productForm");
productForm.addEventListener("submit", handleProductFormSubmit);

// Escuchar el evento de clic en el botón de calcular total con envío
const calcularTotalButton = document.getElementById("calcularTotalButton");
calcularTotalButton.addEventListener("click", handleCalcularTotalButtonClick);

// Escuchar el evento de clic en el botón de eliminar todo el carrito
const eliminarTodoButton = document.getElementById("deletecartbutton");
eliminarTodoButton.addEventListener("click", handleEliminarTodoButtonClick);

// Inicializar la página
init();
