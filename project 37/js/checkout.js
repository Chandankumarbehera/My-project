const cartDetail = localStorage.getItem("cart");
let cart = JSON.parse(cartDetail) || [];
console.log(cart);
const container = document.getElementById("cart-details");

updateCartDetails();

function updateCartDetails() {
  container.innerHTML = "";

  let totalAmount = 0;

  cart.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("row", "border-bottom", "py-2");

    const nameCol = document.createElement("div");
    nameCol.classList.add("col-4", "text-start");
    nameCol.textContent = item.name;

    const quantityCol = document.createElement("div");
    quantityCol.classList.add(
      "col-4",
      "d-flex",
      "align-items-center",
      "justify-content-center"
    );
    quantityCol.innerHTML = `
      <button class="btn btn-secondary me-2" onclick="decreaseQuantity(${item.id})">-</button>
      <span id="quantity${item.id}">${item.quantity}</span>
      <button class="btn btn-secondary ms-2" onclick="increaseQuantity(${item.id})">+</button>
    `;

    const priceCol = document.createElement("div");
    priceCol.classList.add("col-2", "text-end");
    const itemTotal = item.price * item.quantity;
    priceCol.textContent = `Price: ₹${itemTotal}`;
    totalAmount += itemTotal;

    const removeCol = document.createElement("div");
    removeCol.classList.add("col-2", "text-end");
    const removeButton = document.createElement("button");
    removeButton.classList.add("btn", "btn-danger");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => removeItem(item.id));
    removeCol.appendChild(removeButton);

    div.appendChild(nameCol);
    div.appendChild(quantityCol);
    div.appendChild(priceCol);
    div.appendChild(removeCol);

    container.appendChild(div);
  });

  document.getElementById("totalAmountValue").textContent = totalAmount;
}

function decreaseQuantity(productId) {
  const index = cart.findIndex((item) => item.id === productId);
  if (index !== -1 && cart[index].quantity > 1) {
    cart[index].quantity--;
    updateQuantityDisplay(productId, cart[index].quantity);
    updateCartDetails();
    updateLocalStorage();
    updateNavbarCartCount();
  }
}

function increaseQuantity(productId) {
  const index = cart.findIndex((item) => item.id === productId);
  if (index !== -1) {
    cart[index].quantity++;
    updateQuantityDisplay(productId, cart[index].quantity);
    updateCartDetails();
    updateLocalStorage();
    updateNavbarCartCount();
  }
}

function updateQuantityDisplay(productId, quantity) {
  document.getElementById(`quantity${productId}`).textContent = quantity;
}

function updateNavbarCartCount() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCountSpan = document.getElementById("cartCount");
  let totalCount = 0;

  if (cartItems && cartItems.length > 0) {
    totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }

  cartCountSpan.textContent = totalCount;
}

window.addEventListener("load", updateNavbarCartCount);

function removeItem(productId) {
  cart = cart.filter((item) => item.id !== productId);
  updateCartDetails();
  updateLocalStorage();
}

function updateLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

document
  .getElementById("paymentButton")
  .addEventListener("click", processPayment);

function processPayment() {
  const options = {
    key: "rzp_test_EvUJMGFjrehmzn",
    amount:
      parseInt(document.getElementById("totalAmountValue").textContent) * 100,
    currency: "INR",
    name: "M Cart",
    description: "M Cart",
    image: "../assets/logo.jpeg",
    handler: function (response) {
      alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
    },
    prefill: {
      name: "Customer Name",
      email: "customer@example.com",
      contact: "9999999999",
    },
    theme: {
      color: "#3399cc",
    },
    modal: {
      onOpen: function () {
        document.body.style.overflow = "hidden";
      },
      onClose: function () {
        document.body.style.overflow = "auto";
      },

      options: {
        width: "90%",
        height: "90%",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        overflow: "hidden",
        padding: "10px",
        boxSizing: "border-box",
      },
    },
  };
  const rzp = new Razorpay(options);
  rzp.open();
}