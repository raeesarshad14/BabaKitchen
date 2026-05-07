class CheckoutPage {
  constructor() {
    this.cart = new Cart();
  }

  render() {
    const subtotal = this.cart.getTotal();
    const total = subtotal;

    return `
      <div class="checkout-wrapper">

        <!-- ORDER SUMMARY -->
        <div class="checkout-summary">
          <h2>Order Summary</h2>

          <div class="summary-row">
            <span>Subtotal:</span>
            <span>$${subtotal.toFixed(2)}</span>
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
            <option value="zelle">Zelle</option>
          </select>

          <!-- ZELLE INFO BOX -->
          <div id="zelle-info" class="zelle-box" style="display:none;">
            <h4 class="zelle-title">Zelle Payment Instructions</h4>

            <p class="zelle-text">Send your payment to the Zelle number below:</p>

            <div class="zelle-details">
              <div class="zelle-number">571‑353‑9225</div>
              <div class="zelle-name">
                The name <strong>Fozia Jan</strong> will appear automatically
              </div>
            </div>

            <p class="zelle-note">
              After sending the payment, tap <strong>“Place Order”</strong> to complete your checkout.
            </p>
          </div>

          <button class="place-order-btn" id="placeOrderBtn" onclick="placeOrder()">
            Place Order
          </button>

          <!-- SUCCESS CHECKMARK -->
          <div id="payment-success" class="success-check" style="display:none;">
            Order Submitted
          </div>

        </div>

      </div>
    `;
  }
}

function toggleZelleInfo() {
  const method = document.getElementById("payment").value;
  document.getElementById("zelle-info").style.display =
    method === "zelle" ? "block" : "none";
}

async function placeOrder() {
  const btn = document.getElementById("placeOrderBtn");
  btn.disabled = true;
  btn.innerText = "Processing...";

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();
  const payment = document.getElementById("payment").value;

  if (!name || !phone || !address) {
    alert("Please fill out all fields.");
    btn.disabled = false;
    btn.innerText = "Place Order";
    return;
  }

  // Build cart summary (for future use / logging if needed)
  const cart = new Cart();
  const items = cart.items;

  const itemsText = items
    .map((i) => `${i.name} (x${i.qty}) - $${(i.price * i.qty).toFixed(2)}`)
    .join("\n");

  const subtotal = cart.getTotal();
  const total = subtotal;

  console.log("Order Summary:", {
    name,
    phone,
    address,
    payment,
    itemsText,
    subtotal: subtotal.toFixed(2),
    total: total.toFixed(2),
  });

  // Show success box briefly
  await new Promise((res) => setTimeout(res, 300));
  const successBox = document.getElementById("payment-success");
  successBox.style.display = "block";

  await new Promise((res) => setTimeout(res, 700));

  // Clear cart
  cart.items = [];
  cart.save();
  if (typeof updateCartCount === "function") updateCartCount();

  // Redirect to local confirmation page
  window.location.href = "./confirmation.html";
}

window.placeOrder = placeOrder;
window.toggleZelleInfo = toggleZelleInfo;
