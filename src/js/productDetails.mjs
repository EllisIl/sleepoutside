import { getData, findProductById } from "./productData.mjs";

export default async function productDetails(productId, selector) { // entrypoint (use this function)
    const productInfo = await findProductById(productId);
    
    productDetailsTemplate(productInfo);
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
    document.querySelector("#productImage").src = product.Image;
    document.querySelector("#productFinalPrice").innerHTML = product.FinalPrice;
    document.querySelector("#productColorName").innerHTML = product.Colors[0].ColorName;
    document.querySelector("#productDescriptionHtmlSimple").innerHTML = product.DescriptionHtmlSimple;
}


// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);

