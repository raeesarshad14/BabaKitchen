class Header {
  render() {
    return `
            <header class="header">
                <div class="header-left">
                    <div class="logo">
                          <img src="../assets/logo picture.png" alt="Logo">
                    </div>

                    <nav class="nav-links">
                        <a href="menu.html">MENU</a>
                        <a href="catering.html">CATERING</a>
                        <a href="help.html">HELP</a>
                    </nav>
                </div>

                <div class="header-right">
                    <a class="signin" href="signin.html">SIGN IN</a>
                    <a class="order-btn" href="order.html">ORDER NOW</a>
                </div>
            </header>
        `;
  }
}
