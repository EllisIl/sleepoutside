import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";

function addProductToCart(product) {
  let oldStorage = getLocalStorage("so-cart");
  if (oldStorage) {
    oldStorage.push(product);
  } else {
    oldStorage = {product};
  }
  setLocalStorage("so-cart", oldStorage);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
