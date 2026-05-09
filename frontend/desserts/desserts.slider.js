let dessertSlideIndex = 0;

const dessertSlides = [
  "./assets/JanSisters.jpeg",
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
  "./assets/dessert12.png",
];

function loadDessertSlider() {
  const slider = document.getElementById("dessertSlider");

  slider.innerHTML = dessertSlides
    .map((src, index) => {
      if (index === 0) {
        return `
    <a href="https://www.instagram.com/jansistersbakery?igsh=MTZ2Ym91M2xxM2llbg%3D%3D&utm_source=qr"
       target="_blank"
       class="dessert-slide-link">
      <img class="dessert-slide-img" src="${src}">

      <div class="insta-center-box">
        <div class="insta-subtext">Click below to visit</div>

        <div class="insta-floating">
          <img src="./assets/instagram.png" alt="Instagram">
          Visit Jan Sisters Bakery
        </div>
      </div>
    </a>
  `;
      }

      return `<img class="dessert-slide-img" src="${src}">`;
    })
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
