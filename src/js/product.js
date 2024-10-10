import { getParam } from "./utils.mjs";
import productDetails from "./productDetails.mjs";

const productId = getParam("product");
productDetails(productId, ".product-detail");


document.getElementById('addToCart').addEventListener('click', function() {
    const cart = document.querySelector('.cart'); // Select the cart icon by its class
  
    // Add the bounce class to trigger the animation
    cart.classList.add('bounce');
    
    // Remove the bounce class after the animation ends so it can be triggered again
    cart.addEventListener('animationend', function() {
      cart.classList.remove('bounce');
    }, { once: true });
  });