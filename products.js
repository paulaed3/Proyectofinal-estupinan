function generarID() {
  return Math.random().toString(36).substr(2, 8);
}
const showAccountProducts = () => {
  const products = JSON.parse(localStorage.getItem("cart")) || [];
  const accountProductsHTML = document.getElementById("account-products");
  accountProductsHTML.innerHTML = `${products.length}`;
};
const messageAlert = (message) => {
  const alertDiv = document.createElement("div");
  alertDiv.classList.add("container", "mt-3");

  const alertInnerDiv = document.createElement("div");
  alertInnerDiv.classList.add("alert", "alert-success", "d-none");
  alertInnerDiv.setAttribute("role", "alert");
  alertInnerDiv.textContent = message;

  alertDiv.appendChild(alertInnerDiv);
  const mainContent = document.querySelector(".container");
  mainContent.insertBefore(alertDiv, mainContent.firstChild);

  const successAlert = document.querySelector(".alert-success");
  successAlert.classList.remove("d-none");

  setTimeout(() => {
    successAlert.classList.add("d-none");
  }, 3000);
};

const addToCart = (infoProducto) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  infoProducto.id = generarID();
  cart.push(infoProducto);
  localStorage.setItem("cart", JSON.stringify(cart));
  messageAlert("Producto agregado del carrito exitosamente.");
  showAccountProducts();
};

const displayProductsHTML = (products) => {
  const productsContainer = document.getElementById("products");
  productsContainer.innerHTML = "";

  products.forEach((product) => {
    const productInfo = {
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
    };
    const productHTML = `
        <div class="card_product">
          <img class="card_product_image" src="${product.thumbnail}" alt="${
      product.title
    }" />
          <p class="card_product_price">$${product.price}</p>
          <h3 class="card_product_title">${product.title}</h3>
          <p class="card_product_description">${product.description}</p>
          <button class="card_product_button" onclick='addToCart(${JSON.stringify(
            productInfo
          )})'>Agregar al carrito</button>
        </div>
        `;

    productsContainer.innerHTML += productHTML;
  });
};

// main
showAccountProducts();
fetch("https://dummyjson.com/products")
  .then((res) => res.json())
  .then((res) => {
    const { products = [] } = res;
    displayProductsHTML(products);
  })
  .catch((error) => {
    console.error("Error fetching products:", error);
  });
