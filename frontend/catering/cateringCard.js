class CateringCard {
  constructor(item) {
    this.item = item;
  }

  render() {
    const isSlider = this.item.minOrder === 12;

    // ⭐ SLIDERS (simple price + Add button, NO trays, NO modal)
    if (isSlider) {
      return `
    <div class="catering-card slider-card">
      <h3>${this.item.name}</h3>

      <div class="slider-line">
        <span class="slider-price">$${this.item.price.toFixed(2)} each</span>
        <button class="slider-add-btn" onclick="addSliderToCart('${this.item.name}', ${this.item.price}, ${this.item.minOrder})">
          Add
        </button>
      </div>
    </div>
  `;
    }

    // ⭐ APPETIZERS (keep EXACT tray modal system)
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
