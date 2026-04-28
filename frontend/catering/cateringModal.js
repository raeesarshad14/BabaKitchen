let modalItemName = "";
let smallQty = 0;
let largeQty = 0;
let smallPrice = 0;
let largePrice = 0;

function openCateringModal(name, sPrice, lPrice, preselect = null) {
  modalItemName = name;
  smallPrice = sPrice;
  largePrice = lPrice;

  smallQty = 0;
  largeQty = 0;

  document.getElementById("modal-item-name").innerText = name;
  document.getElementById("small-price").innerText = smallPrice;
  document.getElementById("large-price").innerText = largePrice;

  document.getElementById("small-qty").innerText = smallQty;
  document.getElementById("large-qty").innerText = largeQty;

  // ⭐ Preselect tray
  if (preselect === "small") {
    smallQty = 1;
    document.getElementById("small-qty").innerText = 1;
  }

  if (preselect === "large") {
    largeQty = 1;
    document.getElementById("large-qty").innerText = 1;
  }

  document.querySelector(".catering-modal-overlay").style.display = "flex";
}

function closeCateringModal() {
  document.querySelector(".catering-modal-overlay").style.display = "none";
}

function changeQty(type, amount) {
  if (type === "small") {
    smallQty = Math.max(0, smallQty + amount);
    document.getElementById("small-qty").innerText = smallQty;
    document.getElementById("small-total").innerText = smallQty * smallPrice;
  } else {
    largeQty = Math.max(0, largeQty + amount);
    document.getElementById("large-qty").innerText = largeQty;
    document.getElementById("large-total").innerText = largeQty * largePrice;
  }

  // ⭐ Update subtotal
  const subtotal = smallQty * smallPrice + largeQty * largePrice;
  document.getElementById("tray-subtotal").innerText = subtotal;
}

function addCateringToCart() {
  const subtotal = smallQty * smallPrice + largeQty * largePrice;

  // ⭐ VALIDATION — nothing selected
  if (subtotal === 0) {
    alert("Please select at least one tray before adding to cart.");
    return; // stop here
  }

  if (smallQty > 0) {
    cart.addItem({
      name: `${modalItemName} (Small Tray)`,
      price: smallPrice,
      qty: smallQty,
      options: {},
    });
  }

  if (largeQty > 0) {
    cart.addItem({
      name: `${modalItemName} (Large Tray)`,
      price: largePrice,
      qty: largeQty,
      options: {},
    });
  }

  cart.updateCartCount();
  closeCateringModal();
}
