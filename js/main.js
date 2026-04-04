/* =============================================
   MY SCREEN SIZE — main.js
   ============================================= */

(function () {
  'use strict';

  // ---- Add top padding for fixed header ----
  function fixHeaderOffset() {
    document.body.style.paddingTop = '0px';
    const main = document.querySelector('main');
    if (main) main.style.paddingTop = '0px';
    // Hero section already has padding-top: 100px which accounts for header
  }

  // ---- Page progress indicator ----
  function initProgressBar() {
    const bar = document.createElement('div');
    bar.style.cssText = `
      position: fixed;
      top: 0; left: 0;
      height: 2px;
      background: linear-gradient(90deg, var(--accent), var(--accent-2), var(--accent-3));
      z-index: 9999;
      width: 0%;
      transition: width 0.1s ease;
      pointer-events: none;
    `;
    document.body.appendChild(bar);

    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const total    = document.documentElement.scrollHeight - window.innerHeight;
      const pct      = total > 0 ? (scrolled / total) * 100 : 0;
      bar.style.width = pct + '%';
    }, { passive: true });
  }

  // ---- Back-to-top button ----
  function initBackToTop() {
    const btn = document.createElement('button');
    btn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 14V4M5 8l4-4 4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`;
    btn.setAttribute('aria-label', 'Back to top');
    btn.style.cssText = `
      position: fixed;
      bottom: 28px; right: 28px;
      width: 44px; height: 44px;
      background: var(--surface-2);
      border: 1px solid var(--border-2);
      border-radius: 50%;
      color: var(--text-2);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 900;
      opacity: 0;
      transform: translateY(10px);
      transition: opacity 0.3s ease, transform 0.3s ease, background 0.2s ease;
      box-shadow: 0 4px 16px rgba(0,0,0,0.3);
    `;
    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        btn.style.opacity   = '1';
        btn.style.transform = 'translateY(0)';
      } else {
        btn.style.opacity   = '0';
        btn.style.transform = 'translateY(10px)';
      }
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    btn.addEventListener('mouseenter', () => {
      btn.style.background = 'var(--accent)';
      btn.style.color = '#fff';
      btn.style.borderColor = 'var(--accent)';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.background = 'var(--surface-2)';
      btn.style.color = 'var(--text-2)';
      btn.style.borderColor = 'var(--border-2)';
    });
  }

  // ---- Lazy-load section observer ----
  function lazyLoadSections() {
    const sections = document.querySelectorAll('section');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.setAttribute('data-loaded', 'true');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.05 });
    sections.forEach(s => io.observe(s));
  }

  // ---- Keyboard accessibility ----
  function initKeyboardNav() {
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        const mobileNav = document.getElementById('mobile-nav');
        if (mobileNav && mobileNav.classList.contains('open')) {
          mobileNav.classList.remove('open');
          document.getElementById('menu-toggle')?.setAttribute('aria-expanded', 'false');
        }
      }
    });
  }

  // ---- Check for reduced motion preference ----
  function respectMotionPreference() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.style.setProperty('--transition', '0s');
      const style = document.createElement('style');
      style.textContent = `
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
        .hero-orb { animation: none !important; }
      `;
      document.head.appendChild(style);
    }
  }

  // ---- Print / meta update ----
  function updatePageMeta() {
    // Dynamically append current screen info to description for freshness
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      const w = screen.width, h = screen.height;
      metaDesc.content = `Detect your ${w}×${h} screen size instantly. Free tool for screen resolution, viewport size, pixel density, and device info for all devices.`;
    }
  }

  // ---- Run all ----
  function boot() {
    fixHeaderOffset();
    initProgressBar();
    initBackToTop();
    lazyLoadSections();
    initKeyboardNav();
    respectMotionPreference();

    // Slight delay so all components are rendered
    setTimeout(updatePageMeta, 200);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
