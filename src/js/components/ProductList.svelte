<script>
    import { getData } from "../productData.mjs"
    
    export let category;

    let promise = getData(category);
</script>

<h2>Top product: {category}</h2>
{#await promise}
    Loading
{:then products}
<ul class="product-list">
    {#each products.slice(0, 4) as product}
    <li class="product-card">
        <a href="product_pages/product.html?product={product.Id}">
            <img
              src={product.Image}
              alt={product.Name}
            />
            <h3 class="card__brand">{product.Brand.Name}</h3>
            <h2 class="card__name">{product.NameWithoutBrand}</h2>
            <p class="product-card__price">${product.FinalPrice}</p>
        </a>     
    </li>
    {/each}
</ul>
{/await}