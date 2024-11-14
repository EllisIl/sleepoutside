import { renderHeaderFooter, getParam } from "./utils.mjs";
import { login } from "./auth.mjs"

const submitForm = document.getElementById("login");

submitForm.addEventListener("click", () => {
    event.preventDefault();
    const redirect = getParam("redirect");
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    console.log(username, password);
    login({username, password}, redirect);
});

renderHeaderFooter();