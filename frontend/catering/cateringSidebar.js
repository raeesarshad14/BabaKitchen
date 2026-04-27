class CateringSidebar {
  constructor(categories) {
    this.categories = categories;
  }

  render() {
    return `
      <div id="catering-sidebar" class="catering-sidebar"></div>
        ${this.categories
          .map(
            (cat) => `
          <button onclick="scrollToCategory('${cat}')">${cat}</button>
        `,
          )
          .join("")}
      </div>
    `;
  }
}

function scrollToCategory(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}
