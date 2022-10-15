import apiFetch from "./api-fetch.js";

export async function getProducts() {
  return await apiFetch("/products/index");
}

export async function getCategories() {
  return await apiFetch("/categories/index");
}

