async function loadCatering() {
  const response = await fetch("../data/catering.json");
  const data = await response.json();

  /* ⭐ ADD MENU SECTIONS HERE ⭐ */
  const menuSections = [
    {
      category: "Smash Burgers & Bun Palaster",
      subtitle:
        "(Each order includes chips and a soda. Minimum order of 12 required)",
      items: [
        { name: "Beef Smash Burger", price: 11 },
        { name: "Beef Bun Palaster", price: 11 },
        { name: "Chicken Bun Palaster", price: 11 },
      ],
    },
    {
      category: "Wraps",
      subtitle:
        "(Minimum order Of 12 required - does not include chips or soda)",
      items: [
        { name: "Chicken Chapli Kabob Wrap", price: 10 },
        { name: "Beef Chapli Kabob Wrap", price: 10 },
      ],
    },
    {
      category: "Sandwiches",
      subtitle:
        "(Minimum order Of 12 required - does not include chips or soda)",
      items: [
        { name: "Chicken Salad Sandwich", price: 4 },
        { name: "Desi Style Egg Salad Sandwich", price: 5 },
        { name: "Chicken Tikka Club Sandwich", price: 8 },
      ],
    },
  ];

  /* ⭐ MERGE MENU + CATERING ⭐ */
  const fullData = [...menuSections, ...data];

  /* ⭐ SIDEBAR ⭐ */
  const categories = fullData.map((c) => c.category);
  document.getElementById("catering-sidebar").innerHTML = new CateringSidebar(
    categories,
  ).render();

  /* ⭐ CONTENT ⭐ */
  const container = document.getElementById("catering-content");

  container.innerHTML = fullData
    .map(
      (section) => `
      <div id="${section.category}">
        <div class="catering-box">

          <div class="catering-box-title">
            <h2>${section.category}</h2>
          </div>

          ${
            section.subtitle
              ? `<p class="category-subtitle">${section.subtitle}</p>`
              : ""
          }

          <div class="catering-items">
            ${section.items
              .map((item) => new CateringCard(item).render())
              .join("")}
          </div>

        </div>
      </div>
    `,
    )
    .join("");
}

loadCatering();
