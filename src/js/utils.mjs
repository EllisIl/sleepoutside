import MainFooter from "./components/MainFooter.svelte";
import MainHeader from "./components/MainHeader.svelte";
const baseURL = import.meta.env.VITE_SERVER_URL;


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
  let cart = getLocalStorage('so-cart') || [];
  let num = 0;
  cart.forEach(item => {
    num += item.Quantity;
  });
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

export function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

export async function checkout(payload) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };
  return await fetch(baseURL, options).then(convertToJson);
}

export function alertMessage(message, scroll = true, duration = 3000) {
  const alert = new AlertMessage({
      target: document.querySelector("body"),
      anchor: document.querySelector("main"),
      props: {
      message,
      },
  });
  // make sure they see the alert by scrolling to the top of the window
  //we may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if (scroll) window.scrollTo(0, 0);

  document.body.prepend(alert);
  
  // left this here to show how you could remove the alert automatically after a certain amount of time.
  // setTimeout(function () {
  //   alert.$destroy();
  // }, duration);
  }
              
