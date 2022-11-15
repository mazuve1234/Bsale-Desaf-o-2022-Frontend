import DOMHandler from "../dom-handler.js";
import { renderCategory, renderProduct } from "./renderComponents.js";
import { STORE } from "../services/products-services.js";

// Esta funcíon renderiza las listas de categorías y productos con sus respectivos estilos
function render() {
    const products = STORE.currentProductsFiltered().sort((a, b) => a.name.normalize().localeCompare(b.name.normalize()))
    const categories = STORE.currentCategories()
  return `
    <p class="content-xs mb-4"> Secret: Click in between the buttons to reset the category filters :) </p>
    <ul class="js-category-list">
      ${categories.map(category => renderCategory(category)).join("")}
    </ul>
    ${STORE.loader === true ? `<p>Cargando</p>` : ``} 
    <ul class="js-product-list">
      ${products.length >= 1 ? products.map(product => renderProduct(product)).join("") 
                              : `<li class="message"> NO SE HAN ENCONTRADOS PRODUCTOS CON LA BUSQUEDA DESEADA :(</li>`}
    </ul>
  `;
}

// Esta función inserta el listener que al hacer click en cada botón de categoría se añada el filtro de 
// categoría correspondiente al listado de productos
function listenFilter() {
  const filters = document.querySelector(".js-category-list")
  filters.addEventListener("click", (event) =>{
      event.preventDefault();
      STORE.categoryFilter = event.target.dataset.id
      console.log(STORE.categoryFilter)
      DOMHandler("#root").load(HomePage)
  })
}


// Esta función inserta el listener que al presionar el botor ENTER corra el servicio de fetchProducts y 
// se pueda extraer la lista de productos deseados de acuerdo a lo digitado en la barra de busqueda.
document.querySelector('.js-search').addEventListener("keypress", async function listenSearch(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      await STORE.fetchProducts(e.target.value.toLowerCase())
      DOMHandler("#root").load(HomePage)
    }
  })

// Esta función inserta el listener que al presionar el botón de RESET PAGE se actualize la página y vuelva
// a su estado inicial
function listenReset() {
  const reset = document.querySelector(".js-reset")
  if (reset) {
  reset.addEventListener("click",async (event) =>{
      event.preventDefault();
      STORE.categoryFilter = ""
      DOMHandler("#root").load(HomePage)
      location.reload()
  })}
}

// Este objeto convierte a String lo que se quiere renderizar y añade los listeners para manipular la 
// visualización de contenido en la página web.
export const HomePage = {
  toString() {
    return render();
  },
  addListeners() {
      listenFilter();
      listenReset();
  }
};
