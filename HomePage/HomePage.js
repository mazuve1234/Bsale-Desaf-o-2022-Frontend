import DOMHandler from "../dom-handler.js";
import { renderCategory, renderProduct } from "./renderComponents.js";
import { STORE } from "../services/products-services.js";

function render() {
    const products = STORE.currentProductsFiltered().sort((a, b) => a.name.normalize().localeCompare(b.name.normalize()))
    const categories = STORE.currentCategories()
  return `
    <p class="content-xs mb-4"> Secret: Click in between the buttons to reset the category filters :) </p>
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
      STORE.categoryFilter = event.target.dataset.id
      console.log(STORE.categoryFilter)
      DOMHandler("#root").load(HomePage)
  })
}

async function listenSearch() {
  const search = document.querySelector(".js-search")
  if (search) {
  search.addEventListener("keypress",async (e) =>{
    if (e.key === 'Enter') {
      e.preventDefault();
      await STORE.fetchProducts(e.target.value.toLowerCase())
      DOMHandler("#root").load(HomePage)
    }
  })}
}

function listenReset() {
  const reset = document.querySelector(".js-reset")
  if (reset) {
  reset.addEventListener("click",(event) =>{
      event.preventDefault();
      STORE.categoryFilter = ""
      STORE.searchQuery = ""
      DOMHandler("#root").load(HomePage)
  })}
}

export const HomePage = {
  toString() {
    return render();
  },
  addListeners() {
      listenFilter();
      listenSearch();
      listenReset();
  }
};
