import menuArray from "./data.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
let cart = [];

// --- Event Listener Delegation ---
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("add-btn")) {
    addItemClick(e.target.dataset.foodId);
  } else if (e.target.classList.contains("remove-btn")) {
    removeItem(e.target.dataset.uuid);
  } else if (e.target.id === "complete-btn") {
    document.getElementById("payment-form-section").classList.add("active");
    displayPaymentForm();
  } else if (e.target.id === "new-order-btn") {
    startNewOrder();
  }
});

// --- Menu Functions ---
function addItemClick(foodId) {
  const itemToAdd = menuArray.find((food) => food.id === parseInt(foodId));
  if (itemToAdd) {
    cart.push({ ...itemToAdd, uuid: uuidv4() });
    render();
  }
}

function getFeedHtml() {
  return menuArray
    .map(function (food) {
      const { name, price, ingredients, id, emoji } = food;
      return `
        <section class="food" id="food-${id}">
        <div class="food-details">
          <div class="food-emoji">${emoji}</div> 
          <div class="food-specs">
            <h2>${name}</h2>
            <p class="ingredients">${ingredients.join(", ")}</p>
            <p class="price">$${price}</p>
          </div>
          </div>
          <div><button class="add-btn" data-food-id="${id}">+</button></div>
        </section>
      `;
    })
    .join("");
}

// --- Cart Functions ---
function removeItem(uuid) {
  cart = cart.filter((item) => item.uuid !== uuid);
  render();
}

function getCompleteOrderHtml() {
  if (cart.length === 0) {
    return "";
  }
  const orderItemHtml = cart
    .map(
      (item) => `
    <div class="order-item">
    <div>
    <p>${item.name}</p>
    <p class="remove-btn" data-uuid ="${item.uuid}">remove</p>
    </div>
    <p class="item-price">$${item.price}</P>
    </div>
    `
    )
    .join("");
  const totalPrice = cart.reduce(
    (total, currentItem) => total + currentItem.price,
    0
  );
  return `
  <div class="checkout">
  <h2 class="title">Your Order</h2>
  <div id="items-list">
${orderItemHtml}
  </div>
  <div class="total">
  <p>Total price</p>
  <p class="total-calculated-price">
$${totalPrice}
  </p>
  </div>
    <button class="complete-btn" id="complete-btn">Complete Order</button>
    </div>
    `;
}

// --- Payment and Modal Functions ---
function payHtml() {
  return `
    <form class="payment-form" id="payment-form"> 
    <h2 class="payment-heading">Enter card details</h2>
    <div id="payment-error-message"></div>
    <input type="text" name="fullname" placeholder="Enter your name on card" required>
    <input type="text" name="cardnumber" placeholder="Enter your card number" required minlength="16" maxlength="16">
    <input type="text" name="cardcvv" placeholder="Enter CVV" required minlength="3" maxlength="3">
    <button type="submit" id="pay-btn" class="pay-btn">Pay</button>
    </form>
    `;
}

function displayPaymentForm() {
  const modal = document.getElementById("payment-form-section");
  modal.innerHTML = payHtml();

  document
    .getElementById("payment-form")
    .addEventListener("submit", displayOrderMessage);
}

function displayOrderMessage(e) {
  e.preventDefault();
  const form = document.getElementById("payment-form");
  const fullNameInput = form.elements["fullname"];
  const cardNumberInput = form.elements["cardnumber"];
  const cvvInput = form.elements["cardcvv"];

  const nameValue = fullNameInput.value.trim();
  const isNameEntered = nameValue.length > 0;
  const isNameValid = /^[A-Za-z\s\-]+$/.test(nameValue);
  const isCardNumberValid = /^\d{16}$/.test(cardNumberInput.value.trim());
  const isCardCvvValid = /^\d{3}$/.test(cvvInput.value.trim());
  const errorMessageContainer = document.getElementById(
    "payment-error-message"
  );
  errorMessageContainer.innerHTML = "";

  if (!isNameEntered || !isNameValid) {
    errorMessageContainer.innerHTML = "Please enter your name on card!";
    return;
  }
  if (!isCardNumberValid) {
    errorMessageContainer.innerHTML = "Please enter valid card number!";
    return;
  }
  if (!isCardCvvValid) {
    errorMessageContainer.innerHTML = "Plese enter valid card cvv!";
    return;
  }

  // --- SUCCESS MESSAGE DISPLAY LOGIC ---
  const userName = fullNameInput.value.split(" ")[0];
  const modal = document.getElementById("payment-form-section");

  modal.innerHTML = `
    <div class="confirmation-message-box">
        <p class="confirmation-message">Thank you, ${userName}! Your order is on the way!</p>
        <button id="new-order-btn">Start New Order</button>
    </div>
    `;
}

function startNewOrder() {
  cart = [];
  document.getElementById("payment-form-section").classList.remove("active");
  document.getElementById("payment-form-section").innerHTML = "";
  render();
}

// --- Render Logic ---
function render() {
  document.getElementById("main").innerHTML = getFeedHtml();
  document.getElementById("checkout").innerHTML = getCompleteOrderHtml();
}

// Render
render();
