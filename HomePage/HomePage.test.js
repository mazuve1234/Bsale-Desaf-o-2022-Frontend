import { beforeEach, expect } from "@jest/globals";
import DOMHandler from "../dom-handler.js";
import { HomePage } from "./HomePage.js";




let App;

beforeEach(() => {
  // Render the component on the screen
  document.body.innerHTML = `<div id="root"></div>`;
  App = DOMHandler("#root");
  App.load(HomePage);

});

test("List renders on the DOM", () => {
  // Capture some elements
  const categoryList = document.querySelector(".js-category-list");
  const productList = document.querySelector(".js-product-list");

  // Assert some state about the elements on the screen.

  expect(categoryList).not.toBeNull();
  expect(productList).not.toBeNull();
});
