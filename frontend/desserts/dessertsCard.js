function renderDessertCard(item) {
  return `
    <div class="dessert-card">
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>$${item.price}</p>
      <button onclick="addDessertToCart('${item.name}', ${item.price}, '${item.image}')">
        Add to Cart
      </button>
    </div>
  `;
}
