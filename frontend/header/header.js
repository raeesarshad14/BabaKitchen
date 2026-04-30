class Header {
  render() {
    return `
      <header class="header">
        <div class="header-left">
          <div class="logo">
            <a href="../pages/index.html">
               <img src="../assets/logo picture.png" alt="Logo">
            </a>
          </div>

          <nav class="nav-links">
            <a href="../pages/menu.html">MENU</a>
            <a href="../pages/catering.html">CATERING</a>
            <a href="../desserts/desserts.html">DESSERTS</a>
            <a href="../pages/weekly-menu.html">WEEKLY MENU</a>


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

          <!-- UPDATED: SIGN IN → CONTACT -->
          <a class="signin" href="../pages/contact.html">CONTACT</a>

          <a class="order-btn" href="../pages/menu.html">
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
