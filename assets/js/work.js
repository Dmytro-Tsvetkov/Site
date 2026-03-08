(() => {
  const select = (selector, parent = document) => parent.querySelector(selector);
  const selectAll = (selector, parent = document) => Array.from(parent.querySelectorAll(selector));
  const canAnimate = () => typeof window.gsap !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const normalize = (str) => str.toLowerCase().trim();

  const initWorkFilters = () => {
    const root = select('[data-work-root]');

    if (!root) {
      return;
    }

    const buttons = selectAll('[data-work-filter]', root);
    const cards = selectAll('[data-work-card]', root);
    const searchInput = select('[data-work-search]');
    const emptyMsg = select('[data-work-empty]');

    if (!buttons.length || !cards.length) {
      return;
    }

    let activeFilter = 'all';

    const update = () => {
      const query = searchInput ? normalize(searchInput.value) : '';
      let anyVisible = false;

      cards.forEach((card) => {
        const category = normalize(card.dataset.category || '');
        const title = normalize(card.dataset.title || '');
        const matchesFilter = activeFilter === 'all' || category === activeFilter;
        const matchesSearch = !query || title.includes(query) || category.includes(query);
        const visible = matchesFilter && matchesSearch;
        card.classList.toggle('is-hidden', !visible);
        if (visible) anyVisible = true;
      });

      if (emptyMsg) emptyMsg.classList.toggle('is-hidden', anyVisible);
    };

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        activeFilter = button.dataset.workFilter || 'all';
        buttons.forEach((item) => item.classList.remove('is-active'));
        button.classList.add('is-active');
        update();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', update);
    }

    update();
  };

  const initWorkIntro = () => {
    const caseBlock = select('.featured-case');

    if (!caseBlock || !canAnimate()) {
      return;
    }

    window.gsap.from(caseBlock, {
      y: 18,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
    });
  };

  const initWorkPage = () => {
    initWorkFilters();
    initWorkIntro();
  };

  document.addEventListener('DOMContentLoaded', initWorkPage);
})();
