import { getProducts } from "./fetches.js";
import { listenCartBtn, productDataToHTML } from "./utils.js";

listenCartBtn();

async function main() {
  const products = await getProducts();

  if (products.length) {
    productDataToHTML(products);
  }
}

main();