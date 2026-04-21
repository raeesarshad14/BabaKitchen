class Header {
  render() {
    return `
      <header class="header">
        <div class="header-left">
          <div class="logo">
            <img src="../assets/logo picture.png" alt="Logo">
          </div>

          <nav class="nav-links">
            <a href="index.html">MENU</a>
            <a href="catering.html">CATERING</a>
            <a href="help.html">HELP</a>

            <!-- ⭐ SEARCH BAR INSIDE HEADER -->
            <div class="header-search">
              <input 
                type="text" 
                id="searchInput" 
                placeholder="Search dishes..."
                autocomplete="off"
              />
              <div id="searchResults" class="search-results"></div>
            </div>
          </nav>
        </div>

        <div class="header-right">
          <a class="signin" href="signin.html">SIGN IN</a>
          <a class="order-btn" href="order.html">ORDER NOW</a>

          <!-- CART ICON -->
          <a class="cart-icon" href="cart.html">
            <img src="../assets/cart.png" class="cart-img" alt="Cart">
            <span id="cart-count"></span>
          </a>
        </div>
      </header>
    `;
  }
}
