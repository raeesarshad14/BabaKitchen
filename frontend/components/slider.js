class Slider {
  constructor(images) {
    this.images = images;
  }

  render() {
    return `
      <div class="slider-wrapper">
        <button class="slide-btn left-btn">&#10094;</button>

        <div class="slider">
          ${this.images
            .map((img) => `<img src="${img}" class="slide-img" />`)
            .join("")}
        </div>

        <button class="slide-btn right-btn">&#10095;</button>
      </div>
    `;
  }

  init() {
    const slider = document.querySelector(".slider");
    const slides = document.querySelectorAll(".slide-img");
    const leftBtn = document.querySelector(".left-btn");
    const rightBtn = document.querySelector(".right-btn");

    let index = 0;

    function updateSlider() {
      slider.style.transform = `translateX(-${index * 100}%)`;
      leftBtn.style.display = index === 0 ? "none" : "block";
      rightBtn.style.display = index === slides.length - 1 ? "none" : "block";
    }

    rightBtn.onclick = () => {
      if (index < slides.length - 1) {
        index++;
        updateSlider();
      }
    };

    leftBtn.onclick = () => {
      if (index > 0) {
        index--;
        updateSlider();
      }
    };

    updateSlider();
  }
}
