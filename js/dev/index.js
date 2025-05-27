import "./app.min.js";
import "./spollers.min.js";
import "./slider.min.js";
/* empty css             */
function setScrollActive(selector, activeClass = "active", maxWidth = 991) {
  const items = document.querySelectorAll(selector);
  if (!items.length) return;
  let lastActive = null;
  function onScroll() {
    if (window.innerWidth > maxWidth) return;
    const viewportMiddle = window.scrollY + window.innerHeight / 2;
    let newActive = null;
    items.forEach((item) => {
      const rect = item.getBoundingClientRect();
      const itemTop = rect.top + window.scrollY;
      const itemBottom = itemTop + rect.height;
      if (viewportMiddle >= itemTop && viewportMiddle <= itemBottom) {
        newActive = item;
      }
    });
    if (newActive && newActive !== lastActive) {
      if (lastActive) lastActive.classList.remove(activeClass);
      newActive.classList.add(activeClass);
      lastActive = newActive;
    }
  }
  window.addEventListener("scroll", onScroll);
  window.addEventListener("resize", onScroll);
  onScroll();
}
function setHoverActive(selector, activeClass = "active", minWidth = 992) {
  const items = document.querySelectorAll(selector);
  if (!items.length) return;
  function applyHover() {
    if (window.innerWidth < minWidth) return;
    items.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        items.forEach((el) => el.classList.remove(activeClass));
        item.classList.add(activeClass);
      });
    });
  }
  applyHover();
  window.addEventListener("resize", applyHover);
}
window.addEventListener("DOMContentLoaded", () => {
  setScrollActive(".what-we-do__title");
  setHoverActive(".what-we-do__title");
  const itemsTitle = document.querySelectorAll(".what-we-do__title");
  itemsTitle.forEach((el) => {
    el.scrollIntoView({ behavior: "smooth", block: "end" });
  });
  setTimeout(() => {
    itemsTitle.forEach((el) => {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      });
    });
  }, 10);
});
