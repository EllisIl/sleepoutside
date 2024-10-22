import { setLocalStorage, getLocalStorage, renderHeaderFooter, updateCartCount } from "./utils.mjs";

function renderCartContents() {
  let cartItems = getLocalStorage("so-cart");

  if (!cartItems || cartItems.length === 0) {
    document.querySelector(
      ".product-list"
    ).innerHTML = `<p>Your cart is empty.</p>`;
    showCartTotal(cartItems);
    return; // exit function early if there are no items
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  showCartTotal(cartItems);

  attachRemoveItemListeners();
}

function cartItemTemplate(item) {
  const newItem = `<li class='cart-card divider'>
  <a href='#' class='cart-card__image'>
    <img
      src='${item.Image}'
      alt='${item.Name}'
    />
  </a>
  <a href='#'>
    <h2 class='card__name'>${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: ${item.Quantity}</p>
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
      decreaseItemQuantity(itemId);
    });
  });
}

function decreaseItemQuantity(itemId) {
  let cartItems = getLocalStorage("so-cart");

  // find the item in the cart
  const existingProduct = cartItems.find((item) => item.Id === itemId);

  if (existingProduct) {
    if (existingProduct.Quantity > 1) {
      // decrease quantity if it's greater than 1
      existingProduct.Quantity -= 1;
    } else {
      // if quantity is 1, remove the item completely
      cartItems = cartItems.filter((item) => item.Id !== itemId);
    }

    // update the cart in localStorage
    setLocalStorage("so-cart", cartItems);
  }

  // re-render the cart to reflect the changes
  let cartCount = 0;
  cartItems.forEach(item => {
    cartCount += item.Quantity;
  });
  renderCartContents();
  updateCartCount(cartCount);
}

function showCartTotal(cartItems) {
  const cartFooter = document.querySelector(".cart-footer");
  const cartTotalElement = document.getElementById("cart-total");

  if (cartItems.length > 0) {
    // calculate the total price
    const total = cartItems.reduce(
      (sum, item) => (sum + item.FinalPrice) * item.Quantity,
      0
    );

    // update the total in the DOM
    cartTotalElement.textContent = total.toFixed(2);

    // show the cart-footer element
    cartFooter.classList.add("show");
  } else {
    // hide the footer if no items are in the cart
    cartFooter.classList.remove("show");
  }
}

renderCartContents();
renderHeaderFooter();