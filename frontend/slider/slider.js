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
    let autoSlide;

    const updateSlider = () => {
      slider.style.transform = `translateX(-${index * 100}%)`;
      leftBtn.style.display = index === 0 ? "none" : "block";
      rightBtn.style.display = index === slides.length - 1 ? "none" : "block";
    };

    const startAutoSlide = () => {
      autoSlide = setInterval(() => {
        index = (index + 1) % slides.length;
        updateSlider();
      }, 7000);
    };

    const stopAutoSlide = () => clearInterval(autoSlide);

    rightBtn.onclick = () => {
      stopAutoSlide();
      index = (index + 1) % slides.length;
      updateSlider();
      startAutoSlide();
    };

    leftBtn.onclick = () => {
      stopAutoSlide();
      index = (index - 1 + slides.length) % slides.length;
      updateSlider();
      startAutoSlide();
    };

    updateSlider();
    startAutoSlide();
  }
}
