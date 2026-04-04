/* =============================================
   MY SCREEN SIZE — animations.js
   ============================================= */

(function () {
  'use strict';

  function initRevealObserver() {
    const targets = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    if (!targets.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px',
    });

    targets.forEach(el => observer.observe(el));
  }

  // Stagger children of a parent
  function staggerChildren(parentSelector, childSelector, baseDelay = 0.08) {
    document.querySelectorAll(parentSelector).forEach(parent => {
      parent.querySelectorAll(childSelector).forEach((child, i) => {
        child.style.transitionDelay = `${baseDelay * i}s`;
      });
    });
  }

  // Smooth scroll for anchor links
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', e => {
        const id = link.getAttribute('href').slice(1);
        const target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        const offset = 80; // header height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  }

  // Add number counter animation to card values
  function animateNumbers() {
    // Observe primary card value change and add subtle glow
    const primaryVal = document.getElementById('det-resolution');
    if (!primaryVal) return;

    const mo = new MutationObserver(() => {
      primaryVal.style.textShadow = '0 0 12px rgba(61,108,255,0.5)';
      setTimeout(() => { primaryVal.style.textShadow = ''; }, 600);
    });
    mo.observe(primaryVal, { childList: true, characterData: true, subtree: true });
  }

  // Active nav highlight style injection
  function injectActiveNavStyle() {
    const style = document.createElement('style');
    style.textContent = `.nav-link.active { color: var(--accent); background: rgba(61,108,255,0.08); }`;
    document.head.appendChild(style);
  }

  function init() {
    // Wait a tick for header/footer to inject
    setTimeout(() => {
      initRevealObserver();
      staggerChildren('.detector-grid', '.detector-card', 0.07);
      staggerChildren('.device-grid', '.device-info-panel', 0.1);
      staggerChildren('.features-grid', '.feature-card', 0.08);
      staggerChildren('.faq-list', '.faq-item', 0.05);
      initSmoothScroll();
      animateNumbers();
      injectActiveNavStyle();
    }, 100);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
