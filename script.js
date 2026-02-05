/* =========================
   MAES site JS (dropdown + carousel)
   - Carousel: arrows + dots + wrap-around
   - Uses translateX(%) for reliable slide movement
   ========================= */

console.log("SCRIPT VERSION 1.0.4 LOADED");

document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".carousel");
  if (!carousel) return;

  const viewport = carousel.querySelector(".carousel__viewport");
  const track = carousel.querySelector(".carousel__track");
  const slides = Array.from(carousel.querySelectorAll(".carousel__slide"));
  const dotsWrap = carousel.querySelector(".carousel__dots");
  const prevBtn = carousel.querySelector(".carousel__btn--prev");
  const nextBtn = carousel.querySelector(".carousel__btn--next");

  if (!viewport || !track || slides.length === 0 || !dotsWrap || !prevBtn || !nextBtn) {
    console.warn("Carousel: missing required elements.");
    return;
  }

  let index = 0;
  const n = slides.length;

  const wrap = (i) => (i % n + n) % n;

  // build dots
  dotsWrap.innerHTML = "";
  const dots = slides.map((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "carousel__dot";
    dot.setAttribute("role", "tab");
    dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
    dot.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(dot);
    return dot;
  });

  function update() {
    track.style.transform = `translateX(${-index * 100}%)`;
    dots.forEach((d, i) => d.setAttribute("aria-selected", i === index ? "true" : "false"));
  }

  function goTo(i) {
    index = wrap(i);
    update();
  }

  prevBtn.addEventListener("click", () => {
    console.log("prev clicked");
    goTo(index - 1);
  });

  nextBtn.addEventListener("click", () => {
    console.log("next clicked");
    goTo(index + 1);
  });

  // keyboard support
  viewport.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") goTo(index - 1);
    if (e.key === "ArrowRight") goTo(index + 1);
  });

  update();
});
