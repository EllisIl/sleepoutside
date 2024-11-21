import ProductList from "./components/ProductList.svelte";
import { renderHeaderFooter } from "./utils.mjs";

new ProductList({
  target: document.querySelector(".products"),
  prop: { category: "tents" },
});
renderHeaderFooter();

export function handleSearch() {
  const filterCriteria = document.getElementById("#searchInput").value;
  fetchAndDisplayProducts(filterCriteria);
}
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

  const sortedProducts = [products].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "price") {
      return a.price - b.price;  
    }
  });

  displayProducts(sortedProducts);
}
