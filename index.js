import DOMHandler from "./dom-handler.js";
import { HomePage } from "./HomePage/HomePage.js";
import { STORE } from "./services/products-services.js";

  
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
