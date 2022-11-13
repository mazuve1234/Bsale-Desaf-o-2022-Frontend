import DOMHandler from "./dom-handler.js";
import { HomePage } from "./HomePage/HomePage.js";
import { STORE } from "./services/products-services.js";

// Esta función es llamada en el index.html y sirve como el script necesario para realizar las
// llamadas al API y cargar la lista de productos y categorías en la página web.
async function init() {
  try {
    await STORE.fetchProducts();
    await STORE.fetchCategories();
    DOMHandler("#root").load(HomePage);
  } catch (error) {
    console.log(error)
  }
}

init()
