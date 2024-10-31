import ProductList from "../js/components/ProductList.svelte";
import { renderHeaderFooter, getParam } from "../js/utils.mjs";

const type = getParam("category");

new ProductList({
  target: document.querySelector(".products"),
  props: { category: type },
});
renderHeaderFooter();