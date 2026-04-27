const ArticleRenderer = {
  renderers: {
    toc(b) {
      const items = b.items
        .map((item) => {
          if (item.isMain) {
            return `<li class="article__toc-item">
            <div class="article__toc-marker"></div>
            <a href="#${item.id}" class="article__toc-link">${item.text}</a>
          </li>`;
          }
          return `<li class="article__toc-item--sub article__toc-item--indent-${item.indent || 0}">${item.text}</li>`;
        })
        .join("");
      return `<div class="article__toc">
        <h2 class="article__toc-title">${b.title}</h2>
        <ul class="article__toc-list">${items}</ul>
      </div>`;
    },
    intro(b) {
      const ps = b.paragraphs.map((p) => `<p>${p}</p>`).join("");
      return `<div class="article__section">
        <h3 class="article__section-subtitle">${b.subtitle}</h3>
        <div class="article__text-block">${ps}</div>
      </div>`;
    },
    quote(b) {
      const mods = b.modifiers ? b.modifiers.join(" ") : "";
      return `<blockquote class="article__quote ${mods}">
        <p class="article__quote-text">${b.text}</p>
        <cite class="article__quote-author">${b.author || ""}</cite>
      </blockquote>`;
    },
    list(b) {
      if (!b.items?.length) return "";
      const items = b.items
        .map(
          (i) => `
        <li class="article__list-item">
          <span class="article__list-marker"></span>
          <p class="article__list-text">${i}</p>
        </li>`,
        )
        .join("");
      return `<div class="article__section">
        <h2 class="article__section-title">${b.title}</h2>
        <ul class="article__list">${items}</ul>
      </div>`;
    },
    figure(b) {
      return `<figure class="article__figure">
        <img src="${b.image}" alt="" class="article__image" />
        ${b.caption ? `<figcaption class="article__caption">${b.caption}</figcaption>` : ""}
      </figure>`;
    },
    text(b) {
      return `<p class="article__text">${b.content}</p>`;
    },
    "text-cloud"(b) {
      return `<div class="article__text-cloud">
        <div class="article__text-cloud__bg" style="background: url('${b.image}') center / contain no-repeat;"></div>
        <p class="article__text-cloud__content">${b.text}</p>
      </div>`;
    },
    "media-row"(b) {
      const p = Array.isArray(b.content)
        ? b.content.map((t) => `<p>${t}</p>`).join("")
        : `<p>${b.content}</p>`;
      return `<div class="article__media-row">
        <img src="${b.image}" alt="" class="article__media-row__image" />
        <div class="article__media-row__content">${p}</div>
      </div>`;
    },
    exercise(b) {
      const bg = b.bg ? `article__card--${b.bg}` : "";
      return `<div class="article__exercise ${bg}">
        <h3 class="article__exercise__title">${b.title}</h3>
        <p class="article__exercise__text">${b.text}</p>
      </div>`;
    },
    "twin-block"(b) {
      const cols = b.items
        .map(
          (item) => `
        <div class="article__twin__col">
          <img src="${item.image}" alt="" class="article__twin__image" />
          <p class="article__twin__text">${item.text}</p>
        </div>
      `,
        )
        .join("");
      return `<div class="article__twin">${cols}</div>`;
    },
    tags(b) {
      const html = b.items
        .map((item, i) => {
          const dot =
            i < b.items.length - 1
              ? `<span class="article__tag-dot">·</span>`
              : "";
          return `<span class="article__tag">${item}</span>${dot}`;
        })
        .join("");
      return `<div class="article__tags">${html}</div>`;
    },
  },

  render(data, containerId) {
    const container = document.getElementById(containerId);
    if (!container || !data?.blocks) return;

    container.innerHTML = "";
    const frag = document.createDocumentFragment();

    data.blocks.forEach((block) => {
      const renderer = this.renderers[block.type];
      if (renderer) {
        const temp = document.createElement("div");
        temp.innerHTML = renderer(block).trim();
        frag.appendChild(temp.firstElementChild);
      } else {
        console.warn(`⚠️ Нет рендерера для типа: ${block.type}`);
      }
    });

    container.appendChild(frag);
  },
};
