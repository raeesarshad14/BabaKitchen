class Header {
  render() {
    return `
      <header class="header">
        <div class="header-left">
          <div class="logo">
            <a href="./index.html">
               <img src="./assets/logo picture.png" alt="Logo">
            </a>
          </div>
        </div>

        <nav class="header-center">
          <a href="./menu.html">MENU</a>
          <a href="./catering.html">CATERING</a>
          <a href="./desserts.html">DESSERTS</a>
          <a href="./weekly-menu.html">WEEKLY MENU</a>
          <a href="./contact.html">CONTACT</a>

          <a class="order-btn" href="./catering.html">ORDER NOW</a>
        </nav>

        <div class="header-right">
          <a class="cart-icon" href="./cart.html">
            <img src="./assets/cart.png" class="cart-img" alt="Cart">
            <span id="cart-count"></span>
          </a>
        </div>
      </header>
    `;
  }
}

/* ⭐ ALWAYS RESTORE CART COUNT AFTER HEADER RENDERS ⭐ */
function initHeader() {
  document.getElementById("header").innerHTML = new Header().render();

  const savedCart = JSON.parse(localStorage.getItem("baba_cart")) || [];
  const count = savedCart.reduce((sum, item) => sum + item.qty, 0);

  const badge = document.getElementById("cart-count");
  if (badge) badge.textContent = count;
}
