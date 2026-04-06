/* =============================================
   MY SCREEN SIZE — footer.js (component)
   ============================================= */

(function () {
  'use strict';

  const FOOTER_LINKS = {
    tool: [
      { label: 'Screen Detector',   href: '/#live-detector' },
      { label: 'Device Info',       href: '/#device-info' },
      { label: 'Breakpoints',       href: '/#breakpoints' },
      { label: 'Size Comparison',   href: '/#comparison' },
    ],
    learn: [
      { label: 'How It Works',      href: '/#how-it-works' },
      { label: 'Features',          href: '/#features' },
      { label: 'FAQ',               href: '/#faq' },
    ],
    pages: [
      { label: 'About', href: 'about' },
      { label: 'Contact',  href: 'contact' },
      { label: 'Privacy',   href: 'privacy' },
      { label: 'Terms',   href: 'terms' }, 
    ],
  };

  function buildFooter() {
    const root = document.getElementById('footer-root');
    if (!root) return;

    const year = new Date().getFullYear();

    const makeLinks = (arr) =>
      arr.map(l => {
        const ext = l.external ? ' target="_blank" rel="noopener noreferrer"' : '';
        return `<a class="footer-link" href="${l.href}"${ext}>${l.label}</a>`;
      }).join('');

    root.innerHTML = `
      <footer id="site-footer" role="contentinfo">
        <div class="footer-inner">
          <div class="footer-top">
            <div class="footer-brand">
              <div class="header-logo" style="margin-bottom:14px;">
                <div class="logo-icon" aria-hidden="true">⊡</div>
                <span>My Screen Size</span>
              </div>
              <p class="footer-tagline">
                The most precise free tool to detect screen resolution, viewport size, pixel density, and complete device information — right in your browser.
              </p>
            </div>

            <div class="footer-col">
              <h4>Tool</h4>
              <div class="footer-links">${makeLinks(FOOTER_LINKS.tool)}</div>
            </div>

            <div class="footer-col">
              <h4>Learn</h4>
              <div class="footer-links">${makeLinks(FOOTER_LINKS.learn)}</div>
            </div>

            <div class="footer-col">
              <h4>Resources</h4>
              <div class="footer-links">${makeLinks(FOOTER_LINKS.resources)}</div>
            </div>
          </div>

          <div class="footer-bottom">
            <p class="footer-copy">
              &copy; ${year} <a href="/" style="color:var(--text-2);">myscreensize.github.io</a> — All rights reserved.
            </p>
            <p class="footer-privacy">
              No data collected
              <span>·</span>
              100% client-side
              <span>·</span>
              Zero tracking
            </p>
          </div>
        </div>
      </footer>
    `;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildFooter);
  } else {
    buildFooter();
  }
})();
