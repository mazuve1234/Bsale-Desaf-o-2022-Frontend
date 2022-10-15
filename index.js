import DOMHandler from "./dom-handler.js";
import { getProducts, STORE } from "./services/products-services.js";
    const products = await getProducts()

//  async function fetchProducts() {
//     const products = await getProducts()
// }

function renderProduct(product) {
    console.log(product.url_image)
    return  `
    <div>
    <li>
      <img class="product-image" src=${product.url_image} alt="product_image"/>
      <div class="product-card">
        <p class="content-sm bold">${product.name}</p>
        <p>S/. ${product.price/100}</p>
        <p>${product.discount}</p>
      </div>
    </li>
    </div>
  `
  }

function render() {


    console.log(products)
    return `
      <ul class="js-product-list">
        ${products.map(product => renderProduct(product)).join("")}
      </ul>
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
