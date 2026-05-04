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
            <option value="zelle">Zelle</option>
          </select>

          <!-- ZELLE INFO BOX -->
    <div id="zelle-info" class="zelle-box" style="display:none;">
  <h4 class="zelle-title">Zelle Payment Instructions</h4>

  <p class="zelle-text">Send your payment to the Zelle number below:</p>

  <div class="zelle-details">
    <div class="zelle-number">571‑353‑9225</div>
    <div class="zelle-name">The name <strong>Fozia Jan</strong> will appear automatically</div>
  </div>

  <p class="zelle-note">
    After sending the payment, tap <strong>“Place Order”</strong> to complete your checkout.
  </p>
</div>


          <!-- CREDIT / DEBIT CARD UI -->
          <div id="card-section" class="card-box" style="display:none;">

            <h3>Card Details</h3>

            <input type="text" id="card-name" placeholder="Cardholder Name" />

            <div class="card-input-group">
              <input type="text" id="card-number" placeholder="Card Number" maxlength="19" />
              <img id="card-brand" src="" class="card-brand-icon" />
            </div>

            <div class="card-row">
              <input type="text" id="card-exp" placeholder="MM/YY" maxlength="5" />
              <input type="text" id="card-cvv" placeholder="CVV" maxlength="4" />
            </div>

          </div>

          <button class="place-order-btn" id="placeOrderBtn" onclick="placeOrder()">
            Place Order
          </button>

          <!-- SUCCESS CHECKMARK -->
          <div id="payment-success" class="success-check" style="display:none;">
            Payment Successful
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

  document.getElementById("card-section").style.display =
    method === "card" ? "block" : "none";
}

// Auto-format card number + detect brand + perfect expiry auto-slash
document.addEventListener("input", (e) => {
  // CARD NUMBER FORMATTING
  if (e.target.id === "card-number") {
    let value = e.target.value.replace(/\D/g, "");
    value = value.replace(/(.{4})/g, "$1 ").trim();
    e.target.value = value;

    detectCardBrand(value.replace(/\s/g, ""));
  }

  // PERFECT EXPIRY AUTO-SLASH (MM/YY)
  if (e.target.id === "card-exp") {
    let v = e.target.value;

    // Allow digits + slash only
    v = v.replace(/[^\d/]/g, "");

    // If user typed MMYY → auto convert to MM/YY
    if (/^\d{3,4}$/.test(v.replace("/", ""))) {
      let digits = v.replace(/\D/g, "");
      v = digits.slice(0, 2) + "/" + digits.slice(2, 4);
    }

    // Prevent more than 5 chars
    if (v.length > 5) {
      v = v.slice(0, 5);
    }

    e.target.value = v;
  }
});

function detectCardBrand(num) {
  const brandImg = document.getElementById("card-brand");
  if (!brandImg) return;

  if (num.startsWith("4")) {
    brandImg.src = "https://img.icons8.com/color/48/visa.png";
  } else if (/^5[1-5]/.test(num)) {
    brandImg.src = "https://img.icons8.com/color/48/mastercard.png";
  } else if (/^3[47]/.test(num)) {
    brandImg.src = "https://img.icons8.com/color/48/amex.png";
  } else {
    brandImg.src = "";
  }
}

// Dummy payment engine (future Stripe/Square hook)
async function processPayment(cardData) {
  if (!cardData.name || !cardData.number || !cardData.exp || !cardData.cvv) {
    alert("Please fill in all card details.");
    return { success: false };
  }

  if (cardData.number.length < 13) {
    alert("Invalid card number.");
    return { success: false };
  }

  if (!/^\d{2}\/\d{2}$/.test(cardData.exp)) {
    alert("Invalid expiry format. Use MM/YY.");
    return { success: false };
  }

  if (cardData.cvv.length < 3) {
    alert("Invalid CVV.");
    return { success: false };
  }

  // Simulate gateway delay
  await new Promise((res) => setTimeout(res, 1200));

  return { success: true };
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

  // CARD PAYMENT FLOW
  if (payment === "card") {
    const cardData = {
      name: document.getElementById("card-name").value.trim(),
      number: document.getElementById("card-number").value.replace(/\s/g, ""),
      exp: document.getElementById("card-exp").value.trim(),
      cvv: document.getElementById("card-cvv").value.trim(),
    };

    const paymentResult = await processPayment(cardData);

    if (!paymentResult.success) {
      btn.disabled = false;
      btn.innerText = "Place Order";
      return;
    }

    // Smooth Apple-style success animation
    await new Promise((res) => setTimeout(res, 300));
    const successBox = document.getElementById("payment-success");
    successBox.innerText = "Payment Successful";
    successBox.style.display = "block";

    await new Promise((res) => setTimeout(res, 1000));
  }

  // EMAIL + ORDER FLOW
  const cart = new Cart();
  const items = cart.items;

  const itemsText = items
    .map((i) => `${i.name} (x${i.qty}) - $${(i.price * i.qty).toFixed(2)}`)
    .join("\n");

  const subtotal = cart.getTotal();
  const tax = subtotal * 0.06;
  const delivery = subtotal > 0 ? 3.99 : 0;
  const total = subtotal + tax + delivery;

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

  cart.items = [];
  cart.save();

  if (typeof updateCartCount === "function") {
    updateCartCount();
  }

  // Smooth redirect
  btn.innerText = "Order Placed!";
  await new Promise((res) => setTimeout(res, 800));

  window.location.href = "./confirmation.html";
}

window.placeOrder = placeOrder;
window.toggleZelleInfo = toggleZelleInfo;
