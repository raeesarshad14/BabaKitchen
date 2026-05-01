class CateringCard {
  constructor(item) {
    this.item = item;
  }

  render() {
    const hasTrays =
      this.item.smallPrice !== undefined && this.item.largePrice !== undefined;

    const singlePriceValue =
      this.item.price || this.item.unitPrice || this.item.pricePerPiece;

    const isSinglePrice = singlePriceValue && !hasTrays;

    /* ⭐ SPECIAL CASE — WHOLE ROAST CHICKEN */
    /* ⭐ SPECIAL CASE — WHOLE ROAST CHICKEN */
    if (this.item.name === "Whole Roast Chicken") {
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
        onclick="openRoastChickenModal('${this.item.name}', ${singlePriceValue})">
        Add
      </button>
    </div>
  `;
    }

    /* ⭐ SINGLE PRICE ITEMS */
    if (isSinglePrice) {
      const minOrder = this.item.minOrder || 12;

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
            onclick="openSingleModal('${this.item.name}', ${singlePriceValue}, ${minOrder})">
            Add
          </button>
        </div>
      `;
    }

    /* ⭐ TRAY ITEMS */
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
