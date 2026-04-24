// js/script.js
function initBurger() {
  const burger = document.querySelector(".burger");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (burger && mobileMenu) {
    burger.addEventListener("click", () => {
      const expanded = burger.getAttribute("aria-expanded") === "true";
      burger.setAttribute("aria-expanded", !expanded);
      mobileMenu.classList.toggle("mobile-menu--open");
      document.body.classList.toggle("no-scroll");
    });

    mobileMenu.querySelectorAll("a, button").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("mobile-menu--open");
        burger.setAttribute("aria-expanded", "false");
        document.body.classList.remove("no-scroll");
      });
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadData().then(() => {
    initBurger();
    initPagination();

    // 🔹 СЛУШАТЕЛИ БРЕЙКПОИНТОВ (без resize-шума, только переходы)
    const desktopMQ = window.matchMedia("(min-width: 967px)");
    const mobileMQ = window.matchMedia("(max-width: 599px)");

    function handleLayoutChange() {
      // Пересчитывает и перерисовывает сетку под новый диапазон
      updatePage();
    }

    // Современный стандарт
    desktopMQ.addEventListener("change", handleLayoutChange);
    mobileMQ.addEventListener("change", handleLayoutChange);

    // Фоллбэк для Safari < 14
    if (typeof desktopMQ.addEventListener !== "function") {
      desktopMQ.addListener(handleLayoutChange);
      mobileMQ.addListener(handleLayoutChange);
    }
  });
});
