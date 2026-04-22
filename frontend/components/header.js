class Header {
  render() {
    return `
      <header class="header">
        <div class="header-left">
          <div class="logo">
            <img src="../assets/logo picture.png" alt="Logo">
          </div>

          <nav class="nav-links">
            <a href="../pages/index.html">MENU</a>
            <a href="../pages/catering.html">CATERING</a>
            <a href="../pages/contact.html">CONTACT</a>

            <!-- ⭐ SEARCH BAR WITH CLEAR (X) BUTTON -->
            <div class="header-search">
              <div class="search-container">
                <input 
                  type="text" 
                  id="searchInput" 
                  placeholder="Search dishes..."
                  autocomplete="off"
                />
                <span id="clearSearch" class="clear-btn">&times;</span>
              </div>

              <div id="searchResults" class="search-results"></div>
            </div>
          </nav>
        </div>

        <div class="header-right">
          <a class="signin" href="../pages/signin.html">SIGN IN</a>

          <a class="order-btn" href="../pages/index.html#menuSection">
            ORDER NOW
          </a>

          <a class="cart-icon" href="../pages/cart.html">
            <img src="../assets/cart.png" class="cart-img" alt="Cart">
            <span id="cart-count"></span>
          </a>
        </div>
      </header>
    `;
  }
}
