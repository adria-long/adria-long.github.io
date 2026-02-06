/* =========================
   MAES site JS (dropdown + carousel)
   ========================= */

console.log("SCRIPT VERSION 1.0.6 LOADED");

document.addEventListener("DOMContentLoaded", () => {
  /* ===== "More" dropdown (works on every page) ===== */
  (() => {
    const dropdown = document.getElementById("moreDropdown");
    if (!dropdown) return;

    const btn = dropdown.querySelector("button");
    const menu = dropdown.querySelector(".menu");
    if (!btn || !menu) return;

    function closeMenu() {
      menu.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
    }

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = menu.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });

    document.addEventListener("click", (e) => {
      if (!dropdown.contains(e.target)) closeMenu();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
  })();

  /* ===== Carousel (only runs if carousel exists) ===== */
  (() => {
    const carousel = document.querySelector(".carousel");
    if (!carousel) return; // ✅ now this only skips carousel, not dropdown

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

    // Footer year
    const y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();


    prevBtn.addEventListener("click", () => goTo(index - 1));
    nextBtn.addEventListener("click", () => goTo(index + 1));

    viewport.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") goTo(index - 1);
      if (e.key === "ArrowRight") goTo(index + 1);
    });

    update();
  })();
});
