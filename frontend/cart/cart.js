class Cart {
  constructor() {
    this.key = "baba_cart";
    this.items = this.load();
  }

  load() {
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : [];
  }

  save() {
    localStorage.setItem(this.key, JSON.stringify(this.items));
  }

  addItem(item) {
    const existing = this.items.find(
      (i) =>
        i.name === item.name &&
        JSON.stringify(i.options || {}) === JSON.stringify(item.options || {}),
    );

    if (existing) {
      existing.qty += item.qty;
    } else {
      this.items.push({ ...item });
    }

    this.save(); // FIXED
  }

  removeItem(name) {
    this.items = this.items.filter((item) => item.name !== name);
    this.save();
  }

  updateQty(name, qty) {
    const item = this.items.find((i) => i.name === name);
    if (!item) return;

    const isCatering = item.name.includes("Tray");
    const isWeekly = item.type === "weekly";

    if (isWeekly) {
      // ⭐ Weekly Menu — allow ANY qty >= 1
      if (qty < 1) qty = 1;
      item.qty = qty;
    } else if (!isCatering) {
      // ⭐ Sliders/Menu — minimum 12 (unchanged)
      if (qty < 12) {
        item.qty = 12;
      } else {
        item.qty = qty;
      }
    } else {
      // ⭐ Catering — allow 0+
      if (qty < 0) qty = 0;
      item.qty = qty;
    }

    this.save();
  }

  getTotal() {
    return this.items.reduce((sum, item) => sum + item.price * item.qty, 0);
  }

  getCount() {
    return this.items.reduce((sum, item) => sum + item.qty, 0);
  }

  /* ⭐ ADD THIS FUNCTION ⭐ */
  updateCartCount() {
    const count = this.getCount();
    const el = document.getElementById("cart-count");

    if (el) {
      el.textContent = count;
    }
  }
}
window.cart = new Cart();
cart.updateCartCount();

function restoreCartCount() {
  const savedCart = JSON.parse(localStorage.getItem("baba_cart")) || [];
  const count = savedCart.reduce((sum, item) => sum + item.qty, 0);

  const badge = document.getElementById("cart-count");
  if (badge) badge.innerText = count;
}
document.getElementById("header").innerHTML = new Header().render();
restoreCartCount();

function addSliderToCart(name, price, minOrder = 1) {
  const qty = minOrder || 1;

  cart.addItem({
    name: name,
    price: price,
    qty: qty,
    options: {},
  });

  cart.updateCartCount();

  alert(`${name} added to cart.`);
}
