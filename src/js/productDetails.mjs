import { getData, findProductById } from "./productData.mjs";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";

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
    let storage = getLocalStorage("so-cart") || [];

    const existingProduct = storage.find((item) => item.Id === product.Id);

    if (existingProduct) {
        existingProduct.Quantity += 1;
    } else {
        product.Quantity = 1;
        storage.push(product);
    }
    
    setLocalStorage("so-cart", storage);
}

function productDetailsTemplate(product) { // insert the product specifics into a string of markup
    //name, name without brand, product img , price, color, description
    // get discounted price
    let discount__amount = Math.floor(((product.SuggestedRetailPrice - product.FinalPrice) / product.SuggestedRetailPrice) * 100) + "%";
    document.querySelector("#productName").innerHTML = product.Name;
    document.querySelector("#productNameWithoutBrand").innerHTML = product.NameWithoutBrand;
    document.querySelector("#productImage").src = product.Image;
    document.querySelector("#productFinalPrice").innerHTML = "$" + product.FinalPrice;
    document.querySelector("#productColorName").innerHTML = product.Colors[0].ColorName;
    document.querySelector("#productDescriptionHtmlSimple").innerHTML = product.DescriptionHtmlSimple;
    document.querySelector("#addToCart").dataset.id = product.Id;
    document.querySelector("#suggestedRetailPrice").innerHTML = "$" + product.SuggestedRetailPrice;
    document.querySelector("#discountAmount").innerHTML = discount__amount + " OFF";
}




// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);

