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

async function placeOrder() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();
  const payment = document.getElementById("payment").value;

  if (!name || !phone || !address) {
    alert("Please fill out all fields.");
    return;
  }

  const cart = new Cart();
  const items = cart.items;

  const itemsText = items
    .map((i) => `${i.name} (x${i.qty}) - $${(i.price * i.qty).toFixed(2)}`)
    .join("\n");

  const subtotal = cart.getTotal();
  const tax = subtotal * 0.06;
  const delivery = subtotal > 0 ? 3.99 : 0;
  const total = subtotal + tax + delivery;

  // ⭐ SEND EMAIL ⭐
  const formData = new FormData();
  formData.append("access_key", "a617f05a-44d7-4412-a3b4-27c0733773f9");
  formData.append("subject", "New Order Received");
  formData.append("from_name", name);

  formData.append(
    "message",
    `
New Order Received:

Name: ${name}
Phone: ${phone}
Address: ${address}
Payment Method: ${payment}

Items:
${itemsText}

Subtotal: $${subtotal.toFixed(2)}
Tax: $${tax.toFixed(2)}
Delivery: $${delivery.toFixed(2)}
Total: $${total.toFixed(2)}
`,
  );

  await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: formData,
  });

  // CLEAR CART
  cart.items = [];
  cart.save();

  if (typeof updateCartCount === "function") {
    updateCartCount();
  }

  // REDIRECT
  window.location.href = "../pages/confirmation.html";
}

// Make functions global
window.placeOrder = placeOrder;
window.toggleZelleInfo = toggleZelleInfo;
