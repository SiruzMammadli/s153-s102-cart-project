import { getProducts } from "./fetches.js";
import { listenCartBtn, listenSearchInput, listenSortingSelect, productDataToHTML } from "./utils.js";
import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';

const swiper = new Swiper('.swiper', {
 grabCursor: true,
  speed: 1000,
  spaceBetween: 100,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  }
});



listenCartBtn();

async function main() {
  const products = await getProducts();

  if (products.length) {
    productDataToHTML(products);
    listenSearchInput(products);
    listenSortingSelect(products);
  }
}

main();