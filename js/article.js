console.log("🟢 article.js запущен");

const waitForIncludes = () =>
  new Promise((resolve) => {
    if (!document.querySelector("[data-include]")) return resolve();
    const check = setInterval(() => {
      if (!document.querySelector("[data-include]")) {
        clearInterval(check);
        resolve();
        console.log("✅ Компоненты (header/crumbs/footer) загружены");
      }
    }, 50);
  });

document.addEventListener("DOMContentLoaded", async () => {
  console.log("🟡 DOMContentLoaded сработал");
  try {
    await waitForIncludes();

    // 🔹 Небольшая задержка, чтобы include.js гарантированно отрисовал DOM
    setTimeout(async () => {
      const id = new URLSearchParams(window.location.search).get("id") || "4";
      console.log("🔍 ID статьи:", id);

      // 1️⃣ МЕТА-ДАННЫЕ
      console.log("📦 Загружаю cards-catalog.json...");
      const catRes = await fetch("js/data/cards-catalog.json");
      if (!catRes.ok) throw new Error(`❌ Каталог: HTTP ${catRes.status}`);
      const catalog = (await catRes.json()).catalog;
      const article = catalog.find((a) => String(a.id) === id);
      console.log("🔍 Статья найдена:", !!article);

      if (article) {
        document.title = `YOU TALK — ${article.title}`;
        const $ = (sel) => document.getElementById(sel);

        // 🔹 ГЛАВНЫЙ ЗАГОЛОВОК (H1)
        if ($("articleTitle")) $("articleTitle").textContent = article.title;

        const crumb = $("articleTitleCrumb");
        if (crumb) {
          crumb.textContent = article.title;
          console.log("✅ Крошки обновлены:", article.title);
        } else console.warn("⚠️ #articleTitleCrumb отсутствует в DOM");

        const author = $("articleAuthor");
        if (author) {
          author.textContent = article.author || "";
          console.log("✅ Автор обновлён");
        } else console.warn("⚠️ #articleAuthor отсутствует в DOM");

        const date = $("articleDate");
        if (date) {
          date.textContent = article.date || "";
          console.log("✅ Дата обновлена");
        } else console.warn("⚠️ #articleDate отсутствует в DOM");

        const img = $("articleImage");
        if (img) {
          img.src = `images/${article.image}`;
          img.alt = article.alt || article.title;
          console.log("✅ Картинка обновлена:", img.src);
        } else console.warn("⚠️ #articleImage отсутствует в DOM");
      }

      // 2️⃣ КОНТЕНТ
      console.log("📦 Загружаю content.json...");
      const contentRes = await fetch("js/data/content.json");
      if (!contentRes.ok)
        throw new Error(`❌ Контент: HTTP ${contentRes.status}`);
      const contentData = await contentRes.json();
      console.log("🔍 Блоков в JSON:", contentData.blocks?.length);

      if (typeof ArticleRenderer === "undefined")
        throw new Error(
          "❌ ArticleRenderer не подключён! Проверь порядок скриптов.",
        );
      ArticleRenderer.render(contentData, "articleContent");
      console.log("✅ Рендеринг завершён");
    }, 150); // 🔹 150ms задержка для стабильности include.js
  } catch (err) {
    console.error("❌ ОШИБКА:", err.message);
    console.error("📍 Стек:", err.stack.split("\n").slice(0, 3).join("\n"));
  }
});
