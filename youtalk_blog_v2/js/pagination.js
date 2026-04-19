// js/pagination.js
const Pagination = (function () {
  function getMaxCardsPerPage() {
    return 9;
  }

  const CONFIG = {
    get MAX_CARDS_PER_PAGE() {
      return getMaxCardsPerPage();
    },
    GAP: 24,
    CONTAINER_WIDTH: 1200,
  };

  function calculateGrid(totalCards) {
    const n = Math.min(totalCards, CONFIG.MAX_CARDS_PER_PAGE);
    if (n === 0) return [];
    if (n === 1) return [1];

    // 🔹 Точные проверки брейкпоинтов
    const isDesktop = window.matchMedia("(min-width: 967px)").matches;
    const isMobile = window.matchMedia("(max-width: 599px)").matches;

    console.log(
      `[GRID] ${window.innerWidth}px | Desk? ${isDesktop} | Mob? ${isMobile} | Cards: ${n}`,
    );

    if (isDesktop) {
      // 🖥 >= 967px: ОРИГИНАЛЬНАЯ ЛОГИКА (группы по 3)
      if (n === 2) return [2];

      const remainder = n % 3;
      const rows = Math.ceil(n / 3);
      const grid = [];

      switch (remainder) {
        case 0:
          for (let i = 0; i < rows; i++) grid.push(3);
          break;
        case 2:
          grid.push(2);
          for (let i = 1; i < rows; i++) grid.push(3);
          break;
        case 1:
          grid.push(2);
          grid.push(2);
          for (let i = 2; i < rows; i++) grid.push(3);
          break;
      }
      return grid;
    } else if (isMobile) {
      // 📱 <= 599px: СТРОГО 1 КАРТОЧКА В РЯД
      return Array(n).fill(1);
    } else {
      // 📐 600px - 966px: ФОРМУЛА 1 → (1) → 2 → 2...
      if (n === 2) return [1, 1];

      const grid = [1];
      let rem = n - 1;

      if (rem % 2 !== 0) {
        grid.push(1);
        rem--;
      }

      while (rem > 0) {
        grid.push(2);
        rem -= 2;
      }
      return grid;
    }
  }

  return {
    calculateGrid,
    CONFIG,
  };
})();
