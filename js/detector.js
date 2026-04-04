/* =============================================
   MY SCREEN SIZE — detector.js
   ============================================= */

(function () {
  'use strict';

  // ---- Utility ----
  const $ = id => document.getElementById(id);
  const fmt = (w, h) => `${w} × ${h}`;

  function detectDeviceType() {
    const ua  = navigator.userAgent;
    const w   = window.innerWidth;
    if (/Mobi|Android|iPhone|iPod/i.test(ua) || w < 768)   return '📱 Mobile';
    if (/iPad|Tablet/i.test(ua) || (w >= 768 && w < 1024)) return '📟 Tablet';
    if (w >= 1024 && w < 1440) return '💻 Laptop';
    return '🖥️ Desktop';
  }

  function getOrientation() {
    if (screen.orientation) {
      const type  = screen.orientation.type;
      const angle = screen.orientation.angle;
      const name  = type.includes('portrait') ? 'Portrait' : 'Landscape';
      return { name, angle };
    }
    const name = window.innerWidth < window.innerHeight ? 'Portrait' : 'Landscape';
    return { name, angle: 0 };
  }

  function estimateDPI() {
    const dpr = window.devicePixelRatio || 1;
    // Common base DPIs: 96 for desktop screens
    return Math.round(96 * dpr);
  }

  function updateAll() {
    const sw  = screen.width;
    const sh  = screen.height;
    const vw  = window.innerWidth;
    const vh  = window.innerHeight;
    const dpr = (window.devicePixelRatio || 1).toFixed(2);
    const cd  = screen.colorDepth || screen.pixelDepth || 24;
    const aw  = screen.availWidth;
    const ah  = screen.availHeight;
    const ori = getOrientation();
    const dpi = estimateDPI();
    const tc  = navigator.maxTouchPoints || 0;
    const touchSupport = tc > 0 ? 'Supported' : 'None';

    // Hero stats
    const hRes  = $('hero-resolution');
    const hVP   = $('hero-viewport');
    const hDev  = $('hero-device');
    const hDPR  = $('hero-dpr');

    if (hRes)  animateValue(hRes,  fmt(sw, sh));
    if (hVP)   animateValue(hVP,   fmt(vw, vh));
    if (hDev)  animateValue(hDev,  detectDeviceType().replace(/[^\w\s×]/gu, '').trim() || detectDeviceType());
    if (hDPR)  animateValue(hDPR,  dpr + 'x');

    // Detector cards
    setVal('det-resolution',      fmt(sw, sh));
    setVal('det-resolution-sub',  `Physical: ${sw * parseFloat(dpr)}×${sh * parseFloat(dpr)}px`);
    setVal('det-viewport',        fmt(vw, vh));
    setVal('det-dpr',             dpr + 'x');
    setVal('det-colordepth',      cd + '-bit');
    setVal('det-orientation',     ori.name);
    setVal('det-orientation-angle', `Angle: ${ori.angle}°`);
    setVal('det-dpi',             dpi + ' DPI');
    setVal('det-touch',           touchSupport);
    setVal('det-touch-points',    `Touch points: ${tc}`);
    setVal('det-avail',           fmt(aw, ah));

    // Copy bar summary
    const summary = $('copy-summary-text');
    if (summary) {
      summary.textContent = `Resolution: ${sw}×${sh} | Viewport: ${vw}×${vh} | DPR: ${dpr}x | DPI: ${dpi} | ${detectDeviceType()} | ${ori.name}`;
    }
  }

  function setVal(id, val) {
    const el = $(id);
    if (el && el.textContent !== val) {
      el.textContent = val;
    }
  }

  function animateValue(el, newVal) {
    if (!el) return;
    if (el.textContent === newVal) return;
    el.style.opacity   = '0';
    el.style.transform = 'translateY(-6px)';
    setTimeout(() => {
      el.textContent     = newVal;
      el.style.opacity   = '';
      el.style.transform = '';
      el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    }, 150);
  }

  // ---- Copy button ----
  function initCopyButton() {
    const btn = $('copy-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const summary = $('copy-summary-text');
      const text = summary ? summary.textContent : 'No data';
      navigator.clipboard.writeText(text).then(() => {
        btn.classList.add('copied');
        btn.innerHTML = `
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <path d="M3 7.5l3 3 6-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Copied!`;
        showToast('Screen data copied to clipboard ✓');
        setTimeout(() => {
          btn.classList.remove('copied');
          btn.innerHTML = `
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <rect x="4" y="4" width="8" height="8" rx="1" stroke="currentColor" stroke-width="1.2"/>
              <path d="M3 10V3h7" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
            </svg>
            Copy Data`;
        }, 2500);
      }).catch(() => {
        // Fallback
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity  = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showToast('Copied!');
      });
    });
  }

  // ---- Toast ----
  function showToast(message) {
    let toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<span class="toast-icon">✓</span> ${message}`;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('show'), 2800);
  }

  // ---- Init ----
  function init() {
    updateAll();
    initCopyButton();

    // Live resize listener
    window.addEventListener('resize', updateAll, { passive: true });

    // Orientation change
    window.addEventListener('orientationchange', () => {
      setTimeout(updateAll, 150);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Export for use in other modules
  window.MSS = window.MSS || {};
  window.MSS.detectDeviceType = detectDeviceType;
  window.MSS.showToast        = showToast;
})();
