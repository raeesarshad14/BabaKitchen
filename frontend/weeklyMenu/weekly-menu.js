console.log("Weekly Menu JS Loaded");

async function loadWeeklyMenu() {
  const url =
    "https://opensheet.elk.sh/11Hmajgu_LcOxDksTwNqqBN2CaN6sqV4JcgGPXicmcDY/Sheet1";

  try {
    const data = await fetch(url).then((r) => r.json());

    // Group dishes by day
    const days = {};
    data.forEach((row) => {
      if (!days[row.y]) days[row.y] = [];
      days[row.y].push(row);
    });

    const container = document.getElementById("weekly-menu");

    container.innerHTML = Object.keys(days)
      .map((day) => {
        const items = days[day]
          .map(
            (item) => `
              <div class="weekly-item">
                
                <div class="weekly-item-info">
                  <div class="weekly-dish">${item.Dish}</div>
                  <div class="weekly-price">$${item.Price}</div>
                </div>

                <button class="weekly-add-btn"
                  onclick='openWeeklyModal("${item.Dish}", ${item.Price})'>
                  Add
                </button>

              </div>
            `,
          )
          .join("");

        return `
          <div class="weekly-day-block" id="day-${day}">
            <div class="weekly-day-title">${day}</div>
            ${items}
          </div>
        `;
      })
      .join("");

    attachAddToCartHandler();
  } catch (err) {
    console.error("Weekly Menu Error:", err);
  }
}

loadWeeklyMenu();

/* MODAL LOGIC */
let wmDish = "";
let wmPrice = 0;
let wmQty = 1;

function openWeeklyModal(dish, price) {
  wmDish = dish;
  wmPrice = price;
  wmQty = 1;

  document.getElementById("wm-dish-name").innerText = dish;
  document.getElementById("wm-dish-price").innerText = "$" + price;
  document.getElementById("wm-qty").innerText = wmQty;
  document.getElementById("wm-total-price").innerText = price;

  document.getElementById("weeklyModal").style.display = "flex";
}

function closeWeeklyModal() {
  document.getElementById("weeklyModal").style.display = "none";
}

function wmIncrease() {
  wmQty++;
  updateWmTotal();
}

function wmDecrease() {
  if (wmQty > 1) wmQty--;
  updateWmTotal();
}

function updateWmTotal() {
  document.getElementById("wm-qty").innerText = wmQty;
  document.getElementById("wm-total-price").innerText = (
    wmQty * wmPrice
  ).toFixed(2);
}

function attachAddToCartHandler() {
  const btn = document.querySelector(".wm-add-cart");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const item = {
      name: wmDish,
      price: wmPrice,
      qty: wmQty,
      type: "weekly",
    };

    cart.addItem(item);
    cart.updateCartCount();
    closeWeeklyModal();
  });
}

function scrollToDay(day) {
  const el = document.getElementById("day-" + day);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/* CART SYSTEM */
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

    this.save();
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
      if (qty < 1) qty = 1;
      item.qty = qty;
    } else if (!isCatering) {
      if (qty < 12) {
        item.qty = 12;
      } else {
        item.qty = qty;
      }
    } else {
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
