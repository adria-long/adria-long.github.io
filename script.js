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
