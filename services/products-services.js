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
  return this.products;
}

export const STORE = {
  products: [],
  fetchProducts,
  currentProducts
};


