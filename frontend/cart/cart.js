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
    const existing = this.items.find((i) => i.name === item.name);

    if (existing) {
      existing.qty += 1;
    } else {
      this.items.push({ ...item, qty: 1 });
    }

    this.save();
  }

  removeItem(name) {
    this.items = this.items.filter((item) => item.name !== name);
    this.save();
  }

  updateQty(name, qty) {
    const item = this.items.find((i) => i.name === name);
    if (!item) return;

    item.qty = qty;

    if (item.qty <= 0) {
      this.removeItem(name);
    } else {
      this.save();
    }
  }

  getTotal() {
    return this.items.reduce((sum, item) => sum + item.price * item.qty, 0);
  }

  getCount() {
    return this.items.reduce((sum, item) => sum + item.qty, 0);
  }
}
