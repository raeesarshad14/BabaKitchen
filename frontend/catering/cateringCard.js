class CateringCard {
  constructor(item) {
    this.item = item;
  }

  render() {
    const hasTrays = this.item.smallPrice && this.item.largePrice;

    const singlePriceValue =
      this.item.price || this.item.unitPrice || this.item.pricePerPiece;

    const isSinglePrice = singlePriceValue && !hasTrays;

    /* ⭐ SINGLE PRICE ITEMS (MATCH SMASH BURGER CARD STRUCTURE) */
    if (isSinglePrice) {
      return `
        <div class="menu-card">
          <h3 class="menu-card-title">${this.item.name}</h3>

          <p class="menu-card-price">
            ${
              this.item.note
                ? `$${singlePriceValue} (${this.item.note})`
                : `$${singlePriceValue} each`
            }
          </p>

          <button class="menu-add-btn"
            onclick="openSingleModal('${this.item.name}', ${singlePriceValue}, ${
              this.item.minOrder || 12
            })">
            Add
          </button>
        </div>
      `;
    }

    /* ⭐ TRAY ITEMS (MATCH SMASH BURGER CARD STRUCTURE) */
    return `
      <div class="menu-card">
        <h3 class="menu-card-title">${this.item.name}</h3>

        <p class="menu-card-price">Small Tray — $${this.item.smallPrice}</p>
        <p class="menu-card-price">Large Tray — $${this.item.largePrice}</p>

        <button class="menu-add-btn"
          onclick="openCateringModal('${this.item.name}', ${this.item.smallPrice}, ${this.item.largePrice})">
          Add
        </button>
      </div>
    `;
  }
}
