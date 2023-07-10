// Funciones

// Función para ingresar un producto
function ingresarProducto() {
  let nombre = prompt("Ingresa el nombre del producto o escribe 'fin' para terminar:");
  
  if (nombre.toLowerCase() === "fin") {
    return null;
  }
  
  let precio = prompt("Ingresa el precio del producto en COP:");
  
  // Validación del precio ingresado
  while (isNaN(parseFloat(precio))) {
    precio = prompt("El valor ingresado no es válido. Por favor, ingresa un valor numérico para el producto:");
  }
  
  return { nombre, precio: parseFloat(precio) };
}

// Función para obtener el tipo de envío
function obtenerTipoEnvio() {
  let envio = prompt("¿El envío es nacional o internacional?. Escribe N para nacional o I para internacional");
  
  // Validación del tipo de envío ingresado
  while (!(envio.toLowerCase() === "n" || envio.toLowerCase() === "i")) {
    envio = prompt("Opción inválida. Por favor, ingresa 'N' para envío nacional o 'I' para envío internacional:");
  }
  
  return envio.toLowerCase();
}

// Función para calcular el total con envío
function calcularTotalConEnvio(total, envio) {
  if (envio === "n") {
    if (total < 50000) {
      total += 8000;
    }
  } else if (envio === "i") {
    total += 18000;
  }
  
  return total;
}

// Función para mostrar el mensaje del total de compra
function mostrarMensajeTotal(total) {
  alert("Total de tu compra con envío incluido: $" + total);
}

// Ejecución del código

let total = 0;
let productos = [];

let producto = ingresarProducto();

// Bucle para ingresar productos
while (producto !== null) {
  productos.push(producto);
  total += producto.precio;
  producto = ingresarProducto();
}

if (total > 0) {
  console.log('Array de productos con sus precios:');
  productos.forEach(producto => {
    console.log(`${producto.nombre}: $${producto.precio}`);
  });
  
  alert("Total de tu carrito es: $" + total);
  
  let tipoEnvio = obtenerTipoEnvio();
  let totalConEnvio = calcularTotalConEnvio(total, tipoEnvio);
  
  mostrarMensajeTotal(totalConEnvio);
} else {
  alert("No se agregaron productos al carrito. Compra cancelada.");
}
