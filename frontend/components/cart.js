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

  getCount() {
    return this.items.reduce((sum, item) => sum + item.qty, 0);
  }
}
