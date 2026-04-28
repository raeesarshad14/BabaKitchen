class CateringCard {
  constructor(item) {
    this.item = item;
  }

  render() {
    const hasTrays = this.item.smallPrice && this.item.largePrice;
    const isSinglePrice =
      this.item.price || this.item.minOrder || this.item.note;

    // ⭐ ONE PRICE ITEMS (Finger Foods, Sliders, Kabobs, Fish)
    if (isSinglePrice && !hasTrays) {
      return `
    <div class="catering-card slider-card">
      <h3>${this.item.name}</h3>

      <div class="slider-line">
        <span class="slider-price">
          ${
            this.item.note
              ? `$${this.item.price} (${this.item.note})`
              : `$${this.item.price} each`
          }
        </span>

        <button class="slider-add-btn"
          onclick="openSingleModal('${this.item.name}', ${this.item.price}, ${this.item.minOrder || 12})">
          Add
        </button>
      </div>
    </div>
  `;
    }

    // ⭐ APPETIZERS (ONLY THESE HAVE TRAYS)
    return `
      <div class="catering-card catering-tray-card">
        <div class="tray-info">
          <h3>${this.item.name}</h3>

          <div class="tray-line">
            <span>Small Tray — $${this.item.smallPrice}</span>
            <button onclick="openCateringModal('${this.item.name}', ${this.item.smallPrice}, ${this.item.largePrice}, 'small')">Add</button>
          </div>

          <div class="tray-line">
            <span>Large Tray — $${this.item.largePrice}</span>
            <button onclick="openCateringModal('${this.item.name}', ${this.item.smallPrice}, ${this.item.largePrice}, 'large')">Add</button>
          </div>
        </div>
      </div>
    `;
  }
}
