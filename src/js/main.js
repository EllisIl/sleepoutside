import ProductList from "./components/ProductList.svelte";
import { renderHeaderFooter, getParam } from "./utils.mjs";

new ProductList({
  target: document.querySelector(".products"),
  props: { category: getParam("category") },
});
renderHeaderFooter();
