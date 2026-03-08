# PhotoBlog

A polished multi-page photography portfolio and blog website built with semantic HTML, modular SCSS, and vanilla JavaScript.

This project was created as a front-end portfolio piece to demonstrate clean layout architecture, reusable styling, page-based code organization, and smooth user interactions without relying on frameworks.

## Live Demo

- **Website:** https://dmytro-tsvetkov.github.io/Site/index.html
- **Repository:** https://github.com/Dmytro-Tsvetkov/Site

---

## About the Project

PhotoBlog is a static front-end website for a photography brand.  
It combines portfolio presentation, blog content, service pages, case studies, and a contact page into one cohesive multi-page experience.

The main goal of the project was to build a visually engaging and well-structured website using only core front-end technologies, while keeping the codebase scalable and easy to maintain.

This project highlights:

- semantic HTML structure
- modular SCSS architecture
- reusable UI sections
- page-specific CSS compilation
- lightweight JavaScript interactions
- GSAP-powered motion and scroll effects
- responsive layout patterns across multiple pages

---

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Home page with hero, services, portfolio preview, team, reviews, and blog preview |
| `blog.html` | Blog listing page with category filter and search |
| `blog-post.html` | Single article page with content, sidebar, author block, and related posts |
| `services.html` | Services overview with process steps, pricing, and FAQ |
| `work.html` | Portfolio page with filtering and search |
| `work-case.html` | Case study page with project overview, gallery, results, and testimonial |
| `contact.html` | Contact page with form, studio details, social links, and FAQ |

> This project is deployed as a static website, so pages are served as individual HTML files.

---

## Key Features

- Multi-page static website structure
- Responsive layout with mobile-first breakpoints
- Reusable SCSS partial architecture
- Page-based CSS output for cleaner separation
- Blog filtering and title search
- Portfolio filtering and search
- Animated statistics counters
- Smooth scrolling and parallax effects
- Home page review slider powered by Swiper
- Contact form with client-side validation
- Shared global behavior managed from a single JS entry file

---

## Tech Stack

- **HTML5** — semantic and structured markup
- **SCSS** — modular styling architecture
- **Vanilla JavaScript** — interactive functionality without frameworks
- **GSAP 3** — animations, scroll-triggered effects, parallax, smooth scrolling
- **Swiper 11** — reviews slider
- **Font Awesome 6** — icons
- **Google Fonts** — Montserrat and Kaushan Script
- **Gulp 4** — build pipeline for styles
- **PostCSS + Autoprefixer** — CSS compatibility tooling
- **Dart Sass** — SCSS compilation

---

## What This Project Demonstrates

This project was designed to showcase practical front-end skills that are important in real-world development:

### 1. Clean project organization
The codebase is split into reusable SCSS layers and page-specific entry points, making it easier to scale and maintain.

### 2. Component-oriented thinking without a framework
Even though the project uses plain HTML, SCSS, and JavaScript, the UI is structured into reusable blocks and shared patterns.

### 3. Performance-conscious styling
Each page has its own compiled CSS file, so styles are separated by page responsibility instead of being bundled into one oversized stylesheet.

### 4. JavaScript for UX, not complexity
Interactions such as filters, search, smooth scrolling, slider initialization, and animations are implemented with lightweight vanilla JS.

### 5. Portfolio-ready visual presentation
The project is focused not only on code quality, but also on presentation, hierarchy, animation, and polished UI composition.

---

## Project Structure

```text
/
├── index.html
├── blog.html
├── blog-post.html
├── services.html
├── work.html
├── work-case.html
├── contact.html
│
├── assets/
│   ├── css/
│   │   ├── home.css
│   │   ├── blog.css
│   │   ├── blog-post.css
│   │   ├── services.css
│   │   ├── work.css
│   │   ├── work-case.css
│   │   └── contact.css
│   │
│   ├── scss/
│   │   ├── home.scss
│   │   ├── blog.scss
│   │   ├── blog-post.scss
│   │   ├── services.scss
│   │   ├── work.scss
│   │   ├── work-case.scss
│   │   ├── contact.scss
│   │   │
│   │   ├── abstracts/
│   │   │   └── _variables.scss
│   │   ├── base/
│   │   │   ├── _tokens.scss
│   │   │   ├── _reset.scss
│   │   │   └── _typography.scss
│   │   ├── layout/
│   │   │   ├── _container.scss
│   │   │   ├── _header.scss
│   │   │   └── _footer.scss
│   │   ├── ui/
│   │   │   ├── _buttons.scss
│   │   │   ├── _forms.scss
│   │   │   ├── _social.scss
│   │   │   └── _breadcrumb.scss
│   │   ├── blocks/
│   │   │   ├── _page-hero.scss
│   │   │   ├── _intro.scss
│   │   │   ├── _cards.scss
│   │   │   ├── _statistics.scss
│   │   │   ├── _services-block.scss
│   │   │   ├── _devices.scss
│   │   │   ├── _works.scss
│   │   │   ├── _reviews.scss
│   │   │   ├── _clients.scss
│   │   │   ├── _logos.scss
│   │   │   ├── _blog-section.scss
│   │   │   ├── _map.scss
│   │   │   └── _faq.scss
│   │   ├── pages/
│   │   │   ├── _home.scss
│   │   │   ├── _blog.scss
│   │   │   ├── _blog-post.scss
│   │   │   ├── _services.scss
│   │   │   ├── _work.scss
│   │   │   ├── _work-case.scss
│   │   │   └── _contact.scss
│   │   └── utilities/
│   │       └── _utilities.scss
│   │
│   ├── js/
│   │   ├── main.js
│   │   ├── home.js
│   │   ├── blog.js
│   │   ├── services.js
│   │   ├── work.js
│   │   └── contact.js
│   │
│   └── images/
│       ├── works/
│       ├── blog/
│       ├── team/
│       ├── clients/
│       ├── instagram/
│       └── logos/
│
├── gulpfile.js
└── package.json
```

---

## Styling Architecture

The project uses a **modular SCSS structure** with page-level entry points.

Instead of shipping one global stylesheet for the entire website, each page compiles its own CSS file and imports only the styles it needs. This makes the code easier to reason about and keeps styling more maintainable as the project grows.

### SCSS layers

| Layer | Responsibility |
|------|----------------|
| `abstracts` | Variables and breakpoints |
| `base` | Tokens, reset, typography |
| `layout` | Shared layout parts such as container, header, footer |
| `ui` | Buttons, forms, breadcrumb, social elements |
| `blocks` | Reusable content sections |
| `pages` | Page-specific layout and overrides |
| `utilities` | Helper utility classes |

### Breakpoints

| Variable | Value |
|----------|-------|
| `$bp-md` | `768px` |
| `$bp-lg` | `1024px` |
| `$bp-xl` | `1280px` |
| `$bp-2xl` | `1440px` |

---

## JavaScript Overview

The project uses vanilla JavaScript wrapped in IIFEs for simple and isolated behavior.

### Shared functionality in `main.js`

- header scroll state
- mobile navigation
- smooth scrolling
- GSAP initialization
- ScrollTrigger / ScrollSmoother setup
- scroll-based entrance animations
- stat counter animation
- parallax effects

### Page-specific scripts

| File | Responsibility |
|------|----------------|
| `home.js` | Hero entrance animation, reviews slider |
| `blog.js` | Blog filtering and search |
| `services.js` | Services page interactions |
| `work.js` | Portfolio filtering and search |
| `contact.js` | Contact form validation |

> `blog-post.html` and `work-case.html` currently rely on shared behavior from `main.js`.

---

## Design Tokens

Main visual tokens are defined in `assets/scss/base/_tokens.scss` as CSS custom properties:

```css
--color-primary: #44a282;
--color-primary-light: #95e1d3;
--color-accent: #f38181;
--color-text: #333333;
--color-muted: #8f8f8f;
--color-soft: #f8f8f8;
--font-base: 'Montserrat', sans-serif;
--font-accent: 'Kaushan Script', cursive;
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install dependencies

```bash
npm install
```

### Run development mode

```bash
npm run dev
```

### Watch styles

```bash
npm run watch
```

### Build production CSS

```bash
npm run build
```

### Compile styles once

```bash
npm run styles
```

---

## Notes

- This is a **static front-end project**
- No backend or CMS is connected
- The contact form currently uses **client-side validation only**
- External UI libraries are loaded via CDN in the HTML files

---

## Browser Support

The project is intended for modern browsers:

- Chrome
- Firefox
- Safari
- Edge

Autoprefixer is used in the build process for better CSS compatibility.

---

## Author

**Dmytro Tsvetkov**

Front-end developer focused on building clean, responsive, and visually polished interfaces with strong attention to structure, maintainability, and user experience.
