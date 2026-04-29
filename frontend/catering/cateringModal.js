/* ---------------------------------------------------------
   CATERING TRAY POPUP (MATCHES DESSERT POPUP)
--------------------------------------------------------- */

let cateringItemName = "";
let cateringSmallQty = 0;
let cateringLargeQty = 0;
let cateringSmallPrice = 0;
let cateringLargePrice = 0;

function openCateringModal(name, sPrice, lPrice, preselect = null) {
  cateringItemName = name;
  cateringSmallPrice = sPrice;
  cateringLargePrice = lPrice;

  cateringSmallQty = 0;
  cateringLargeQty = 0;

  // ⭐ TITLE (MATCHES DESSERT POPUP)
  document.getElementById("cateringModalName").innerText = name;

  // ⭐ PRICES
  document.getElementById("cateringSmallPriceUnit").innerText = `$${sPrice}`;
  document.getElementById("cateringLargePriceUnit").innerText = `$${lPrice}`;

  // ⭐ RESET QTY
  document.getElementById("cateringSmallQty").innerText = 0;
  document.getElementById("cateringLargeQty").innerText = 0;

  // ⭐ RESET TOTALS
  document.getElementById("cateringSmallTotal").innerText = "$0";
  document.getElementById("cateringLargeTotal").innerText = "$0";
  document.getElementById("cateringSubtotal").innerText = "$0";

  // ⭐ PRESELECT TRAY
  if (preselect === "small") {
    cateringSmallQty = 1;
    document.getElementById("cateringSmallQty").innerText = 1;
    document.getElementById("cateringSmallTotal").innerText = `$${sPrice}`;
    document.getElementById("cateringSubtotal").innerText = `$${sPrice}`;
  }

  if (preselect === "large") {
    cateringLargeQty = 1;
    document.getElementById("cateringLargeQty").innerText = 1;
    document.getElementById("cateringLargeTotal").innerText = `$${lPrice}`;
    document.getElementById("cateringSubtotal").innerText = `$${lPrice}`;
  }

  // ⭐ SHOW POPUP
  document.getElementById("cateringModal").style.display = "flex";
}

function closeCateringModal() {
  document.getElementById("cateringModal").style.display = "none";
}

function changeCateringQty(type, amount) {
  if (type === "small") {
    cateringSmallQty = Math.max(0, cateringSmallQty + amount);
    document.getElementById("cateringSmallQty").innerText = cateringSmallQty;
    document.getElementById("cateringSmallTotal").innerText =
      `$${cateringSmallQty * cateringSmallPrice}`;
  } else {
    cateringLargeQty = Math.max(0, cateringLargeQty + amount);
    document.getElementById("cateringLargeQty").innerText = cateringLargeQty;
    document.getElementById("cateringLargeTotal").innerText =
      `$${cateringLargeQty * cateringLargePrice}`;
  }

  const subtotal =
    cateringSmallQty * cateringSmallPrice +
    cateringLargeQty * cateringLargePrice;

  document.getElementById("cateringSubtotal").innerText = `$${subtotal}`;
}

function addCateringToCart() {
  const subtotal =
    cateringSmallQty * cateringSmallPrice +
    cateringLargeQty * cateringLargePrice;

  if (subtotal === 0) {
    alert("Please select at least one tray before adding to cart.");
    return;
  }

  if (cateringSmallQty > 0) {
    cart.addItem({
      name: `${cateringItemName} (Small Tray)`,
      price: cateringSmallPrice,
      qty: cateringSmallQty,
      options: {},
    });
  }

  if (cateringLargeQty > 0) {
    cart.addItem({
      name: `${cateringItemName} (Large Tray)`,
      price: cateringLargePrice,
      qty: cateringLargeQty,
      options: {},
    });
  }

  cart.updateCartCount();
  closeCateringModal();
}

/* ---------------------------------------------------------
   SINGLE‑ITEM POPUP (UNCHANGED)
--------------------------------------------------------- */

let singleItemName = "";
let singlePrice = 0;
let singleQty = 12;

function openSingleModal(name, price, minOrder = 12) {
  singleItemName = name;
  singlePrice = price;
  singleQty = minOrder;

  document.getElementById("single-item-name").innerText = name;
  document.getElementById("single-qty").innerText = singleQty;
  document.getElementById("single-total").innerText = (
    singleQty * singlePrice
  ).toFixed(2);

  document.querySelector(".single-modal-overlay").style.display = "flex";
}

function closeSingleModal() {
  document.querySelector(".single-modal-overlay").style.display = "none";
}

function changeSingleQty(amount) {
  singleQty = Math.max(12, singleQty + amount);
  document.getElementById("single-qty").innerText = singleQty;
  document.getElementById("single-total").innerText = (
    singleQty * singlePrice
  ).toFixed(2);
}

function addSingleToCart() {
  cart.addItem({
    name: singleItemName,
    price: singlePrice,
    qty: singleQty,
    options: {},
  });

  cart.updateCartCount();
  closeSingleModal();
}
