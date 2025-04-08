document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".carousel-track");
  const cards = document.querySelectorAll(".carousel-card");
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");

  let indice = 0;

  function actualizarCarrusel() {
    const width = document.querySelector(".carousel").clientWidth;
    track.style.transform = `translateX(-${indice * width}px)`;
  }

  nextBtn.addEventListener("click", () => {
    console.log("Next button clicked");
    indice = (indice + 1) % cards.length;
    actualizarCarrusel();
  });

  prevBtn.addEventListener("click", () => {
    console.log("Prev button clicked");
    indice = (indice - 1 + cards.length) % cards.length;
    actualizarCarrusel();
  });
});