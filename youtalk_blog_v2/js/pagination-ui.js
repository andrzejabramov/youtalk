// js/pagination-ui.js

// 🔹 Обновление состояния пагинации (стрелки + номера страниц)
function updatePaginationState() {
  const nav = document.querySelector(".pagination");
  if (!nav) return;

  // Пересчитываем totalPages на случай ресайза окна
  const maxPerPage = Pagination.CONFIG.MAX_CARDS_PER_PAGE;
  const totalCards =
    typeof allCardsFull !== "undefined" ? allCardsFull.length : 0;
  totalPages = Math.max(1, Math.ceil(totalCards / maxPerPage));

  // Если текущая страница вышла за пределы, сбрасываем на последнюю
  if (currentPage > totalPages) currentPage = totalPages;

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  // Переключаем классы видимости стрелок
  nav.classList.toggle("pagination--has-prev", hasPrev);
  nav.classList.toggle("pagination--has-next", hasNext);
  nav.classList.toggle("pagination--is-last", !hasNext && totalPages > 1); // Смайлик только на последней

  renderPageNumbers();
}

// 🔹 Динамическая генерация кнопок страниц
function renderPageNumbers() {
  const container = document.querySelector(".pagination__numbers-container");
  if (!container) return;

  container.innerHTML = ""; // Очищаем старые кнопки
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `pagination__num${i === currentPage ? " pagination__num--active" : ""}`;
    btn.textContent = i;
    btn.dataset.page = i;

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      goToPage(i);
    });

    container.appendChild(btn);
  }
}

// 🔹 Переход на конкретную страницу
function goToPage(page) {
  if (page >= 1 && page <= totalPages) {
    currentPage = page;
    updatePage();
  }
}

function nextPage() {
  goToPage(currentPage + 1);
}
function prevPage() {
  goToPage(currentPage - 1);
}

// 🔹 Инициализация событий пагинации
function initPagination() {
  const nav = document.querySelector(".pagination");
  if (!nav) return;

  const leftArrow = nav.querySelector(".pagination__arrow-left");
  const rightArrow = nav.querySelector(".pagination__arrow-right");
  const moreBtn = nav.querySelector(".pagination__btn-more");

  if (leftArrow) {
    leftArrow.style.cursor = "pointer";
    leftArrow.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      prevPage();
    });
  }

  if (rightArrow) {
    rightArrow.style.cursor = "pointer";
    rightArrow.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      nextPage();
    });
  }

  if (moreBtn) {
    moreBtn.addEventListener("click", (e) => {
      // Клик по кнопке "Ещё" (кроме стрелок и смайлика) -> следующая страница
      if (
        !e.target.closest(".pagination__arrow-left") &&
        !e.target.closest(".pagination__arrow-right") &&
        !e.target.closest(".pagination__smiley")
      ) {
        e.preventDefault();
        e.stopPropagation();
        nextPage();
      }
    });
  }

  // Первичная отрисовка
  updatePaginationState();
}

// 🔹 Экспорт для внешних вызовов (если нужно)
window.togglePaginationVisibility = updatePaginationState;
