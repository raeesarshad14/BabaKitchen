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

        <!-- MIDDLE: NAME + QTY (NO IMAGE) -->
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

        <!-- RIGHT: ITEM TOTAL PRICE -->
        <div class="cart-right-price">
          $${(item.price * item.qty).toFixed(2)}
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

          <!-- FIXED CHECKOUT BUTTON -->
          <button class="checkout-btn" onclick="goToCheckout()">
            Checkout
          </button>
        </div>

      </div>
    `;
  }
}

/* FIX: ADD THIS FUNCTION */
function goToCheckout() {
  window.location.href = "../pages/checkout.html";
}
