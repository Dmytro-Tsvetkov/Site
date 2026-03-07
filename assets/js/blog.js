(() => {
  const select = (selector, parent = document) => parent.querySelector(selector);
  const selectAll = (selector, parent = document) => Array.from(parent.querySelectorAll(selector));
  const normalize = (value) => value.trim().toLowerCase();
  const canAnimate = () => typeof window.gsap !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const initBlogFilters = () => {
    const wrapper = select('[data-blog-root]');

    if (!wrapper) {
      return;
    }

    const cards = selectAll('[data-blog-card]', wrapper);
    const buttons = selectAll('[data-filter]', wrapper);
    const search = select('[data-search-input]', wrapper);
    const emptyState = select('[data-blog-empty]', wrapper);

    if (!cards.length || !buttons.length) {
      return;
    }

    let activeFilter = 'all';
    let term = '';

    const update = () => {
      let visibleCount = 0;

      cards.forEach((card) => {
        const category = normalize(card.dataset.category || '');
        const title = normalize(card.dataset.title || card.textContent || '');
        const filterMatch = activeFilter === 'all' || category === activeFilter;
        const searchMatch = !term || title.includes(term);
        const visible = filterMatch && searchMatch;

        card.classList.toggle('is-hidden', !visible);

        if (visible) {
          visibleCount += 1;
        }
      });

      if (emptyState) {
        emptyState.classList.toggle('is-hidden', visibleCount > 0);
      }
    };

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        activeFilter = normalize(button.dataset.filter || 'all');

        buttons.forEach((item) => item.classList.remove('is-active'));
        button.classList.add('is-active');

        update();
      });
    });

    if (search) {
      search.addEventListener('input', () => {
        term = normalize(search.value);
        update();
      });
    }

    update();
  };

  const initBlogIntro = () => {
    const posts = selectAll('.popular-post');

    if (!posts.length || !canAnimate()) {
      return;
    }

    window.gsap.from(posts, {
      y: 14,
      opacity: 0,
      duration: 0.55,
      ease: 'power2.out',
      stagger: 0.08,
    });
  };

  const initBlogPage = () => {
    initBlogFilters();
    initBlogIntro();
  };

  document.addEventListener('DOMContentLoaded', initBlogPage);
})();
