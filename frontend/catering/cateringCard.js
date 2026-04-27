class CateringCard {
  constructor(item) {
    this.item = item;
  }

  render() {
    return `
      <div class="catering-card">
        <div>
          <h3>${this.item.name}</h3>
        </div>

        <button onclick="openCateringModal('${this.item.name}', ${this.item.smallPrice}, ${this.item.largePrice})">
          View Trays Sizes
        </button>
      </div>
    `;
  }
}
