// Simple "More" dropdown toggle + click-outside to close
const dropdown = document.getElementById("moreDropdown");
if (dropdown) {
  const btn = dropdown.querySelector("button");
  const menu = dropdown.querySelector(".menu");

  function closeMenu() {
    menu.classList.remove("is-open");
    btn.setAttribute("aria-expanded", "false");
  }

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const open = menu.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });

  document.addEventListener("click", closeMenu);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
}

// ===== Carousel (robust) =====
(function initCarousel() {
  const carousel = document.querySelector(".carousel");
  if (!carousel) return;

  const viewport = carousel.querySelector(".carousel__viewport");
  const track = carousel.querySelector(".carousel__track");
  const slides = Array.from(carousel.querySelectorAll(".carousel__slide"));
  const prevBtn = carousel.querySelector(".carousel__btn--prev");
  const nextBtn = carousel.querySelector(".carousel__btn--next");
  const dotsWrap = carousel.querySelector(".carousel__dots");

  if (!viewport || !track || slides.length === 0 || !prevBtn || !nextBtn || !dotsWrap) {
    console.warn("Carousel: missing required elements.");
    return;
  }

  let index = 0;

  // Build dots
  dotsWrap.innerHTML = "";
  const dots = slides.map((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "carousel__dot";
    dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
    dot.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(dot);
    return dot;
  });

  function slideWidth() {
    return viewport.getBoundingClientRect().width;
  }

  function update() {
    const w = slideWidth();
    track.style.transform = `translateX(${-index * w}px)`;
    dots.forEach((d, i) => d.setAttribute("aria-selected", i === index ? "true" : "false"));
  }

  function clampIndex(i) {
    const n = slides.length;
    return (i + n) % n;
  }

  function goTo(i) {
    index = clampIndex(i);
    update();
  }

  function next() { goTo(index + 1); }
  function prev() { goTo(index - 1); }

  // Buttons
  prevBtn.addEventListener("click", (e) => { e.preventDefault(); prev(); });
  nextBtn.addEventListener("click", (e) => { e.preventDefault(); next(); });

  // Keyboard support
  viewport.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  });

  // Swipe support
  let startX = 0;
  let dragging = false;

  viewport.addEventListener("pointerdown", (e) => {
    dragging = true;
    startX = e.clientX;
    viewport.setPointerCapture(e.pointerId);
  });

  viewport.addEventListener("pointerup", (e) => {
    if (!dragging) return;
    dragging = false;

    const dx = e.clientX - startX;
    const threshold = 50;
    if (dx > threshold) prev();
    else if (dx < -threshold) next();
    else update();
  });

  viewport.addEventListener("pointercancel", () => {
    dragging = false;
  });

  window.addEventListener("resize", update);

  // Init
  update();
})();
