class Sidebar {
  constructor(categories) {
    this.categories = categories;
  }

  render() {
    return `
      <div class="menu-sidebar">
        ${this.categories
          .map((cat) => `<div class="category-text">${cat}</div>`)
          .join("")}
      </div>
    `;
  }
}
