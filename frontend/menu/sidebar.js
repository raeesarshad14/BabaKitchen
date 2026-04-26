class Sidebar {
  constructor(categories) {
    this.categories = categories;
  }

  render() {
    return `
      <div class="menu-sidebar">
        ${this.categories
          .map(
            (cat) => `
            <div class="category-text" data-target="${cat.id}">
              ${cat.name}
            </div>
          `,
          )
          .join("")}
      </div>
    `;
  }

  init() {
    const links = document.querySelectorAll(".category-text");

    links.forEach((link) => {
      link.addEventListener("click", () => {
        const targetId = link.getAttribute("data-target");
        const section = document.getElementById(targetId);

        if (section) {
          section.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });
  }
}
