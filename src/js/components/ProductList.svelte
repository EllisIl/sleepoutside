<script>
   import { getData } from "../productData.mjs";
    import productDetailsTemplate from "../productDetails.mjs";
    export let category;

    // Fetch the products based on the category
    let promise = getData(category);
</script>

<h2>Top product: {category}</h2>
{#await promise} 
    Loading
{:then products}
<ul class="product-list">
    {#each products as product}
    <li class="product-card">
        <a href="/product_pages/product.html?product={product.Id}">
            <img
              src={product.Images.PrimaryMedium}
              alt={product.Name}
            />
            <h3 class="card__brand">{product.Brand.Name}</h3>
            <h2 class="card__name">{product.NameWithoutBrand}</h2>
            <p class="product-card__price">${product.FinalPrice}</p>
            {#if product.SuggestedRetailPrice > product.FinalPrice}
                <span class="discount-flag">
                    {Math.floor(((product.SuggestedRetailPrice - product.FinalPrice) / product.SuggestedRetailPrice) * 100)}% OFF
                </span>
            {/if}
        </a>     
    </li>
    {/each}
</ul>
{/await}

