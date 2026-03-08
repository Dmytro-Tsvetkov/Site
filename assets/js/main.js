(() => {
  const select = (selector, parent = document) => parent.querySelector(selector);
  const selectAll = (selector, parent = document) => Array.from(parent.querySelectorAll(selector));
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const initGsapCore = () => {
    if (typeof window.gsap === 'undefined') {
      return false;
    }

    if (window.ScrollTrigger) {
      window.gsap.registerPlugin(window.ScrollTrigger);
    }

    if (window.ScrollToPlugin) {
      window.gsap.registerPlugin(window.ScrollToPlugin);
    }

    if (window.ScrollSmoother) {
      window.gsap.registerPlugin(window.ScrollSmoother);
    }

    window.gsap.defaults({
      duration: 0.75,
      ease: 'power2.out',
    });

    return true;
  };

  const setNavActiveByPath = () => {
    const links = selectAll('.nav__link');

    if (!links.length) {
      return;
    }

    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    links.forEach((link) => {
      const href = link.getAttribute('href') || '';
      const linkPath = href.split('/').pop() || '';
      const active = linkPath === currentPath;
      link.classList.toggle('active', active);
      if (active) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  const initHeaderState = (gsapReady) => {
    const header = select('.header');

    if (!header) {
      return;
    }

    const COMPACT_ON = 80;
    const COMPACT_OFF = 40;
    let compactState = window.scrollY > COMPACT_ON;
    header.classList.toggle('is-compact', compactState);

    let ticking = false;

    const applyState = () => {
      const y = window.scrollY;

      if (!compactState && y > COMPACT_ON) {
        compactState = true;
      } else if (compactState && y < COMPACT_OFF) {
        compactState = false;
      }

      header.classList.toggle('is-compact', compactState);
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(applyState);
    };

    document.addEventListener('scroll', onScroll, { passive: true });

    if (gsapReady && !reducedMotion) {
      window.gsap.from(header, {
        y: -24,
        opacity: 0,
        duration: 0.5,
      });
    }
  };

  const initMobileNav = () => {
    const toggle = select('[data-nav-toggle]');
    const nav = select('[data-nav]');

    if (!toggle || !nav) {
      return;
    }

    const closeNav = () => {
      nav.classList.remove('is-open');
      toggle.classList.remove('is-active');
      toggle.setAttribute('aria-expanded', 'false');
    };

    const openNav = () => {
      nav.classList.add('is-open');
      toggle.classList.add('is-active');
      toggle.setAttribute('aria-expanded', 'true');
    };

    const toggleNav = () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';

      if (expanded) {
        closeNav();
      } else {
        openNav();
      }
    };

    toggle.addEventListener('click', toggleNav);

    selectAll('.nav__link', nav).forEach((link) => {
      link.addEventListener('click', closeNav);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeNav();
      }
    });
  };

  const initSubscribeForms = () => {
    const forms = selectAll('.subscribe, .newsletter-form');

    if (!forms.length) {
      return;
    }

    forms.forEach((form) => {
      const input = select('input[type="email"]', form);

      if (!input) {
        return;
      }

      form.addEventListener('submit', (event) => {
        if (!input.value.trim()) {
          event.preventDefault();
          input.focus();
        }
      });
    });
  };

  const smoothFocusTarget = (target) => {
    if (!target.id) {
      return;
    }

    const previous = target.getAttribute('tabindex');
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });

    if (previous === null) {
      target.addEventListener(
        'blur',
        () => {
          target.removeAttribute('tabindex');
        },
        { once: true }
      );
    }
  };

  const initSmoothScroll = () => {
    const links = selectAll('a[href*="#"]');

    if (!links.length) {
      return;
    }

    links.forEach((link) => {
      link.addEventListener('click', (event) => {
        const href = link.getAttribute('href') || '';

        if (!href.includes('#') || href.endsWith('#')) {
          return;
        }

        const url = new URL(href, window.location.href);

        if (url.pathname !== window.location.pathname || !url.hash) {
          return;
        }

        const target = select(url.hash);

        if (!target) {
          return;
        }

        event.preventDefault();

        const header = select('.header');
        const offsetY = header ? header.offsetHeight + 12 : 0;

        if (reducedMotion || typeof window.gsap === 'undefined') {
          const top = target.getBoundingClientRect().top + window.pageYOffset - offsetY;
          window.scrollTo({ top, behavior: reducedMotion ? 'auto' : 'smooth' });
          smoothFocusTarget(target);
          return;
        }

        if (window._smoother) {
          window._smoother.scrollTo(target, true, 'top ' + offsetY + 'px');
          smoothFocusTarget(target);
          return;
        }

        window.gsap.to(window, {
          duration: 0.95,
          ease: 'power2.out',
          scrollTo: { y: target, offsetY },
          onComplete: () => {
            smoothFocusTarget(target);
          },
        });
      });
    });
  };

  const parseCounterValue = (rawValue) => {
    const value = rawValue.trim();
    const match = value.match(/^([+-]?\d*\.?\d+)([a-zA-Z%+]*)$/);

    if (!match) {
      return null;
    }

    return {
      number: parseFloat(match[1]),
      suffix: match[2] || '',
      decimals: (match[1].split('.')[1] || '').length,
      full: value,
    };
  };

  const formatCounter = (meta, current) => {
    const base = meta.decimals > 0 ? current.toFixed(meta.decimals) : Math.round(current).toString();
    return `${base}${meta.suffix}`;
  };

  const initStatCounters = (gsapReady) => {
    const numbers = selectAll('.stat__number[data-value]');

    if (!numbers.length) {
      return;
    }

    const animateCounter = (node) => {
      const parsed = parseCounterValue(node.dataset.value || '');

      if (!parsed) {
        return;
      }

      node.textContent = `0${parsed.suffix}`;

      if (!gsapReady || reducedMotion) {
        node.textContent = parsed.full;
        return;
      }

      const state = { value: 0 };

      window.gsap.to(state, {
        value: parsed.number,
        duration: 1.25,
        ease: 'power2.out',
        onUpdate: () => {
          node.textContent = formatCounter(parsed, state.value);
        },
        onComplete: () => {
          node.textContent = parsed.full;
        },
      });
    };

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          animateCounter(entry.target);
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.55 }
    );

    numbers.forEach((node) => {
      node.textContent = '0';
      observer.observe(node);
    });
  };

  const initDataAnimations = (gsapReady) => {
    const targets = selectAll('[data-anim]');

    if (!targets.length) {
      return;
    }

    if (!gsapReady || reducedMotion || typeof window.ScrollTrigger === 'undefined') {
      targets.forEach((node) => {
        node.style.opacity = '1';
        node.style.transform = 'none';
      });
      return;
    }

    const variants = {
      'fade-up':     { y: 36, opacity: 0, filter: 'blur(8px)' },
      'fade-in':     { opacity: 0, filter: 'blur(10px)' },
      'fade-down':   { y: -28, opacity: 0, filter: 'blur(6px)' },
      'scale':       { scale: 0.91, opacity: 0, filter: 'blur(8px)' },
      'image-in':    { scale: 1.05, opacity: 0, filter: 'blur(12px)' },
      'slide-right': { x: -44, opacity: 0, filter: 'blur(4px)' },
      'slide-left':  { x: 44, opacity: 0, filter: 'blur(4px)' },
    };

    targets.forEach((target) => {
      const variant = target.dataset.anim || 'fade-up';
      const fromVars = variants[variant] || variants['fade-up'];
      const duration = parseFloat(target.dataset.animDuration || '0.88');
      const staggerValue = parseFloat(target.dataset.animStagger || '0');
      const triggerStart = target.dataset.animStart || 'top 88%';

      if (staggerValue > 0) {
        const items = selectAll('[data-anim-item]', target);
        const groupedItems = items.length ? items : Array.from(target.children);

        if (groupedItems.length > 1) {
          window.gsap.from(groupedItems, {
            ...fromVars,
            duration,
            stagger: staggerValue,
            ease: target.dataset.animEase || 'power3.out',
            clearProps: 'filter',
            scrollTrigger: {
              trigger: target,
              start: triggerStart,
              toggleActions: 'play none none none',
              once: true,
            },
          });
          return;
        }
      }

      window.gsap.from(target, {
        ...fromVars,
        duration,
        ease: target.dataset.animEase || 'power3.out',
        clearProps: 'filter',
        scrollTrigger: {
          trigger: target,
          start: triggerStart,
          toggleActions: 'play none none none',
          once: true,
        },
      });
    });
  };

  const initAutoReveal = (gsapReady) => {
    if (!gsapReady || reducedMotion || typeof window.ScrollTrigger === 'undefined') {
      return;
    }

    const gs = window.gsap;
    const once = { toggleActions: 'play none none none', once: true };

    selectAll('.section__header').forEach((header) => {
      const children = Array.from(header.children);
      if (!children.length) return;

      gs.from(children, {
        y: 40,
        opacity: 0,
        filter: 'blur(8px)',
        duration: 0.82,
        stagger: 0.14,
        ease: 'power3.out',
        clearProps: 'filter',
        scrollTrigger: { trigger: header, start: 'top 88%', ...once },
      });
    });

    const grids = [
      { parent: '.card',              child: '.card__item',        stagger: 0.1,  y: 40 },
      { parent: '.services-list',     child: '.service-card',      stagger: 0.08, y: 32 },
      { parent: '.pricing-grid',      child: '.pricing-card',      stagger: 0.1,  y: 36 },
      { parent: '.work-grid',         child: '.work-card',         stagger: 0.07, y: 28 },
      { parent: '.blog-listing',      child: '.blog-card',         stagger: 0.08, y: 32 },
      { parent: '.workflow-grid',     child: '.workflow-item',     stagger: 0.09, y: 28 },
      { parent: '.work-quotes',       child: '.work-quote',        stagger: 0.1,  y: 28 },
      { parent: '.availability-grid', child: '.availability-item', stagger: 0.1,  y: 28 },
      { parent: '.faq-list',          child: '.faq-item',          stagger: 0.07, y: 28 },
      { parent: '.popular-posts',     child: '.popular-post',      stagger: 0.09, y: 24 },
      { parent: '.clients',           child: '.clients__item',     stagger: 0.12, y: 32 },
      { parent: '.logos',             child: '.logos__item',       stagger: 0.06, y: 20 },
      { parent: '.process',           child: '.process__item',     stagger: 0.12, y: 32 },
      { parent: '.stat',              child: '.stat__item',        stagger: 0.09, y: 24 },
      { parent: '.blog',              child: '.blog__item',        stagger: 0.1,  y: 32 },
      { parent: '.services',          child: '.services__item',    stagger: 0.08, y: 28 },
    ];

    grids.forEach(({ parent, child, stagger, y }) => {
      selectAll(parent).forEach((parentEl) => {
        const items = selectAll(child, parentEl);
        if (!items.length) return;

        gs.from(items, {
          y,
          opacity: 0,
          scale: 0.96,
          duration: 0.68,
          stagger: { amount: stagger * items.length, from: 'start' },
          ease: 'power3.out',
          clearProps: 'all',
          scrollTrigger: { trigger: parentEl, start: 'top 86%', ...once },
        });
      });
    });

    const footerCols = selectAll('.footer__col');
    if (footerCols.length) {
      gs.from(footerCols, {
        y: 32,
        opacity: 0,
        duration: 0.72,
        stagger: 0.14,
        ease: 'power3.out',
        clearProps: 'all',
        scrollTrigger: { trigger: '.footer__inner', start: 'top 92%', ...once },
      });
    }

    const featuredImg = select('.featured-case__image');
    if (featuredImg) {
      gs.from(featuredImg, {
        x: -40,
        opacity: 0,
        scale: 0.97,
        duration: 1,
        ease: 'power3.out',
        clearProps: 'all',
        scrollTrigger: { trigger: featuredImg, start: 'top 84%', ...once },
      });
    }

    const contactPanels = selectAll('.contact-panel');
    contactPanels.forEach((panel, i) => {
      gs.from(panel, {
        x: i % 2 === 0 ? -28 : 28,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        clearProps: 'all',
        scrollTrigger: { trigger: panel, start: 'top 88%', ...once },
      });
    });
  };

  const initScrubEffects = (gsapReady) => {
    if (!gsapReady || reducedMotion || typeof window.ScrollTrigger === 'undefined') {
      return;
    }

    const gs = window.gsap;

    // Only scrub images inside overflow:hidden containers; scrubbing layout elements causes content shift.

    const scrub = (img, trigger, amount = 5, speed = 1) => {
      gs.fromTo(img,
        { yPercent: -amount },
        { yPercent: amount, ease: 'none',
          scrollTrigger: { trigger, start: 'top bottom', end: 'bottom top', scrub: speed },
        }
      );
    };

    selectAll('.works__image').forEach((img) => {
      scrub(img, img.closest('.works__item') || img.parentElement, 4, 0.9);
    });

    selectAll('.blog__photo').forEach((img) => {
      scrub(img, img.closest('.blog__item') || img.parentElement, 5, 1.1);
    });

    const featuredCase = select('.featured-case__image');
    if (featuredCase) {
      scrub(featuredCase, featuredCase.closest('.featured-case') || featuredCase, 6, 1.2);
    }
  };

  const initScrollSmoother = (gsapReady) => {
    if (!gsapReady || reducedMotion) return;
    if (typeof window.ScrollSmoother === 'undefined') return;

    const wrapper = document.getElementById('smooth-wrapper');
    const content = document.getElementById('smooth-content');
    if (!wrapper || !content) return;

    window._smoother = window.ScrollSmoother.create({
      wrapper,
      content,
      smooth: 1,
      effects: true,
      smoothTouch: 0.1,
    });
  };

  const initParallaxDepth = (gsapReady) => {
    if (!gsapReady || reducedMotion || typeof window.ScrollTrigger === 'undefined') {
      return;
    }

    const layered = selectAll('[data-parallax]');

    layered.forEach((node) => {
      const amount = parseFloat(node.dataset.parallax || '8');

      window.gsap.to(node, {
        yPercent: amount,
        ease: 'none',
        scrollTrigger: {
          trigger: node,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.6,
        },
      });
    });

    const backgrounds = selectAll('[data-parallax-bg]');

    backgrounds.forEach((node) => {
      const amount = parseFloat(node.dataset.parallaxBg || '0.12');

      window.gsap.fromTo(
        node,
        { backgroundPosition: '50% 0%' },
        {
          backgroundPosition: `50% ${Math.round(40 * amount)}%`,
          ease: 'none',
          scrollTrigger: {
            trigger: node,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          },
        }
      );
    });
  };

  const initMain = () => {
    const gsapReady = initGsapCore();

    // ScrollSmoother must be created before any ScrollTriggers
    initScrollSmoother(gsapReady);

    setNavActiveByPath();
    initHeaderState(gsapReady);
    initMobileNav();
    initSubscribeForms();
    initSmoothScroll();
    initStatCounters(gsapReady);
    initDataAnimations(gsapReady);
    initAutoReveal(gsapReady);
    initScrubEffects(gsapReady);
    initParallaxDepth(gsapReady);
  };

  document.addEventListener('DOMContentLoaded', initMain);
})();
