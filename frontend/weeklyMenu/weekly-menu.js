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
  } catch (err) {
    console.error("Weekly Menu Error:", err);
  }
}

loadWeeklyMenu();

/* SCROLL TO DAY */
function scrollToDay(day) {
  const el = document.getElementById("day-" + day);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

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
function scrollToDay(day) {
  const el = document.getElementById("day-" + day);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
