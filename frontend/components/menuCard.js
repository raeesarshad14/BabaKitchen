class MenuCard {
  constructor(image, name, price) {
    this.image = image;
    this.name = name;
    this.price = price;
  }

  render() {
    return `
      <div class="menu-card">
        <img src="${this.image}" alt="${this.name}" />
        <h3>${this.name}</h3>
        <p>$${this.price}</p>
        <button>Add</button>
      </div>
    `;
  }
}
