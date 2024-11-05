import ProductList from "../js/components/ProductList.svelte";
import { renderHeaderFooter, getParam } from "../js/utils.mjs";

const type = getParam("category");

new ProductList({
  target: document.querySelector(".products"),
  props: { category: type },
});
renderHeaderFooter();

document.getElementById("searchForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const query = document.getElementById("searchInput").value;
  
  try {
    const response = await fetch(VITE_SERVER_URL + `?search=${encodeURIComponent(query)}`);
    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    console.error("Error fetching search results:", error);
  }
});

// Fetch and display products (e.g., after a search or initial load)
async function fetchAndDisplayProducts(query = "") {
  try {
    const response = await fetch(VITE_SERVER_URL + `?search=${encodeURIComponent(query)}`);
    products = await response.json();
    sortAndDisplayProducts(); 
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

document.getElementById("sortOptions").addEventListener("change", sortAndDisplayProducts);

function sortAndDisplayProducts() {
  const sortBy = document.getElementById("sortOptions").value;

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "price") {
      return a.price - b.price;  
    }
  });

  displayProducts(sortedProducts);
}
