document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".carousel-track");
  const cards = document.querySelectorAll(".carousel-card");
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");

  let currentIndex = 0;

  function updateCarousel() {
    const width = document.querySelector(".carousel").clientWidth;
    track.style.transform = `translateX(-${currentIndex * width}px)`;
  }

  nextBtn.addEventListener("click", () => {
    console.log("Next button clicked");
    currentIndex = (currentIndex + 1) % cards.length;
    updateCarousel();
  });

  prevBtn.addEventListener("click", () => {
    console.log("Prev button clicked");
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateCarousel();
  });
});