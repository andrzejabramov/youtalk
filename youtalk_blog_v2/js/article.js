// js/article.js
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // 1. Читаем ID из URL (например: article.html?id=4)
    const params = new URLSearchParams(window.location.search);
    const articleId = params.get("id") || "4"; // По умолчанию id=4

    // 2. Загружаем каталог
    const res = await fetch("js/data/cards-catalog.json");
    const data = await res.json();
    const catalog = data.catalog || [];
    const article = catalog.find(
      (item) => String(item.id) === String(articleId),
    );

    if (!article) {
      console.warn("Статья не найдена");
      return;
    }

    // 3. Заполняем мета-данные
    document.title = `YOU TALK — ${article.title}`;
    document.getElementById("articleTitle").textContent = article.title;
    document.getElementById("articleTitleCrumb").textContent = article.title;
    document.getElementById("articleAuthor").textContent = article.author; // JSON уже содержит "Автор: ФИО"
    document.getElementById("articleDate").textContent = article.date;

    const imgEl = document.getElementById("articleImage");
    imgEl.src = `images/${article.image}`;
    imgEl.alt = article.alt || article.title;

    // 4. Генерируем Содержание (строго по Figma)
    const tocList = document.getElementById("articleToc");
    const tocData = [
      {
        type: "main",
        text: "Как понять, что отношения с мамой были дисфункциональными и привели к травме?",
      },
      { type: "main", text: "Мама привет!" },
      { type: "sub", indent: 1, text: "Под под заголовок под заголовком" },
      { type: "sub", indent: 2, text: "Под под под заголовок под заголовком" },
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

    // 5. Рендерим блок H3 + текст (строго по Figma 690x192)
    const sectionEl = document.createElement("div");
    sectionEl.className = "article__section";
    sectionEl.innerHTML = `
      <h3>Заголовок H3</h3>
      <div class="article__text-block">
        <p>Один из самых важных навыков, которые может дать работа с психотерапевтом - умение в разных ситуациях по-разному обходиться со своими эмоциями. Снять этот процесс с автопилота и перевести его в поле сознания.</p>
        <p>Давайте, к примеру, разберем тревогу. Можно разложить перед собой целую коллекцию доступных реакций и выбрать нужную:</p>
      </div>
    `;
    document.getElementById("articleContent").appendChild(sectionEl);

    // 6. Добавляем основной текст статьи из JSON (description)
    // Используем класс .article__content-block для стилизации через CSS
    const descriptionEl = document.createElement("div");
    descriptionEl.className = "article__content-block";
    descriptionEl.innerHTML = `<p>${article.description}</p>`;
    document.getElementById("articleContent").appendChild(descriptionEl);
  } catch (err) {
    console.error("Ошибка загрузки статьи:", err);
  }
});
