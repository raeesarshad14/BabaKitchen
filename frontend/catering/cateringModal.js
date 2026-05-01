/* ---------------------------------------------------------
   CATERING TRAY POPUP (UNCHANGED)
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

  document.getElementById("cateringModalName").innerText = name;

  document.getElementById("cateringSmallPriceUnit").innerText = `$${sPrice}`;
  document.getElementById("cateringLargePriceUnit").innerText = `$${lPrice}`;

  document.getElementById("cateringSmallQty").innerText = 0;
  document.getElementById("cateringLargeQty").innerText = 0;

  document.getElementById("cateringSmallTotal").innerText = "$0";
  document.getElementById("cateringLargeTotal").innerText = "$0";
  document.getElementById("cateringSubtotal").innerText = "$0";

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
  if (cateringSmallQty > 0) {
    cart.addItem({
      name: `${cateringItemName} (Small Tray)`,
      price: cateringSmallPrice,
      qty: cateringSmallQty,
    });
  }

  if (cateringLargeQty > 0) {
    cart.addItem({
      name: `${cateringItemName} (Large Tray)`,
      price: cateringLargePrice,
      qty: cateringLargeQty,
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

  document.getElementById("single-minus").onclick = () => changeSingleQty(-1);
  document.getElementById("single-plus").onclick = () => changeSingleQty(1);
  document.getElementById("single-add-btn").onclick = () => addSingleToCart();
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
  });

  cart.updateCartCount();
  closeSingleModal();
}

/* ---------------------------------------------------------
   WHOLE ROAST CHICKEN — SIMPLE MULTIPLIER
--------------------------------------------------------- */

let roastQty = 1;
let roastPrice = 0;
let roastName = "";

function openRoastChickenModal(name, price) {
  roastName = name;
  roastPrice = price;
  roastQty = 1;

  document.getElementById("single-item-name").innerText = name;
  document.getElementById("single-qty").innerText = roastQty;
  document.getElementById("single-total").innerText = (
    roastQty * roastPrice
  ).toFixed(2);

  document.querySelector(".single-modal-overlay").style.display = "flex";

  document.getElementById("single-minus").onclick = () => changeRoastQty(-1);
  document.getElementById("single-plus").onclick = () => changeRoastQty(1);
  document.getElementById("single-add-btn").onclick = () => addRoastToCart();
}

function changeRoastQty(amount) {
  roastQty = roastQty + amount;
  if (roastQty < 1) roastQty = 1;

  document.getElementById("single-qty").innerText = roastQty;
  document.getElementById("single-total").innerText = (
    roastQty * roastPrice
  ).toFixed(2);
}

function addRoastToCart() {
  cart.addItem({
    name: roastName,
    price: roastPrice,
    qty: roastQty,
  });

  cart.updateCartCount();
  closeSingleModal();
}

function closeSingleModal() {
  document.querySelector(".single-modal-overlay").style.display = "none";
}
