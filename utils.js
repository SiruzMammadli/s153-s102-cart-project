import { addToCart } from "./cart.js";

export function listenCartBtn() {
  const cartOpenBtn = document.querySelector(".cart_icon");
  const cartTabEl = document.querySelector(".cart_tab");
  const cartCloseBtn = document.querySelector(".close_btn");

  cartOpenBtn.addEventListener("click", () => {
    cartTabEl.style.translate = "0 0";
  });

  cartCloseBtn.addEventListener("click", () => {
    cartTabEl.style.translate = "100% 0";
  });

  document.addEventListener("click", (event) => {
    if (
      event.target &&
      !event.target.classList.contains("cart_tab") &&
      !event.target.classList.contains("shopping_icon")
    ) {
      cartTabEl.style.translate = "100% 0";
    }
  });
}

export function productDataToHTML(datas) {
  const productListEl = document.querySelector(".product_list");
  productListEl.innerHTML = "";
  datas.forEach((product) => {
    const { id, name, image, price } = product;
    productListEl.innerHTML += `
    <div class="product" data-id=${id}>
        <img width="200" height="200" src=${image}
            alt=${name}>
        <h3>${name}</h3>
        <p>${price}₼</p>
        <button class="add_to_cart_btn">ADD TO CART</button>
    </div>
    `;
  });
  getProductIdFromHTML(datas);
}

function getProductIdFromHTML(products) {
  const productEls = document.querySelectorAll(".product_list > .product");
  productEls.forEach((product) => {
    product.addEventListener("click", (event) => {
      if (event.target.classList.contains("add_to_cart_btn")) {
        const productId = Number(product.dataset.id);
        const currentProduct = products.find((p) => p.id === productId);
        addToCart(currentProduct);
      }
    });
  });
}
