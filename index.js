import DOMHandler from "./dom-handler.js";
import { getProducts, STORE } from "./services/products-services.js";
    const products = await getProducts()

//  async function fetchProducts() {
//     const products = await getProducts()
// }

function renderProduct(product) {
    console.log(product.url_image)
    return  `
    <li>
      <img src=${product.url_image} alt="product_image"/>
      <p>${product.name}</p>
      <p>${product.price}</p>
      <p>${product.discount}</p>
    </li>
  `
  }

function render() {

    // const list = fetchProducts()
    console.log(products)
    return `
    <main class="section">
      <section class="container">
        <div
        <div class="flex space-between container-header">
          <h1 class="heading text-center mb-2 heading--sm gray-header">Bsale</h1>
          <button class="js-logout-link link">Logout</button>
        </div>
        <div class="flex flex-end">
          <ul class="js-product-list">
          ${products.map(product => renderProduct(product)).join("")}
          </ul>
        </div>
      </section>
    </main>
    `;
  }

  export const HomePage = {
    toString() {
      return render();
    },
  };

  async function init() {
    try {
        console.log("hola")

        DOMHandler.load(HomePage);
    } catch (error) {
    }
}
  
  init()
