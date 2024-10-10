import ProductList from "./components/ProductList.svelte";

new ProductList({
  target: document.querySelector(".products"),
  prop: { category: "tents" },
});
