class CartPage {
  constructor() {
    this.cart = new Cart();
  }

  render() {
    if (this.cart.items.length === 0) {
      return `
        <div class="empty-cart">
          <h2>Your cart is empty.</h2>
          <p>Add some delicious items from the menu!</p>
        </div>
      `;
    }

    const itemsHTML = this.cart.items
      .map(
        (item) => `
      <div class="cart-item">

        <!-- LEFT: REMOVE BUTTON -->
        <div class="cart-left-remove">
          <button class="remove-btn" onclick="removeFromCart('${item.name}')">
            Remove
          </button>
        </div>

        <!-- MIDDLE: NAME + QTY -->
        <div class="cart-middle">
          <div class="cart-info">
            <h3>${item.name}</h3>

            <div class="qty-controls">
              <button class="qty-btn" onclick="updateQty('${item.name}', ${item.qty - 1})">-</button>
              <span class="qty-number">${item.qty}</span>
              <button class="qty-btn" onclick="updateQty('${item.name}', ${item.qty + 1})">+</button>
            </div>
          </div>
        </div>

        <!-- CENTER: UNIT MATH -->
          <div class="cart-math">
            <span class="unit-math">
               ${String(item.price).padStart(2, "0")} × ${String(item.qty).padStart(2, "0")}
                <span class="math-equals">=</span>
            </span>
          </div>


        <!-- RIGHT: TOTAL PRICE -->
        <div class="cart-right-price">
          <div class="total-price">$${(item.price * item.qty).toFixed(2)}</div>
        </div>

      </div>
    `,
      )
      .join("");

    // TAX + DELIVERY
    const subtotal = this.cart.getTotal();
    const tax = subtotal * 0.06;
    const delivery = subtotal > 0 ? 3.99 : 0;
    const total = subtotal + tax + delivery;

    return `
      <div class="cart-container">

        <div class="cart-items">
          ${itemsHTML}
        </div>

        <!-- SUMMARY ON RIGHT SIDE -->
        <div class="cart-summary">
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

          <button class="checkout-btn" onclick="goToCheckout()">
            Checkout
          </button>
        </div>

      </div>
    `;
  }
}

function goToCheckout() {
  const zeroItems = cart.items.filter((item) => item.qty === 0);

  if (zeroItems.length > 0) {
    const names = zeroItems.map((i) => i.name).join(", ");

    alert(
      `Please remove the following item(s) before proceeding: ${names}.These items have a quantity of 0 and are not selected.`,
    );

    return;
  }

  window.location.href = "../pages/checkout.html";
}
