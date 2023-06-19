// funciones
function ingresarValorProducto() {
  let valor = prompt(
    "Ingresa el valor de cada producto en COP y cuando termines de ingresarlos escribe 'fin' para terminar:"
  );

  while (valor.toLowerCase() !== "fin" && isNaN(parseFloat(valor))) {
    valor = prompt(
      "El valor ingresado no es válido. Por favor, ingresa un valor numérico para el producto:"
    );
  }

  return valor.toLowerCase() === "fin" ? null : parseFloat(valor);
}

function obtenerTipoEnvio() {
  let envio = prompt(
    "¿El envío es nacional o internacional?. Escribe N para nacional o I para internacional"
  );

  while (!(envio.toLowerCase() === "n" || envio.toLowerCase() === "i")) {
    envio = prompt(
      "Opción inválida. Por favor, ingresa 'N' para envío nacional o 'I' para envío internacional:"
    );
  }

  return envio.toLowerCase();
}

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

function mostrarMensajeTotal(total) {
  alert("Total de tu compra con envío incluido: $" + total);
}

// Ejecucion codigo
let total = 0;
let valorProducto = ingresarValorProducto();

while (valorProducto !== null) {
  total += valorProducto;
  valorProducto = ingresarValorProducto();
}

if (total > 0) {
  alert("Total de tu carrito es: $" + total);

  let tipoEnvio = obtenerTipoEnvio();
  let totalConEnvio = calcularTotalConEnvio(total, tipoEnvio);

  mostrarMensajeTotal(totalConEnvio);
} else {
  alert("No se agregaron productos al carrito. Compra cancelada.");
}
