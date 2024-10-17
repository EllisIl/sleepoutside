import { getData, findProductById } from "./productData.mjs";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { cartCount } from  "./stores.mjs";


export default async function productDetails(productId, selector) { // entrypoint (use this function)
    const productInfo = await findProductById(productId);
    if (productInfo != null) {
        productDetailsTemplate(productInfo);
    } else {
        document.querySelector("#productName").innerHTML = "Error: The Product code used does not exist. Check your code and then try again";

        const hidden1 = document.querySelector("#productNameWithoutBrand");
        const hidden2 = document.querySelector("#productImage");
        const hidden3 = document.querySelector("#productFinalPrice");
        const hidden4 = document.querySelector("#productColorName");
        const hidden5 = document.querySelector("#productDescriptionHtmlSimple");
        const hidden6 = document.querySelector("#addToCart");
        const hidden7 = document.querySelector("#suggestedRetailPrice");
        const hidden8 = document.querySelector("#discountAmount");

        hidden1.style.display = "none";
        hidden2.style.display = "none";
        hidden3.style.display = "none";
        hidden4.style.display = "none";
        hidden5.style.display = "none";
        hidden6.style.display = "none";
        hidden7.style.display = "none";
        hidden8.style.display = "none";
    }

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

