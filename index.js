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
      <img class="product-image" src=${product.url_image ? product.url_image : "https://thumbs.dreamstime.com/z/link-not-found-12739222.jpg"} alt="product_image"/>
      <div class="product-card">
        <p class="content-sm bold">${product.name}</p>
        <div class="flex gap-4">
          ${product.discount ? `<p class="price-before">S/. ${(product.price/100).toFixed(2)}</p>`: `<p> S/. ${(product.price/100).toFixed(2)}</p>`}
          ${product.discount ? `<p class="price-after">S/. ${Math.round((product.price/100) * (1-(product.discount/100))).toFixed(2)}</p>` : ""}
        </div>
      </div>
    </li>
    </div>`
  }

function renderCategory(category) {
    return `
    <button class="category-button" data-id=${category.id}> ${category.name.toUpperCase()} </button>
    `
}


function render() {
      const products = STORE.currentProductsFiltered().sort((a, b) => a.name.normalize().localeCompare(b.name.normalize()))
      const categories = STORE.currentCategories()
    return `
      <p class="content-xs mb-4"> Secret: Click in between the buttons to reset the filters :) </p>
      <ul class="js-category-list">
        ${categories.map(category => renderCategory(category)).join("")}
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
        STORE.filter = event.target.dataset.id
        DOMHandler.load(HomePage)
    })
  }

  function listenSearch() {
    const search = document.querySelector(".js-search")
    search.addEventListener("keypress",(e) =>{
      if (e.key === 'Enter') {
        e.preventDefault();
        STORE.searchQuery = e.target.value.toLowerCase()
        DOMHandler.load(HomePage)
      }
  })

  }

  export const HomePage = {
    toString() {
      return render();
    },
    addListeners() {
        listenFilter();
        listenSearch();
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
