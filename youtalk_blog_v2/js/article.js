// js/article.js

// 🔹 Вспомогательная функция: ждёт, пока include.js заменит все [data-include]
const waitForIncludes = () => {
  return new Promise((resolve) => {
    // Если элементов с data-include уже нет — значит, всё загрузилось
    if (!document.querySelector("[data-include]")) {
      resolve();
      return;
    }
    // Иначе проверяем каждые 50мс, пока они не исчезнут
    const check = setInterval(() => {
      if (!document.querySelector("[data-include]")) {
        clearInterval(check);
        resolve();
      }
    }, 50);
  });
};

document.addEventListener("DOMContentLoaded", async () => {
  try {
    // 🔹 0. Ждём, пока include.js вставит все компоненты в DOM
    await waitForIncludes();

    // 1. Читаем ID из URL (например: article.html?id=4)
    const params = new URLSearchParams(window.location.search);
    const articleId = params.get("id") || "4";

    // 2. Загружаем каталог
    const res = await fetch("js/data/cards-catalog.json");
    if (!res.ok) throw new Error("Не удалось загрузить каталог");

    const data = await res.json();
    const catalog = data.catalog || [];
    const article = catalog.find(
      (item) => String(item.id) === String(articleId),
    );

    if (!article) {
      console.warn("Статья с ID", articleId, "не найдена");
      return;
    }

    // 3. Заполняем мета-данные (с проверкой на существование элементов)
    document.title = `YOU TALK — ${article.title}`;

    const titleEl = document.getElementById("articleTitle");
    if (titleEl) titleEl.textContent = article.title;

    const crumbEl = document.getElementById("articleTitleCrumb");
    if (crumbEl) crumbEl.textContent = article.title;

    const authorEl = document.getElementById("articleAuthor");
    if (authorEl) authorEl.textContent = article.author;

    const dateEl = document.getElementById("articleDate");
    if (dateEl) dateEl.textContent = article.date;

    // 4. Картинка
    const imgEl = document.getElementById("articleImage");
    if (imgEl) {
      imgEl.src = `images/${article.image}`;
      imgEl.alt = article.alt || article.title;
    }

    // 5. Генерируем Содержание (TOC)
    const tocList = document.getElementById("articleToc");
    if (tocList) {
      const tocData = [
        {
          type: "main",
          text: "Как понять, что отношения с мамой были дисфункциональными и привели к травме?",
        },
        { type: "main", text: "Мама привет!" },
        { type: "sub", indent: 1, text: "Под под заголовок под заголовком" },
        {
          type: "sub",
          indent: 2,
          text: "Под под под заголовок под заголовком",
        },
        {
          type: "sub",
          indent: 3,
          text: "Под под под под заголовок под заголовком",
        },
        {
          type: "main",
          text: "Ну вот опять заголовок который как «привет мама»",
        },
        {
          type: "main",
          text: "Как понять, что вы страдаете от материнской травмой?",
        },
      ];

      tocData.forEach((item) => {
        const li = document.createElement("li");
        if (item.type === "main") {
          li.className = "article__toc-item";
          li.innerHTML = `
            <div class="article__toc-marker"></div>
            <a href="#" class="article__toc-link">${item.text}</a>
          `;
        } else {
          li.className = `article__toc-item--sub article__toc-item--indent-${item.indent}`;
          li.textContent = item.text;
        }
        tocList.appendChild(li);
      });
    }

    // 6. Рендерим блок H3 + текст после TOC
    const contentEl = document.getElementById("articleContent");
    if (contentEl) {
      const sectionEl = document.createElement("div");
      sectionEl.className = "article__section";
      sectionEl.innerHTML = `
        <h3>Заголовок H3</h3>
        <div class="article__text-block">
          <p>Один из самых важных навыков, которые может дать работа с психотерапевтом - умение в разных ситуациях по-разному обходиться со своими эмоциями. Снять этот процесс с автопилота и перевести его в поле сознания.</p>
          <p>Давайте, к примеру, разберем тревогу. Можно разложить перед собой целую коллекцию доступных реакций и выбрать нужную:</p>
        </div>
      `;
      contentEl.appendChild(sectionEl);

      // 7. Добавляем описание из JSON
      const descEl = document.createElement("div");
      descEl.className = "article__content-block";
      descEl.innerHTML = `<p>${article.description}</p>`;
      contentEl.appendChild(descEl);
    }
  } catch (err) {
    console.error("Ошибка загрузки статьи:", err);
  }
});
