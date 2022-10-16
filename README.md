# Bsale-Desafio-2022-Frontend
### Create the html index page
This is the first step. The connection with the browser will be established and the css style page will be chosen.
```bash
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="css/style.css" />
    <title>Bsale-desafío</title>
  </head>
  <body>
  </body>
</html>
```
### Create the header and script
The header will contain the name of the company, a button for resetting the filters and a search input. The script will execute the javascript code.
```bash
  <body>
    <main class="section">
        <section class="container">

          <div class="flex space-between container-header">
            <h1 class="heading text-center mb-2 heading--lg blue-header bold">Bsale</h1>
            <button class="js-reset button-style">Reset Page</button>
            <div>
              <label for="search">Press <span class="bold">Enter</span> to run the Search</label>
              <input id="search" type="form" class="js-search" placeholder="Empty shows all products"/>
            </div>
        </div>
            <div id="root"></div>
            <script type="module" src="index.js"></script>

    
      </section>
    </main>
  </body>
```
### Create the DOMHandler
This will handle the DOM, allowing the inner HTML elements to be rendered each time a function is executed. 
```bash
  const DOMHandler = function (parentSelector) {
  const parent = document.querySelector(parentSelector);

  if (!parent) throw new Error("Parent not found");

  return {
    module: null,
    load(module) {
      this.module = module;
      parent.innerHTML = module;
      module.addListeners();
    },
    reload() {
      this.load(this.module);
    },
  };
};

export default DOMHandler;
```

## Services

### Insert the API url and create the apiFetch function
This function will fetch the data from the API, requiring its "url"(the place where it's hosted) and endpoints from each route, declared in the Rails app.
```bash
import { BASE_URI} from "../config.js";

export default async function apiFetch(endPoint, {method, headers, body} = {}) {


  const config = {
    method: method || (body ? "POST": "GET"),
  }

  const response = await fetch(BASE_URI+endPoint, config);
  let data;
  if (!response.ok) {
    try {
      data = await response.json();
    } catch (error) {
      throw new Error(response.statusText);
    }
    
    throw new Error(JSON.stringify(data));
  }

  try {
    data = await response.json();
  } catch (error) {
    data = response.statusText;
  }
  return data;
}
```

### Fetch the data
Since the apiFetch function returns a Promise, the async/await duo will be used to resolve it.
```bash
import apiFetch from "./api-fetch.js";

export async function getProducts() {
  return await apiFetch("/product/index");
}

export async function getCategories() {
  return await apiFetch("/category/index");
}
```

### Fill the data on arrays and create the filter function
The constant STORE will store the fetch functions, the product and category arrays and the filter function so the data sent to the user is the correct one.
```bash
async function fetchProducts() {
  const products = await getProducts();
  this.products = products;
}

function currentProductsFiltered () {
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
```



