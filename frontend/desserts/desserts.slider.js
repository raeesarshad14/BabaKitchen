let dessertSlideIndex = 0;

const dessertSlides = [
  "./assets/dessert1.jpeg",
  "./assets/dessert2.jpg",
  "./assets/dessert3.jpg",
  "./assets/dessert4.jpg",
  "./assets/dessert5.jpg",
  "./assets/dessert6.jpg",
  "./assets/dessert7.jpg",
  "./assets/dessert8.jpg",
  "./assets/dessert9.jpg",
  "./assets/dessert10.jpg",
  "./assets/dessert11.png",
];

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

setInterval(nextDessertSlide, 7000);

document.addEventListener("DOMContentLoaded", loadDessertSlider);
