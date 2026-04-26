class MenuList {
  constructor() {}

  render() {
    let sectionsHTML = "";

    /* ⭐ BURGER SECTION */
    sectionsHTML += `
      <section id="burgers" class="menu-section">
        <div class="menu-section-container">

          <h2 class="menu-section-title">
            Smash Burgers & Bun Palaster
            <span class="menu-section-subtitle">
              (Each order includes chips and a soda. Minimum order of 12 required)
            </span>
          </h2>

          <div class="menu-grid">
            ${new MenuCard("Beef Smash Burger", 11).render()}
            ${new MenuCard("Beef Bun Palaster", 11).render()}
            ${new MenuCard("Chicken Bun Palaster", 11).render()}
          </div>

        </div>
      </section>
    `;

    /* ⭐ WRAPS SECTION */
    sectionsHTML += `
      <section id="wraps" class="menu-section">
        <div class="menu-section-container">

          <h2 class="menu-section-title">
            Wraps
            <span class="menu-section-subtitle">
              (Minimum order Of 12 required - does not include chips or soda)
            </span>
          </h2>

          <div class="menu-grid">
            ${new MenuCard("Chicken Chapli Kabob Wrap", 10).render()}
            ${new MenuCard("Beef Chapli Kabob Wrap", 10).render()}
          </div>

        </div>
      </section>
    `;

    /* ⭐ SANDWICHES SECTION */
    sectionsHTML += `
  <section id="sandwiches" class="menu-section">
    <div class="menu-section-container">

      <h2 class="menu-section-title">
        Sandwich’s
        <span class="menu-section-subtitle">
          (Minimum order Of 12 required - does not include chips or soda)
        </span>
      </h2>

      <div class="menu-grid">
        ${new MenuCard("Chicken Salad Sandwich", 4).render()}
        ${new MenuCard("Desi Style Egg Salad Sandwich", 5).render()}
        ${new MenuCard("Chicken Tikka Club Sandwich", 8).render()}
      </div>

    </div>
  </section>
`;

    document.getElementById("menu").innerHTML = sectionsHTML;
  }
}
