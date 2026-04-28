let dessertSlideIndex = 0;

const dessertSlides = ["../assets/desserts.png", "../assets/desserts2.png"];

function loadDessertSlider() {
  const slider = document.getElementById("dessertSlider");

  slider.innerHTML = dessertSlides
    .map((src) => `<img class="dessert-slide-img" src="${src}">`)
    .join("");

  updateDessertSlider();
}

function updateDessertSlider() {
  const slider = document.getElementById("dessertSlider");
  slider.style.transform = `translateX(-${dessertSlideIndex * 100}%)`;
}

function nextDessertSlide() {
  dessertSlideIndex = (dessertSlideIndex + 1) % dessertSlides.length;
  updateDessertSlider();
}

function prevDessertSlide() {
  dessertSlideIndex =
    (dessertSlideIndex - 1 + dessertSlides.length) % dessertSlides.length;
  updateDessertSlider();
}

/* ⭐ AUTO SLIDE EVERY 3 SECONDS */
setInterval(() => {
  nextDessertSlide();
}, 7000);

/* Load slider on page load */
document.addEventListener("DOMContentLoaded", loadDessertSlider);
