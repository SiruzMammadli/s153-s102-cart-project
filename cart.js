const cartListElement = document.querySelector(".cart_list");
const cartResetBtn = document.querySelector(".reset_cart_btn");
const cartItems = cartListElement.querySelectorAll(".cart_item");

let cartList = JSON.parse(localStorage.getItem("shopping_cart")) ?? [];
if (cartList.length) refreshHTML();

cartResetBtn.addEventListener("click", () => {
  cartList = [];
  refreshHTML();
});

export function addToCart(product, quantity = 1) {
  const newProduct = {
    ...product,
    quantity,
  };

  const existItem = cartList.findIndex((item) => {
    return item.id === product.id;
  });

  if (cartList.length === 0) {
    cartList.push(newProduct);
  } else if (existItem < 0) {
    cartList.push(newProduct);
  } else {
    cartList[existItem] = {
      ...cartList[existItem],
      quantity: cartList[existItem].quantity + quantity,
    };
  }
  refreshHTML();
}

function cartDataToHTML() {
  cartListElement.innerHTML = "";

  if (cartList.length) {
    cartList.forEach((item) => {
      cartListElement.innerHTML += `
            <div class="cart_item" data-id=${item.id}>
                <div class="image">
                    <img src=${item.image} alt="">
                </div>
                <div class="name">${item.name}</div>
                <div class="price">${item.price} AZN</div>
                <div class="quantity">
                    <span class="minus">-</span>
                    <span class="count">${item.quantity}</span>
                    <span class="plus">+</span>
                </div>
                <i class="fa-solid fa-trash trash"></i>
            </div>
            `;
    });
  }
}

function refreshHTML() {
  localStorage.setItem("shopping_cart", JSON.stringify(cartList));
  cartDataToHTML();
  cartIconCount();
  getCartTotalPrice();
}

function cartIconCount() {
  const cartCountElement = document.querySelector(".cart_icon > span");
  cartCountElement.innerText = cartList.length;
}

function getCartTotalPrice() {
  const totalPriceElement = document.querySelector(".total_price");

  let sum = 0;
  cartList.forEach((item) => {
    sum = sum + item.price * item.quantity;
  });

  totalPriceElement.innerText = sum.toFixed(2);
}

cartListElement.addEventListener("click", (e) => {
  const minusEl = e.target.classList.contains("minus");
  if (
    e.target.classList.contains("minus") ||
    e.target.classList.contains("plus")
  ) {
    const itemId = Number(e.target.parentNode.parentNode.dataset.id);
    const existItemIndex = cartList.findIndex((p) => p.id === itemId);

    if (existItemIndex > -1) {
      increaseOrDecreaseQuantity(minusEl ? "minus" : "plus", existItemIndex);
    }
  }
});

function increaseOrDecreaseQuantity(type, id) {
  let quantity = cartList[id].quantity;
  if (type === "minus") {
    cartList[id].quantity = quantity > 1 ? quantity - 1 : 1;
  }
  if (type === "plus") {
    cartList[id].quantity = quantity + 1;
  }
  refreshHTML();
}
