<script>
  import { getLocalStorage, formDataToJSON } from "../utils.mjs";
  import { checkout } from "../externalServices.mjs";
  // props
  export let key = "";

  // state vars
  let list = [];
  let itemTotal = 0;
  let shipping = 0;
  let tax = 0;
  let orderTotal = 0;

  // initial setup
  const init = function () {
    list = getLocalStorage(key);
    calculateItemSummary();
  };
  // calculate order subtotal from the cart items
  const calculateItemSummary = function () {
    // calculate the total of all the items in the cart
    const amounts = list.map((item) => item.FinalPrice);
    itemTotal = amounts.reduce((sum, item) => sum + item);
  };
  // calculate the shipping, tax, and orderTotal
  const calculateOrdertotal = function () {
    shipping = 10 + (list.length - 1) * 2;
    tax = (itemTotal * 0.06).toFixed(2);
    orderTotal = (
      parseFloat(itemTotal) +
      parseFloat(shipping) +
      parseFloat(tax)
    ).toFixed(2);
  };
  // transform the current cart contents to a simpler format keeping just the things we need to send to checkout
  const packageItems = function (items) {
    const simplifiedItems = items.map((item) => {
      console.log(item);
      return {
        id: item.Id,
        price: item.FinalPrice,
        name: item.Name,
        quantity: 1,
      };
    });
    return simplifiedItems;
  };

  function handleSubmit(e) {
    e.preventDefault();
    var myForm = document.forms[0];
    var chk_status = myForm.checkValidity();
    if (chk_status) {
      const json = formDataToJSON(this);
      handleCheckout(json);
    }
  };

  async function handleCheckout(json) {
    json.orderDate = new Date();
      json.orderTotal = orderTotal;
      json.tax = tax;
      json.shipping = shipping;
      json.items = packageItems(list);
      console.log(json);
      try {
        const res = await checkout(json);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
  }
  // initial setup
  init();
</script>

<form name="checkout" on:submit|preventDefault={handleSubmit}>
  <fieldset>
    <legend>Shipping</legend>
    <div class="checkout__name">
      <label for="fname">First Name*</label>
      <input name="fname" required pattern="[A-Za-z]+" value="John"/>
      <label for="lname">Last Name*</label>
      <input name="lname" required pattern="[A-Za-z]+" value="Doe"/>
    </div>
    <div class="checkout__address">
      <label for="street">Street*</label>
      <input name="street" required pattern="[A-Za-z0-9]+" value="Street"/>
      <label for="city">City*</label>
      <input name="city" required pattern="[A-Za-z]+" value="city"/>
      <label for="state">State*</label>
      <input name="state" required pattern="[A-Z]+" value="ST"/>
      <label for="zip">Zip*</label>
      <input name="zip" id="zip" required pattern="[0-9]+" on:blur={calculateOrdertotal} value="83440"/>
    </div>
  </fieldset>
  <fieldset>
    <legend>Payment</legend>
    <label for="cardNumber">Card number*</label>
    <input
      name="cardNumber"
      value="1234123412341234"
      required
      placeholder="No spaces or dashes!"
      maxlength="16"
      minlength="16"
      pattern="[0-9]+"
    />
    <label for="expiration">Expiration*</label>
    <input name="expiration" required placeholder="mm/yy" pattern="([0-9]+{2})/([0-9]+{2})" value="10/26"/>
    <label for="code">Security Code*</label>
    <input name="code" required placeholder="xxx" maxlength="3" minlength="3" pattern="[0-9]+" />
  </fieldset>
  <fieldset class="checkout-summary">
    <legend>Order Summary</legend>
    <ul>
      <li>
        <label for="cartTotal">Item Subtotal({list.length})</label>
        <p name="cartTotal" id="cartTotal">${itemTotal}</p>
      </li>
      <li>
        <label for="shipping">Shipping Estimate</label>
        <p id="shipping">${shipping}</p>
      </li>
      <li>
        <label for="tax">Tax</label>
        <p id="tax">${tax}</p>
      </li>
      <li>
        <label for="orderTotal"><b>Order Total</b></label>
        <p id="orderTotal">${orderTotal}</p>
      </li>
    </ul>
  </fieldset>

  <button id="checkoutSubmit" type="submit">Checkout</button>
</form>

<style>
  form {
    max-width: 500px;
    margin: 0 auto;
  }
  * + fieldset {
    margin-top: 1em;
  }
  label {
    display: block;
  }
  input {
    width: 100%;
    font-size: 1.2em;
  }

  .checkout-summary > ul {
    padding-left: 0;
    list-style-type: none;
  }
  .checkout-summary li {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

</style>