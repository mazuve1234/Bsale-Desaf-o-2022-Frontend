import apiFetch from "./api-fetch.js";

export async function getProducts() {
  return await apiFetch("/product/index");
}

export async function getCategories() {
  return await apiFetch("/category/index");
}

async function fetchProducts() {
  const products = await getProducts();
  this.products = products;
}

function currentProductsFiltered () {
  if ((this.filter === "" || this.filter === undefined) && this.searchQuery === "" ) return this.products

  if (this.filter === "" || this.filter === undefined) {
    return this.products.filter((product) => product.name.toLowerCase().includes(this.searchQuery));
  } ;
  
  return this.products.filter((product) => product.category ==  this.filter && product.name.toLowerCase().includes(this.searchQuery));
}



async function fetchCategories() {
  const categories = await getCategories();
  this.categories = categories;
}

function currentCategories () {
  return this.categories
}

export const STORE = {
  products: [],
  fetchProducts,
  currentProductsFiltered,
  categories: [],
  fetchCategories,
  currentCategories,
  filter: "",
  searchQuery: "",
};


