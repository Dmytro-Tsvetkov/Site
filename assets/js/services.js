(() => {
  const canAnimate = () => typeof window.gsap !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const select = (selector, parent = document) => parent.querySelector(selector);

  const scrollToTarget = (target) => {
    if (!target) {
      return;
    }

    const header = select('.header');
    const offsetY = header ? header.offsetHeight + 12 : 0;

    if (typeof window.gsap === 'undefined' || typeof window.ScrollToPlugin === 'undefined') {
      const top = target.getBoundingClientRect().top + window.pageYOffset - offsetY;
      window.scrollTo({ top, behavior: 'smooth' });
      return;
    }

    window.gsap.to(window, {
      duration: 0.95,
      ease: 'power2.out',
      scrollTo: { y: target, offsetY },
    });
  };

  const initServiceScroll = () => {
    const cta = select('[data-services-cta]');

    if (!cta) {
      return;
    }

    cta.addEventListener('click', (event) => {
      event.preventDefault();
      const target = select('#services-process');

      if (!target) {
        return;
      }

      scrollToTarget(target);
    });
  };

  const initServicesIntro = () => {
    const cards = document.querySelectorAll('.pricing-card');

    if (!cards.length || !canAnimate()) {
      return;
    }

    window.gsap.from(cards, {
      y: 18,
      opacity: 0,
      duration: 0.55,
      ease: 'power2.out',
      stagger: 0.08,
    });
  };

  const initServicesPage = () => {
    initServiceScroll();
    initServicesIntro();
  };

  document.addEventListener('DOMContentLoaded', initServicesPage);
})();
