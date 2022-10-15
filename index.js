import DOMHandler from "./dom-handler.js";
import { getCategories, getProducts, STORE } from "./services/products-services.js";


    // const filteredproducts = products

//  async function fetchProducts() {
//     const products = await getProducts()
// }

function renderProduct(product) {
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
    </div>`
  }

function renderCategories(category) {
    return `
    <a data-id=${category.id}> ${category.name} </a>
    `
}


function render() {
      const products = STORE.currentProducts()
      const categories = STORE.currentCategories()
    return `
      <ul class="js-category-list">
        ${categories.map(category => renderCategories(category)).join("")}
      </ul>
      <ul class="js-product-list">
        ${products.map(product => renderProduct(product)).join("")}
      </ul>
    `;
  }

  function listenFilter() {
    const filters = document.querySelector(".js-category-list")

    filters.addEventListener("click", (event) =>{
        event.preventDefault();
        console.log(event.target.dataset.id)
        STORE.filter = event.target.dataset.id
        console.log(STORE.filter)
        DOMHandler.load(HomePage)

    })
  }



  export const HomePage = {
    toString() {
      return render();
    },
    addListeners() {
        listenFilter();
    }
  };

  
  async function init() {
    try {
        console.log("hola")   
        await STORE.fetchProducts();
        await STORE.fetchCategories();
        DOMHandler.load(HomePage);
    } catch (error) {
    }
}
  
  init()
