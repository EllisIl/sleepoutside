import { setLocalStorage, getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  let cartItems = getLocalStorage("so-cart");

  if (!cartItems || cartItems.length === 0) {
    document.querySelector(
      ".product-list"
    ).innerHTML = `<p>Your cart is empty.</p>`;
    return; // exit function early if there are no items
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  attachRemoveItemListeners();
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <span class="remove-item" data-id="${item.Id}">X</span>

</li>`;

  return newItem;
}

function attachRemoveItemListeners() {
  const removeButtons = document.querySelectorAll(".remove-item");
  removeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const itemId = event.target.getAttribute("data-id");
      removeItemFromCart(itemId);
    });
  });
}

function removeItemFromCart(itemId) {
  let cartItems = getLocalStorage("so-cart");

  // Filter out the item with the matching ID
  cartItems = cartItems.filter((item) => item.Id !== itemId);

  // Update local storage with the new cart array
  setLocalStorage("so-cart", cartItems);

  // Re-render the cart to reflect the changes
  renderCartContents();
}

renderCartContents();

document.addEventListener("click", (event) => {

})