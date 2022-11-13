import apiFetch from "./api-fetch.js";

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

function currentProductsFiltered () {
  if (this.categoryFilter === "" || this.categoryFilter === undefined) return this.products

  // if (this.categoryFilter === "" || this.categoryFilter === undefined) {
  //   return this.products.filter((product) => product.name.toLowerCase().includes(this.searchQuery));
  // } ;
  
  return this.products.filter((product) => product.category ==  this.categoryFilter);
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
  loader: true,
  fetchProducts,
  currentProductsFiltered,
  categories: [],
  fetchCategories,
  currentCategories,
  categoryFilter: "",
  searchQuery: "",
};


