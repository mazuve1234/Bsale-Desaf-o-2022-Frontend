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
  console.log(products)
}

function currentProducts () {

  if (this.filter === "" || this.filter === undefined) return this.products;
  
  return this.products.filter((product) => product.category ==  this.filter);
}

async function fetchCategories() {
  const categories = await getCategories();
  this.categories = categories;
  console.log(categories)
}

function currentCategories () {
  return this.categories
}

export const STORE = {
  products: [],
  fetchProducts,
  currentProducts,
  categories: [],
  fetchCategories,
  currentCategories,
  filter: "",
};


