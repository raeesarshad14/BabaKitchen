class MenuList {
  constructor(items) {
    this.items = items;
  }

  render() {
    return this.items.map((item) => item.render()).join("");
  }
}
