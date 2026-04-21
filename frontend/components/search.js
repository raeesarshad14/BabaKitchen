// frontend/components/search.js
class Search {
  constructor(menuData, renderItemsCallback) {
    this.menuData = menuData;
    this.renderItems = renderItemsCallback;

    this.input = document.getElementById("searchInput");
    this.resultsBox = document.getElementById("searchResults");

    if (!this.input || !this.resultsBox) return;

    this.input.addEventListener("input", () => this.showSuggestions());
  }

  showSuggestions() {
    const query = this.input.value.toLowerCase().trim();
    const sliderWrapper = document.getElementById("sliderWrapper");

    this.resultsBox.innerHTML = "";

    // ⭐ If search is empty → show slider again
    if (!query) {
      this.resultsBox.style.display = "none";
      sliderWrapper.style.display = "block"; // show slider
      this.renderItems(this.menuData);
      return;
    }

    // ⭐ If user is typing → hide slider
    sliderWrapper.style.display = "none";

    const matches = this.menuData.filter((item) =>
      item.name.toLowerCase().startsWith(query),
    );

    if (matches.length === 0) {
      this.resultsBox.style.display = "none";
      this.renderItems([]);
      return;
    }

    this.resultsBox.style.display = "block";

    matches.forEach((item) => {
      const div = document.createElement("div");
      div.textContent = item.name;

      div.addEventListener("click", () => {
        this.input.value = item.name;
        this.resultsBox.style.display = "none";
        this.renderItems([item]);
      });

      this.resultsBox.appendChild(div);
    });

    this.renderItems(matches);
  }
}
