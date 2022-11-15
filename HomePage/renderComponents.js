
// Esta función estructura los datos recibidos de cada producto.
export function renderProduct(product) {
    return  `
    <div>
    <li>
      <img class="product-image" src=${product.url_image ? product.url_image : "https://thumbs.dreamstime.com/z/link-not-found-12739222.jpg"} alt="product_image"/>
      <div class="product-card">
        <p class="content-sm bold">${product.name}</p>
        <div class="flex gap-4">
          ${product.discount ? `<p class="price-before">$ ${(product.price)}</p>`: `<p> $ ${(product.price)}</p>`}
          ${product.discount ? `<p class="price-after">$ ${Math.round((product.price) * (1-(product.discount/100))).toFixed(2)}</p>` : ""}
        </div>
      </div>
    </li>
    </div>`
  }

// Esta función estructura los datos recibidos de cada categorpia
export function renderCategory(category) {
    return `
    <button class="category-button" data-id=${category.id}> ${category.name.toUpperCase()} </button>
    `
}
