class CateringCard {
  constructor(item) {
    this.item = item;
  }

  render() {
    const hasTrays = this.item.smallPrice && this.item.largePrice;

    const singlePriceValue =
      this.item.price || this.item.unitPrice || this.item.pricePerPiece;

    const isSinglePrice = singlePriceValue && !hasTrays;

    /* ⭐ SINGLE PRICE ITEMS */
    if (isSinglePrice) {
      return `
        <div class="catering-card slider-card">
          <h3>${this.item.name}</h3>

          <div class="slider-price">
            ${
              this.item.note
                ? `$${singlePriceValue} (${this.item.note})`
                : `$${singlePriceValue} each`
            }
          </div>

          <button class="slider-add-btn"
            onclick="openSingleModal('${this.item.name}', ${singlePriceValue}, ${
              this.item.minOrder || 12
            })">
            Add
          </button>
        </div>
      `;
    }

    /* ⭐ TRAY ITEMS */
    return `
      <div class="catering-card catering-tray-card">
        <h3>${this.item.name}</h3>

        <p>Small Tray — $${this.item.smallPrice}</p>
        <p>Large Tray — $${this.item.largePrice}</p>

        <button class="catering-add-btn"
          onclick="openCateringModal('${this.item.name}', ${this.item.smallPrice}, ${this.item.largePrice})">
          Add
        </button>
      </div>
    `;
  }
}
