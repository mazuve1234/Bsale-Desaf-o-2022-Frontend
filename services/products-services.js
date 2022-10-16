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
  console.log(this.categoryFilter)
  if ((this.categoryFilter === "" || this.categoryFilter === undefined) && this.searchQuery === "" ) return this.products

  if (this.categoryFilter === "" || this.categoryFilter === undefined) {
    return this.products.filter((product) => product.name.toLowerCase().includes(this.searchQuery));
  } ;
  
  return this.products.filter((product) => product.category ==  this.categoryFilter && product.name.toLowerCase().includes(this.searchQuery));
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
  categoryFilter: "",
  searchQuery: "",
};


