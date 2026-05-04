async function loadDesserts() {
  const res = await fetch("./desserts/dessertsData.json");
  const desserts = await res.json();

  const container = document.getElementById("dessert-items");
  container.innerHTML = desserts.map(renderDessertCard).join("");
}

document.addEventListener("DOMContentLoaded", loadDesserts);
