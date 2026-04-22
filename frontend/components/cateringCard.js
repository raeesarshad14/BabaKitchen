class CateringCard {
  constructor(name, price, items) {
    this.name = name;
    this.price = price;
    this.items = items;
  }

  render() {
    return `
      <div class="catering-card">
        <h3>${this.name}</h3>
        <p class="price">$${this.price}</p>

        <ul class="items-list">
          ${this.items.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </div>
    `;
  }
}
