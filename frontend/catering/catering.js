async function loadCatering() {
  const response = await fetch("../data/catering.json");
  const data = await response.json();

  const categories = data.map((c) => c.category);
  document.getElementById("catering-sidebar").innerHTML = new CateringSidebar(
    categories,
  ).render();

  const container = document.getElementById("catering-content");

  container.innerHTML = data
    .map(
      (section) => `
      <div id="${section.category}">
        <div class="catering-box">
          <div class="catering-box-title">
            <h2>${section.category}</h2>
          </div>

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
