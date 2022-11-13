import apiFetch from "./api-fetch.js";

// Estas funciones utilizan la función de apiFetch para conectar con el API y extraer los datos.
export async function getProductsSearched(id) {
  return await apiFetch(`/product/search?query=${id}`);
}

export async function getCategories() {
  return await apiFetch("/category/index");
}

async function fetchProducts(id='') {
  // this.loader = true;
  const products = await getProductsSearched(id);
  this.products = products;
  this.products !== [] ? this.loader = false : this.loader = true;
}

// Esta función filtra la lista de productos de acuerdo a la categoría deseada
function currentProductsFiltered () {
  if (this.categoryFilter === "" || this.categoryFilter === undefined) return this.products
  
  return this.products.filter((product) => product.category ==  this.categoryFilter);
}

async function fetchCategories() {
  const categories = await getCategories();
  this.categories = categories;
}

function currentCategories () {
  return this.categories
}

// El STORE guarda todos los datos extraídos de la API y los filtros necesarios para renderizar 
// los datos deseados en el HomePage
export const STORE = {
  products: [],
  loader: true,
  fetchProducts,
  currentProductsFiltered,
  categories: [],
  fetchCategories,
  currentCategories,
  categoryFilter: "",
};


