(() => {
  const select = (selector, parent = document) => parent.querySelector(selector);
  const selectAll = (selector, parent = document) => Array.from(parent.querySelectorAll(selector));
  const isEmailValid = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const canAnimate = () => typeof window.gsap !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const clearErrors = (form) => {
    selectAll('[data-error]', form).forEach((node) => {
      node.textContent = '';
    });
  };

  const showError = (field, message) => {
    if (!field || !field.id) {
      return;
    }

    const error = document.querySelector(`[data-error="${field.id}"]`);

    if (!error) {
      return;
    }

    error.textContent = message;
  };

  const initContactValidation = () => {
    const form = select('[data-contact-form]');
    const message = select('[data-form-message]');

    if (!form) {
      return;
    }

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      clearErrors(form);

      const name = select('#contact-name', form);
      const email = select('#contact-email', form);
      const topic = select('#contact-topic', form);
      const details = select('#contact-message', form);

      let valid = true;

      if (!name || !name.value.trim()) {
        showError(name, 'Please add your name.');
        valid = false;
      }

      if (!email || !email.value.trim()) {
        showError(email, 'Please add an email address.');
        valid = false;
      } else if (!isEmailValid(email.value.trim())) {
        showError(email, 'Please use a valid email format.');
        valid = false;
      }

      if (!topic || !topic.value.trim()) {
        showError(topic, 'Please add a subject.');
        valid = false;
      }

      if (!details || !details.value.trim()) {
        showError(details, 'Please add a short message.');
        valid = false;
      }

      if (!message) {
        return;
      }

      if (!valid) {
        message.className = 'form-message form-message--error';
        message.textContent = 'Please fix the highlighted fields and try again.';
        return;
      }

      message.className = 'form-message form-message--ok';
      message.textContent = 'Thanks, your message is ready to be sent.';
      form.reset();
    });
  };

  const initContactIntro = () => {
    const blocks = selectAll('.availability-item');

    if (!blocks.length || !canAnimate()) {
      return;
    }

    window.gsap.from(blocks, {
      y: 16,
      opacity: 0,
      duration: 0.55,
      ease: 'power2.out',
      stagger: 0.07,
    });
  };

  const initContactPage = () => {
    initContactValidation();
    initContactIntro();
  };

  document.addEventListener('DOMContentLoaded', initContactPage);
})();
