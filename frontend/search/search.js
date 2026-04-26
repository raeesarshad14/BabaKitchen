// frontend/components/search.js
class Search {
  constructor(menuData, renderItemsCallback) {
    this.menuData = menuData;
    this.renderItems = renderItemsCallback;

    this.input = document.getElementById("searchInput");
    this.resultsBox = document.getElementById("searchResults");
    this.clearBtn = document.getElementById("clearSearch");

    if (!this.input || !this.resultsBox) return;

    // Show suggestions when typing
    this.input.addEventListener("input", () => {
      this.showSuggestions();
      this.toggleClearButton();
    });

    // Clear search when clicking X
    this.clearBtn.addEventListener("click", () => {
      this.input.value = "";
      this.clearBtn.style.display = "none";
      this.showSuggestions(); // reset results
    });
  }

  toggleClearButton() {
    this.clearBtn.style.display =
      this.input.value.trim().length > 0 ? "block" : "none";
  }

  showSuggestions() {
    const query = this.input.value.toLowerCase().trim();
    const sliderWrapper = document.getElementById("sliderWrapper");

    this.resultsBox.innerHTML = "";

    // ⭐ If search is empty → show slider again
    if (!query) {
      this.resultsBox.style.display = "none";
      sliderWrapper.style.display = "block";
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
        this.toggleClearButton();
        this.renderItems([item]);
      });

      this.resultsBox.appendChild(div);
    });

    this.renderItems(matches);
  }
}
