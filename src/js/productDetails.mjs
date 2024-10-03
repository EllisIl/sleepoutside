import { getData } from "./productData.mjs";
const productData = getData();

export default function productDetails(productId, selector) { // entrypoint (use this function)
    productDetailsTemplate(productData);
}

// add to cart button event handler
async function addToCartHandler(e) {
const product = await findProductById(e.target.dataset.id);
    addProductToCart(product);
  }
  
function addProductToCart(product) { // from product.js
    setLocalStorage("so-cart", product);
}

function productDetailsTemplate(product) { // insert the product specifics into a string of markup
    //name, name without brand, product img , price, color, description
    document.querySelector("#productName").innerHTML = product.Name;
    document.querySelector("#productNameWithoutBrand").innerHTML = product.NameWithoutBrand;
    document.querySelector("#productImage").innerHTML = product.Image;
    document.querySelector("#productFinalPrice").innerHTML = product.FinalPrice;
    document.querySelector("#productColorName").innerHTML = product.Color;
    document.querySelector("#productDescriptionHtmlSimple").innerHTML = product.Desc;
}


// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);

