document.addEventListener("click", function (e) {
  if (e.target.classList.contains("open-modal-btn")) {
    const name = e.target.dataset.name;
    const price = Number(e.target.dataset.price);

    openMenuModal(name, price);
  }
});

function openMenuModal(name, price) {
  const modal = document.getElementById("menu-modal");
  const qtyValue = document.getElementById("qty-value");
  const totalPrice = document.getElementById("modal-total-price");

  document.getElementById("modal-item-name").textContent = name;

  let qty = 12; // default minimum
  qtyValue.textContent = qty;
  totalPrice.textContent = "$" + qty * price;

  modal.classList.remove("hidden");

  document.getElementById("qty-plus").onclick = () => {
    qty++;
    qtyValue.textContent = qty;
    totalPrice.textContent = "$" + qty * price;
  };

  document.getElementById("qty-minus").onclick = () => {
    if (qty > 12) {
      qty--;
      qtyValue.textContent = qty;
      totalPrice.textContent = "$" + qty * price;
    }
  };

  document.getElementById("modal-close").onclick = () => {
    modal.classList.add("hidden");
  };
}
