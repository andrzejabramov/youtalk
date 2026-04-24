/**
 * Demo Mode: интерактивный ввод количества карточек
 */
(function () {
  "use strict";

  const CONFIG = {
    MIN_COUNT: 0,
    MAX_COUNT: 21,
    DEFAULT_COUNT: 3,
    STORAGE_KEY: "youtalk_cards_count",
  };

  let modal, input, confirmBtn, cancelBtn, smileyBtn;

  function init() {
    setTimeout(() => {
      modal = document.getElementById("cardCountModal");
      input = document.getElementById("cardCountInput");
      confirmBtn = document.getElementById("modalConfirm");
      cancelBtn = document.getElementById("modalCancel");
      smileyBtn = document.querySelector(".pagination__smiley");

      if (!modal || !input) return;
      bindEvents();
      console.log("✅ Demo mode: инициализирован");
    }, 300);
  }

  function bindEvents() {
    if (smileyBtn) {
      smileyBtn.style.cursor = "pointer";
      smileyBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        openModal();
      });
    }

    confirmBtn?.addEventListener("click", applyCount);
    cancelBtn?.addEventListener("click", closeModal);
    modal?.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
    input?.addEventListener("keydown", (e) => {
      if (e.key === "Enter") applyCount();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal?.classList.contains("modal--open"))
        closeModal();
    });
  }

  function openModal() {
    const cached = localStorage.getItem(CONFIG.STORAGE_KEY);
    input.value = cached !== null ? cached : CONFIG.DEFAULT_COUNT;
    modal.classList.add("modal--open");
    modal.hidden = false;
    setTimeout(() => {
      input.focus();
      input.select();
    }, 100);
  }

  function closeModal() {
    modal.classList.remove("modal--open");
    setTimeout(() => {
      modal.hidden = true;
    }, 200);
  }

  function applyCount() {
    const val = parseInt(input.value, 10);
    if (isNaN(val) || val < CONFIG.MIN_COUNT || val > CONFIG.MAX_COUNT) {
      input.classList.add("error");
      setTimeout(() => input.classList.remove("error"), 1500);
      return;
    }

    window.DEMO_CARD_COUNT = val;
    if (typeof loadData === "function") {
      loadData().then(() => {
        if (typeof updatePaginationState === "function")
          updatePaginationState();
      });
    }
    closeModal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.DemoMode = { openModal, closeModal, applyCount };
})();
