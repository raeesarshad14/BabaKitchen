let dessertSmallPrice = 0;
let dessertLargePrice = 0;

let dessertSmallQty = 0;
let dessertLargeQty = 0;

let currentDessertName = "";

function openDessertModal(name, smallPrice, largePrice) {
  currentDessertName = name;
  document.getElementById("dessertModalName").innerText = name;

  dessertSmallPrice = smallPrice || 0;
  dessertLargePrice = largePrice || 0;

  // Reset quantities
  dessertSmallQty = 0;
  dessertLargeQty = 0;

  document.getElementById("dessertSmallQty").innerText = 0;
  document.getElementById("dessertLargeQty").innerText = 0;

  // Reset totals
  document.getElementById("dessertSmallTotal").innerText = "$0";
  document.getElementById("dessertLargeTotal").innerText = "$0";

  // Reset price display
  updateDessertPrices();

  // Reset subtotal
  document.getElementById("dessertSubtotal").innerText = "$0";

  document.getElementById("dessertModal").style.display = "flex";
}

function changeDessertQty(size, change) {
  if (size === "small") {
    dessertSmallQty += change;
    if (dessertSmallQty < 0) dessertSmallQty = 0;

    document.getElementById("dessertSmallQty").innerText = dessertSmallQty;
    document.getElementById("dessertSmallTotal").innerText =
      `$${dessertSmallQty * dessertSmallPrice}`;
  }

  if (size === "large") {
    dessertLargeQty += change;
    if (dessertLargeQty < 0) dessertLargeQty = 0;

    document.getElementById("dessertLargeQty").innerText = dessertLargeQty;
    document.getElementById("dessertLargeTotal").innerText =
      `$${dessertLargeQty * dessertLargePrice}`;
  }

  updateDessertPrices();
  updateDessertSubtotal();
}

function updateDessertPrices() {
  // Small tray
  document.getElementById("dessertSmallPriceUnit").innerText = dessertSmallPrice
    ? `$${dessertSmallPrice}`
    : "";

  document.getElementById("dessertSmallPriceTotal").innerText =
    dessertSmallQty > 0 ? ` → $${dessertSmallQty * dessertSmallPrice}` : "";

  // Large tray
  document.getElementById("dessertLargePriceUnit").innerText = dessertLargePrice
    ? `$${dessertLargePrice}`
    : "";

  document.getElementById("dessertLargePriceTotal").innerText =
    dessertLargeQty > 0 ? ` → $${dessertLargeQty * dessertLargePrice}` : "";
}

function updateDessertSubtotal() {
  const subtotal =
    dessertSmallQty * dessertSmallPrice + dessertLargeQty * dessertLargePrice;

  document.getElementById("dessertSubtotal").innerText = `$${subtotal}`;
}

function addDessertToCart() {
  // VALIDATION — nothing selected
  if (dessertSmallQty === 0 && dessertLargeQty === 0) {
    alert("Please select at least one tray before adding to cart.");
    return;
  }

  const item = {
    name: currentDessertName,
    smallQty: dessertSmallQty,
    largeQty: dessertLargeQty,
    smallPrice: dessertSmallPrice,
    largePrice: dessertLargePrice,
    subtotal:
      dessertSmallQty * dessertSmallPrice + dessertLargeQty * dessertLargePrice,
  };

  console.log("ADDING TO CART:", item);

  alert(
    `${item.name}\n` +
      `Small Tray: ${item.smallQty} x $${item.smallPrice}\n` +
      `Large Tray: ${item.largeQty} x $${item.largePrice}\n` +
      `Subtotal: $${item.subtotal}`,
  );

  closeDessertModal();
}

function closeDessertModal() {
  document.getElementById("dessertModal").style.display = "none";
}
