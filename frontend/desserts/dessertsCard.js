function renderDessertCard(item) {
  return `
    <div class="dessert-card">
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>

      <div class="dessert-prices">
        ${item.smallPrice ? `<p>Small Tray: $${item.smallPrice}</p>` : ""}
        ${item.largePrice ? `<p>Large Tray: $${item.largePrice}</p>` : ""}
      </div>

      <button onclick="openDessertModal('${item.name}', ${item.smallPrice}, ${item.largePrice})">
        Add
      </button>
    </div>
  `;
}
