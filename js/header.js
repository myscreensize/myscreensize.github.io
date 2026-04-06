/* =============================================
   MY SCREEN SIZE — header.js (component)
   ============================================= */

(function () {
  'use strict';

  const NAV_LINKS = [
    { label: 'Home',    href: '/' },
    { label: 'Device Info', href: '#device-info' },
    { label: 'Breakpoints', href: '#breakpoints' },
    { label: 'Comparison',  href: '#comparison' },
    { label: 'Features',    href: '#features' },
    { label: 'FAQ',         href: '#faq' },
  ];

  function buildHeader() {
    const root = document.getElementById('header-root');
    if (!root) return;

    // --- Desktop nav items ---
    const navItems = NAV_LINKS.map(link =>
      `<a class="nav-link" href="${link.href}">${link.label}</a>`
    ).join('');

    // --- Mobile nav items ---
    const mobileItems = NAV_LINKS.map(link =>
      `<a class="mobile-nav-link" href="${link.href}">${link.label}</a>`
    ).join('');

    root.innerHTML = `
      <header id="site-header" role="banner">
        <div class="header-inner">
          <a href="/" class="header-logo" aria-label="My Screen Size Home">
            <div class="logo-icon" aria-hidden="true">⊡</div>
            <span>My Screen Size</span>
          </a>
          <nav class="header-nav" role="navigation" aria-label="Main navigation">
            ${navItems}
            <a href="/#live-detector" class="nav-cta">Detect Now</a>
          </nav>
          <button class="header-menu-btn" id="menu-toggle" aria-label="Toggle menu" aria-expanded="false" aria-controls="mobile-nav">
            <span class="menu-bar bar-1"></span>
            <span class="menu-bar bar-2"></span>
            <span class="menu-bar bar-3"></span>
          </button>
        </div>
      </header>
      <nav class="mobile-nav" id="mobile-nav" role="navigation" aria-label="Mobile navigation" aria-hidden="true">
        ${mobileItems}
        <a href="/#live-detector" class="mobile-nav-link" style="color: var(--accent); font-weight:700;">→ Detect Now</a>
      </nav>
    `;

    initHeaderBehaviour();
  }

  function initHeaderBehaviour() {
    const header     = document.getElementById('site-header');
    const menuToggle = document.getElementById('menu-toggle');
    const mobileNav  = document.getElementById('mobile-nav');
    const bars       = document.querySelectorAll('.menu-bar');

    // Scroll state
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });

    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen.toString());
      mobileNav.setAttribute('aria-hidden', (!isOpen).toString());

      // Animate bars
      if (isOpen) {
        bars[0].style.transform = 'translateY(7px) rotate(45deg)';
        bars[1].style.opacity   = '0';
        bars[2].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        bars[0].style.transform = '';
        bars[1].style.opacity   = '';
        bars[2].style.transform = '';
      }
    });

    // Close mobile nav on link click
    mobileNav.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
        bars[0].style.transform = '';
        bars[1].style.opacity   = '';
        bars[2].style.transform = '';
      });
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks  = document.querySelectorAll('.nav-link');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.toggle(
              'active',
              link.getAttribute('href') === '#' + entry.target.id
            );
          });
        }
      });
    }, { threshold: 0.35 });

    sections.forEach(sec => observer.observe(sec));
  }

  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildHeader);
  } else {
    buildHeader();
  }
})();
