(() => {
  const select = (selector, parent = document) => parent.querySelector(selector);
  const selectAll = (selector, parent = document) => Array.from(parent.querySelectorAll(selector));
  const canAnimate = () => typeof window.gsap !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const initWorkFilters = () => {
    const root = select('[data-work-root]');

    if (!root) {
      return;
    }

    const buttons = selectAll('[data-work-filter]', root);
    const cards = selectAll('[data-work-card]', root);

    if (!buttons.length || !cards.length) {
      return;
    }

    const applyFilter = (value) => {
      const target = value.toLowerCase();

      cards.forEach((card) => {
        const category = (card.dataset.category || '').toLowerCase();
        const visible = target === 'all' || category === target;
        card.classList.toggle('is-hidden', !visible);
      });
    };

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const filter = button.dataset.workFilter || 'all';

        buttons.forEach((item) => item.classList.remove('is-active'));
        button.classList.add('is-active');
        applyFilter(filter);
      });
    });

    applyFilter('all');
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
