# 📦 АДАПТИВНАЯ ШАПКА: ЭТАП 2

**Дата:** 2026-04-10  
**Статус:** ✅ Завершено  
**Предыдущий этап:** [CONTAINER_PHASE1.md](./CONTAINER_PHASE1.md) (внешний контейнер)  
**Следующий этап:** Заголовок сайта + крошки (breadcrumbs)

---

## 🎯 ЦЕЛЬ

Разработать адаптивную систему внутренней структуры шапки (header) с компонентами:

- `header__group` (лого + меню)
- `header__nav` (навигация)
- `header__button` (кнопка CTA)
- `burger` (мобильное меню)

С точным соответствием параметрам из Figma и плавной анимацией сжатия/расширения.

---

## 📊 ТАБЛИЦА ПАРАМЕТРОВ КОМПОНЕНТОВ

### 1. Header\_\_group (контейнер лого + меню)

| Ширина экрана   | Height | Margin V | Width     | Формула Width           |
| --------------- | ------ | -------- | --------- | ----------------------- |
| **≥1441px**     | 36px   | 20px     | 806px     | —                       |
| **1024-1440px** | 36px   | 20px     | 710→806px | `710 + (vw-1024)/4.333` |
| **968-1024px**  | 36px   | 20px     | 697→710px | `697 + (vw-967)/4.333`  |
| **600-967px**   | 36px   | 20px     | 51px      | — (только лого)         |
| **<600px**      | 34px   | 19px     | 48px      | — (только лого)         |

**Коэффициент:** `4.333 = (1440-1024)/(806-710)`

---

### 2. Logo (`.header__logo img`)

| Ширина экрана | Width | Height |
| ------------- | ----- | ------ |
| **≥600px**    | 51px  | 36px   |
| **<600px**    | 48px  | 34px   |

**Позиционирование:** Прижат влево внутри `header__group` (`margin-left: 0`)

---

### 3. Navigation (`.header__nav`)

| Ширина экрана  | Display | Width     | Gap     | Формулы                                              |
| -------------- | ------- | --------- | ------- | ---------------------------------------------------- |
| **≥1441px**    | Block   | 704px     | 30px    | —                                                    |
| **968-1440px** | Block   | 616→704px | 14→30px | `width: 616+(vw-967)/5.4`<br>`gap: 14+(vw-967)/29.7` |
| **≤967px**     | None    | —         | —       | Скрыто                                               |

**Коэффициенты:**

- Width: `5.4 = (1440-1024)/(704-627)`
- Gap: `29.7 = (1440-1024)/(30-16)`

**Типографика:**

```css
font-family: Montserrat;
font-weight: 500;
font-size: 14px;
line-height: 1;
letter-spacing: 0.25px;
```

Позиционирование: Прижато вправо внутри header\_\_group (margin-left: auto)

4. Button (.header\_\_button)

| Параметр       | Значение            | CSS                              |
| -------------- | ------------------- | -------------------------------- |
| Display        | ≥968px              | display: block                   |
| Width          | 230px               | width: var(--button-width)       |
| Height         | 48px                | height: var(--button-height)     |
| Padding        | 14px / 20px         | padding: 14px 20px               |
| Background     | #E3F5F5             | var(--color-primary-light)       |
| Text color     | #03B2A5             | var(--color-primary)             |
| Hover BG       | #C9EDE9             | var(--color-primary-light-hover) |
| Hover Text     | #029d91             | var(--color-primary-dark)        |
| Border-radius  | 4px                 | var(--radius-sm)                 |
| Font           | Montserrat 700 16px | font: 700 16px var(--font-main)  |
| Line-height    | 100%                | line-height: 1                   |
| Letter-spacing | 0%                  | letter-spacing: 0                |

Позиционирование: Справа от header\_\_group, до бургера

5. Burger (.burger)

| Параметр   | Значение               | CSS                                           |
| ---------- | ---------------------- | --------------------------------------------- |
| Display    | ≤967px                 | display: flex                                 |
| Container  | 40×40px                | width/height: var(--burger-size)              |
| Icon       | 18×14px (SVG)          | width/height: var(--burger-icon-width/height) |
| Icon file  | images/burger-icon.svg | <img src="...">                               |
| Centring   | Flex                   | align/justify: center                         |
| Background | Оранжевый (отладка)    | rgba(255,165,0,0.15)                          |

Позиционирование: Справа в шапке, заменяет кнопку на ≤967px

📐 ФОРМУЛЫ (СВОДНАЯ ТАБЛИЦА)

| Компонент       | Параметр | Диапазон   | Формула              | Коэффициент |
| --------------- | -------- | ---------- | -------------------- | ----------- |
| Container       | Width    | 968-1440px | 927 + (vw-967)/1.733 | 1.733       |
| Container       | Margin   | 968-1440px | 12 + (vw-967)/4.73   | 4.73        |
| Header\_\_group | Width    | 968-1440px | 697 + (vw-967)/4.333 | 4.333       |
| Nav             | Width    | 968-1440px | 616 + (vw-967)/5.4   | 5.4         |
| Nav             | Gap      | 968-1440px | 14 + (vw-967)/29.7   | 29.7        |

📁 СТРУКТУРА ФАЙЛОВ

css/
├── 00-reset.css ← Body margin + сброс
├── 01-variables.css ← CSS переменные (все цвета, размеры, коэффициенты)
├── 02-containers.css ← Внешний container (красный фон)
├── 10-header-base.css ← Шапка + breakpoint display (967px) 🟢
├── 11-header-logo.css ← Логотип (размеры по брейкпоинтам) 🩵
├── 12-header-nav.css ← Меню (width, gap, стили) 🔴
├── 13-header-button.css ← Кнопка CTA (цвета, размеры) 🟣
└── 14-header-burger.css ← Бургер (контейнер + SVG иконка) 🟠

components/
└── header.html ← Полный HTML шапки (включая бургер!)

images/
├── logo.svg ← Логотип (51×36 / 48×34)
└── burger-icon.svg ← Иконка бургера (18×14)

js/
└── debug-header-group.js ← Логгер метрик header\_\_group

docs/
├── CONTAINER_PHASE1.md ← Этап 1: внешний контейнер
└── CONTAINER_PHASE2.md ← Этап 2: шапка (этот файл)

🎨 ЦВЕТОВАЯ СХЕМА ОТЛАДКИ

| Элемент         | Класс             | Цвет          | CSS                             |
| --------------- | ----------------- | ------------- | ------------------------------- |
| Body            | body              | 🔵 Синий      | "rgba(0 \| 0 \| 255 \| 0.15)"   |
| Container       | .container        | 🔴 Красный    | "rgba(255 \| 0 \| 0 \| 0.15)"   |
| Site-header     | .site-header      | 🟢 Зелёный    | "rgba(0 \| 255 \| 0 \| 0.1)"    |
| Header\_\_group | .header\_\_group  | 🟡 Жёлтый     | "rgba(255 \| 255 \| 0 \| 0.15)" |
| Logo            | .header\_\_logo   | 🩵 Голубой    | "rgba(0 \| 255 \| 255 \| 0.15)" |
| Nav             | .header\_\_nav    | 🔴 Красный    | "rgba(255 \| 0 \| 0 \| 0.15)"   |
| Button          | .header\_\_button | 🟣 Фиолетовый | "rgba(128 \| 0 \| 128 \| 0.15)" |
| Burger          | .burger           | 🟠 Оранжевый  | "rgba(255 \| 165 \| 0 \| 0.15)" |

🔍 ТОЧКИ ПРОВЕРКИ (CHECKPOINTS)

| Ширина | Container | Header\_\_group | Logo  | Nav   | Button | Burger |
| ------ | --------- | --------------- | ----- | ----- | ------ | ------ |
| 320px  | 296px     | 48px            | 48×34 | ❌    | ❌     | ✅     |
| 414px  | 366px     | 48px            | 48×34 | ❌    | ❌     | ✅     |
| 600px  | 560px     | 51px            | 51×36 | ❌    | ❌     | ✅     |
| 967px  | 927px     | ~697px          | 51×36 | ❌    | ❌     | ✅     |
| 968px  | 927px     | ~697px          | 51×36 | ✅    | ✅     | ❌     |
| 1024px | 960px     | 710px           | 51×36 | 627px | ✅     | ❌     |
| 1440px | 1200px    | 806px           | 51×36 | 704px | ✅     | ❌     |
| 1600px | 1200px    | 806px           | 51×36 | 704px | ✅     | ❌     |

💡 ИЗУЧЕННЫЕ МОМЕНТЫ (ОТ АВТОРА)
Breakpoint логика в одном файле — все display правила для меню/кнопки/бургера в 10-header-base.css, чтобы избежать рассинхрона при изменении точки перелома.
margin-left: auto вместо flex: 1 — для прижатия меню к правому краю header\_\_group без конфликта с width: calc().
Внешний SVG для бургера — не CSS-рисование, а отдельный файл images/burger-icon.svg (18×14px) внутри контейнера 40×40px.
Цвета кнопки из Figma — фон #E3F5F5 (светлый), текст #03B2A5 (тёмный), не наоборот!
letter-spacing: 0.25px — точное значение из Figma, не em и не rem.
line-height: 1 (100%) — для точного соответствия макету, без дополнительного «воздуха».
Структура HTML — index.html содержит только <div data-include="components/header.html">, весь код шапки в components/header.html.
Пути к изображениям — считаются от index.html, даже для загружаемых через include.js компонентов.

## ⚠️ ПОЧЕМУ `!important` НЕЛЬЗЯ УБРАТЬ

**Порядок загрузки CSS:**

1. `10-header-base.css` (breakpoint логика)
2. `11-header-logo.css`
3. `12-header-nav.css` (базовые стили меню)
4. `13-header-button.css`
5. `14-header-burger.css`

**Без `!important`:**

---

## ⚠️ !IMPORTANT: ОБОСНОВАНИЕ

### Почему эти 6 правил требуют !important

| #   | Селектор          | Свойство         | Файл               | Почему нельзя убрать                             |
| --- | ----------------- | ---------------- | ------------------ | ------------------------------------------------ |
| 1   | `.header__nav`    | `display: none`  | 10-header-base.css | 12-header-nav.css загружается после и перебивает |
| 2   | `.header__nav`    | `display: block` | 10-header-base.css | Базовый display из 12-header-nav.css             |
| 3   | `.header__button` | `display: none`  | 10-header-base.css | 13-header-button.css загружается после           |
| 4   | `.header__button` | `display: block` | 10-header-base.css | Базовый display из 13-header-button.css          |
| 5   | `.burger`         | `display: flex`  | 10-header-base.css | 14-header-burger.css загружается после           |
| 6   | `.burger`         | `display: none`  | 10-header-base.css | Базовый display из 14-header-burger.css          |

### Порядок загрузки CSS

```html
1. 10-header-base.css ← Breakpoint логика (загружено 1-м) ❌ 2.
11-header-logo.css 3. 12-header-nav.css ← Базовые стили меню (загружено 3-м) ✅
перебивает 4. 13-header-button.css ← Базовые стили кнопки (загружено 4-м) ✅
перебивает 5. 14-header-burger.css ← Базовые стили бургера (загружено 5-м) ✅
перебивает /* 10-header-base.css (загружено 1-м) */ @media (max-width: 967px) {
.header__nav { display: none } ← Перебивается ниже! } /* 12-header-nav.css
(загружено 3-м) */ .header__nav { display: block } ← Каскад побеждает! ❌
```
