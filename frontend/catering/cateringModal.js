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

  document.querySelector(".catering-modal-overlay").style.display = "flex";
}

function closeCateringModal() {
  document.querySelector(".catering-modal-overlay").style.display = "none";
}

function changeQty(type, amount) {
  if (type === "small") {
    smallQty = Math.max(0, smallQty + amount);
    document.getElementById("small-qty").innerText = smallQty;
  } else {
    largeQty = Math.max(0, largeQty + amount);
    document.getElementById("large-qty").innerText = largeQty;
  }
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
