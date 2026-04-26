class MenuCard {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  render() {
    return `
      <div class="menu-card">

        <div class="menu-card-content">
          <h3>${this.name}</h3>

          <div class="menu-card-bottom">
            <span class="menu-price">$${this.price}</span>
            <button class="open-modal-btn" data-name="${this.name}" data-price="${this.price}">
              Add
            </button>
          </div>
        </div>

      </div>
    `;
  }
}
