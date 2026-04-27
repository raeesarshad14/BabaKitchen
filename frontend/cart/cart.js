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

    // enforce minimum 12
    if (qty < 12) {
      item.qty = 12;
    } else {
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
