let modalItemName = "";
let smallQty = 0;
let largeQty = 0;
let smallPrice = 0;
let largePrice = 0;

function openCateringModal(name, sPrice, lPrice) {
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

  document.getElementById("small-total").innerText = 0;
  document.getElementById("large-total").innerText = 0;
  document.getElementById("tray-subtotal").innerText = 0;

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
  if (smallQty > 0) {
    cart.addItem(`${modalItemName} (Small Tray)`, smallPrice, smallQty);
  }
  if (largeQty > 0) {
    cart.addItem(`${modalItemName} (Large Tray)`, largePrice, largeQty);
  }

  closeCateringModal();
  alert("Added to cart!");
}
