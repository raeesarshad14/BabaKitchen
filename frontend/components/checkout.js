class CheckoutPage {
  constructor() {
    this.cart = new Cart();
  }

  render() {
    const subtotal = this.cart.getTotal();
    const tax = subtotal * 0.06;
    const delivery = subtotal > 0 ? 3.99 : 0;
    const total = subtotal + tax + delivery;

    return `
      <div class="checkout-wrapper">

        <!-- ORDER SUMMARY -->
        <div class="checkout-summary">
          <h2>Order Summary</h2>

          <div class="summary-row">
            <span>Subtotal:</span>
            <span>$${subtotal.toFixed(2)}</span>
          </div>

          <div class="summary-row">
            <span>Tax (6%):</span>
            <span>$${tax.toFixed(2)}</span>
          </div>

          <div class="summary-row">
            <span>Delivery Fee:</span>
            <span>$${delivery.toFixed(2)}</span>
          </div>

          <div class="summary-total">
            <span>Total:</span>
            <span>$${total.toFixed(2)}</span>
          </div>
        </div>

        <!-- CUSTOMER INFO -->
        <div class="checkout-form">
          <h2>Customer Information</h2>

          <input type="text" id="name" placeholder="Full Name" />
          <input type="text" id="phone" placeholder="Phone Number" />
          <input type="text" id="address" placeholder="Delivery Address" />

          <h3>Payment Method</h3>

          <select id="payment" onchange="toggleZelleInfo()">
            <option value="cash">Cash on Delivery</option>
            <option value="card">Credit / Debit Card</option>
            <option value="zelle">Zelle</option>
          </select>

          <!-- ZELLE INFO BOX -->
          <div id="zelle-info" class="zelle-box" style="display:none;">
            <p><strong>Zelle Payment Instructions:</strong></p>
            <p>Send payment to:</p>
            <p><strong>zubiyasolutions@gmail.com</strong></p>
            <p>After sending, tap "Place Order".</p>
          </div>

          <button class="place-order-btn" onclick="placeOrder()">
            Place Order
          </button>
        </div>

      </div>
    `;
  }
}

function toggleZelleInfo() {
  const method = document.getElementById("payment").value;
  const box = document.getElementById("zelle-info");

  box.style.display = method === "zelle" ? "block" : "none";
}

function placeOrder() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();
  const payment = document.getElementById("payment").value;

  if (!name || !phone || !address) {
    alert("Please fill out all fields.");
    return;
  }

  if (payment === "zelle") {
    console.log("Zelle payment selected.");
  }

  // Clear cart
  const cart = new Cart();
  cart.items = [];
  cart.save();

  // Only call if exists
  if (typeof updateCartCount === "function") {
    updateCartCount();
  }

  // Redirect to confirmation page
  window.location.href = "../pages/confirmation.html";
}

// Make functions global
window.placeOrder = placeOrder;
window.toggleZelleInfo = toggleZelleInfo;
