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
          .map((media) => {
            const isVideo = media.endsWith(".mp4") || media.endsWith(".webm");

            return isVideo
              ? `<video class="slide-media" muted playsinline preload="auto">
                   <source src="${media}" type="video/mp4">
                 </video>`
              : `<img src="${media}" class="slide-media" />`;
          })
          .join("")}
      </div>

      <button class="slide-btn right-btn">&#10095;</button>
    </div>
  `;
  }

  init() {
    const slider = document.querySelector(".slider");
    const slides = document.querySelectorAll(".slide-media");
    const leftBtn = document.querySelector(".left-btn");
    const rightBtn = document.querySelector(".right-btn");

    let index = 0;
    let autoSlide;

    const stopAllVideos = () => {
      slides.forEach((s) => {
        if (s.tagName === "VIDEO") {
          s.pause();
          s.currentTime = 0;
        }
      });
    };

    const updateSlider = () => {
      slider.style.transform = `translateX(-${index * 100}%)`;

      leftBtn.style.display = index === 0 ? "none" : "block";
      rightBtn.style.display = index === slides.length - 1 ? "none" : "block";

      stopAllVideos();

      const current = slides[index];

      if (current.tagName === "VIDEO") {
        clearInterval(autoSlide);

        current.play();

        current.onended = () => {
          index = (index + 1) % slides.length;
          updateSlider();
        };
      } else {
        startAutoSlide();
      }
    };

    const startAutoSlide = () => {
      clearInterval(autoSlide);
      autoSlide = setInterval(() => {
        index = (index + 1) % slides.length;
        updateSlider();
      }, 7000);
    };

    rightBtn.onclick = () => {
      index = (index + 1) % slides.length;
      updateSlider();
    };

    leftBtn.onclick = () => {
      index = (index - 1 + slides.length) % slides.length;
      updateSlider();
    };

    updateSlider();
    startAutoSlide();
  }
}
