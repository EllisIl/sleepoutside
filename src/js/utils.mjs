import MainFooter from "./components/MainFooter.svelte";
import MainHeader from "./components/MainHeader.svelte";

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function renderHeaderFooter() {
  new MainFooter({
    target: document.querySelector("footer"),
  });
  new MainHeader({
    target: document.querySelector("header"),
    props: {getCartCount} 
  });
}

export function getCartCount() {
  let cart = getLocalStorage('so-cart');
  let num = 0;
  cart.forEach(item => {
    num += item.Quantity;
    console.log(item);
  });
  console.log(num);
  return num;
}

export function updateCartCount(cartCount) {
  const cartCountElement = document.getElementById('cart-count');

  // Update the content only if cartCount is greater than 0
  if (cartCount > 0) {
    cartCountElement.textContent = cartCount;
  } else {
    cartCountElement.textContent = '';
  }
}