# Bsale-Desafio-2022-Frontend
### Crear el archivo index.html
Este es el primer paso. Se establecerá la conexión con el navegador y se elegirá la página de estilo css.```bash
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
### Crear el encabezado y el guión.
El encabezado contendrá el nombre de la empresa, un botón para restablecer los filtros y una entrada de búsqueda. El script ejecutará el código javascript.
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
### Crear el DOMHandler
Esto manejará el DOM, permitiendo que los elementos HTML internos se representen cada vez que se ejecuta una función.
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

## Servicios

### Insertar la URL de la API y crear la función apiFetch
Esta función obtendrá los datos de la API, requiriendo su "url" (el lugar donde está alojado) y los puntos finales de cada ruta, declarados en la aplicación Rails.
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

### Extraer los datos de los productos y categorías
Dado que la función apiFetch devuelve una Promesa, se usará el dúo async/await para resolverlo.
```bash
import apiFetch from "./api-fetch.js";

export async function getProducts() {
  return await apiFetch("/product/index");
}

export async function getCategories() {
  return await apiFetch("/category/index");
}
```
Los datos deberían regresar dentro de la estructura de un JSON:
![image](https://user-images.githubusercontent.com/104693521/201512845-8f6423f6-ebff-4752-8cbf-8bc358497dfc.png)
![image](https://user-images.githubusercontent.com/104693521/201512921-fbe541d0-7ad5-445d-8afc-74bf62afc006.png)


### Rellenar los datos en matrices y cree la función de filtro.
La constante STORE almacenará las funciones de búsqueda, las matrices de productos y categorías y la función de filtro para que los datos enviados al usuario sean los correctos.```bash
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

### Inicializar la búsqueda y la página de inicio
Con esta función dentro de `index.js`, los productos y categorías se obtendrán de la API y la página de inicio y todos sus componentes se cargarán con el DOMHhandler.
```bash
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

```
![image](https://user-images.githubusercontent.com/104693521/201512954-002af3d7-a547-4621-8b61-399541a2c831.png)



## Pruebas
### Presencia de listado de categorías y productos
Con la ayuda de las bibliotecas JEST y Babel, las pruebas se pueden ejecutar en Javascript. Simplemente ejecute el comando `$npm test` en la consola para verificar si tuvo éxito.```bash
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

```



