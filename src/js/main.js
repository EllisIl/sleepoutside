import ProductList from "./components/ProductList.svelte";
import { renderHeaderFooter, getParam } from "./utils.mjs";

new ProductList({
  target: document.querySelector(".products"),
  prop: { category: getParam("category") },
});
renderHeaderFooter();
