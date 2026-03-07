(() => {
  const select = (selector, parent = document) => parent.querySelector(selector);
  const selectAll = (selector, parent = document) => Array.from(parent.querySelectorAll(selector));
  const canAnimate = () => typeof window.gsap !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const initHomeHeroMotion = () => {
    const hero = select('.intro__inner');
    const title = select('.intro__title', hero || document);
    const subtitle = select('.intro__subtitle', hero || document);
    const actions = select('.intro__actions', hero || document);

    if (!hero || !title || !actions || !canAnimate()) {
      return;
    }

    const timeline = window.gsap.timeline();

    timeline.from(hero, {
      opacity: 0,
      duration: 0.35,
      ease: 'power2.out',
    });

    timeline.from(title, {
      y: 32,
      opacity: 0,
      filter: 'blur(12px)',
      duration: 0.75,
      ease: 'power3.out',
    }, 0.05);

    if (subtitle) {
      timeline.from(subtitle, {
        y: 24,
        opacity: 0,
        filter: 'blur(8px)',
        duration: 0.7,
        ease: 'power2.out',
      }, 0.16);
    }

    timeline.from(actions, {
      y: 16,
      opacity: 0,
      duration: 0.62,
      ease: 'power2.out',
    }, 0.24);
  };

  const initHomeSectionMotion = () => {
    if (!canAnimate()) {
      return;
    }

    const imageCards = selectAll('.card__img img, .works__image, .blog__photo, .home-featured__item img');

    if (!imageCards.length) {
      return;
    }

    imageCards.forEach((item) => {
      window.gsap.from(item, {
        scale: 1.02,
        opacity: 0,
        filter: 'blur(8px)',
        duration: 0.72,
        ease: 'power2.out',
        clearProps: 'filter',
        scrollTrigger: {
          trigger: item,
          start: 'top 88%',
          toggleActions: 'play none none none',
          once: true,
        },
      });
    });
  };

  const initReviewsSlider = () => {
    const root = select('[data-reviews-slider]');

    if (!root || typeof window.Swiper === 'undefined') {
      return;
    }

    new window.Swiper(root, {
      loop: true,
      autoplay: {
        delay: 5500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      speed: 700,
      navigation: {
        prevEl: root.querySelector('.swiper-button-prev'),
        nextEl: root.querySelector('.swiper-button-next'),
      },
      pagination: {
        el: root.querySelector('.swiper-pagination'),
        clickable: true,
      },
      a11y: {
        prevSlideMessage: 'Previous review',
        nextSlideMessage: 'Next review',
      },
    });
  };

  const initHomePage = () => {
    initHomeHeroMotion();
    initHomeSectionMotion();
    initReviewsSlider();
  };

  document.addEventListener('DOMContentLoaded', initHomePage);
})();
