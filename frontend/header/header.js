class Header {
  render() {
    return `
      <header class="header">

        <!-- LEFT: LOGO -->
        <div class="header-left">
          <div class="logo">
            <a href="../pages/index.html">
               <img src="../assets/logo picture.png" alt="Logo">
            </a>
          </div>
        </div>

        <!-- CENTER: ALL NAV LINKS (even spacing) -->
        <nav class="header-center">
          <a href="../pages/menu.html">MENU</a>
          <a href="../pages/catering.html">CATERING</a>
          <a href="../desserts/desserts.html">DESSERTS</a>
          <a href="../pages/weekly-menu.html">WEEKLY MENU</a>
          <a href="../pages/contact.html">CONTACT</a>

          <a class="order-btn" href="../pages/catering.html">ORDER NOW</a>
        </nav>

        <!-- RIGHT: CART ONLY -->
        <div class="header-right">
          <a class="cart-icon" href="../pages/cart.html">
            <img src="../assets/cart.png" class="cart-img" alt="Cart">
            <span id="cart-count"></span>
          </a>
        </div>

      </header>
    `;
  }
}
