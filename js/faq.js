/* =============================================
   MY SCREEN SIZE — faq.js
   ============================================= */

(function () {
  'use strict';

  const FAQS = [
    {
      q: 'What is the difference between screen resolution and viewport size?',
      a: 'Screen resolution is the total number of physical pixels your display has (e.g., 1920×1080). Viewport size is the area of the browser window actually available for web content — it changes as you resize the browser, while your screen resolution stays fixed unless you change display settings.',
    },
    {
      q: 'What is Device Pixel Ratio (DPR)?',
      a: 'Device Pixel Ratio is the ratio between physical pixels and CSS (logical) pixels. A DPR of 2x means your screen uses 4 physical pixels to render each 1 CSS pixel — this is what "Retina" and "HiDPI" displays do. A 1920×1080 screen with 2x DPR has an effective CSS resolution of 960×540.',
    },
    {
      q: 'Why does my screen resolution look different from what my OS reports?',
      a: 'Operating systems apply display scaling (e.g., 150% or 200% scale on Windows HiDPI screens) which changes the effective pixel count the browser sees. This tool reports both the physical screen size and the CSS viewport size so you can see the exact difference.',
    },
    {
      q: 'How is DPI estimated?',
      a: 'We estimate DPI by multiplying the standard screen base DPI (96 DPI for most monitors) by the Device Pixel Ratio. For a true DPI reading, you would need to know the physical diagonal size of your screen in inches — which browsers do not expose for privacy reasons.',
    },
    {
      q: 'Does this tool send my screen data anywhere?',
      a: 'No. Everything runs entirely in your browser using native JavaScript APIs. Nothing is sent to any server, stored in a database, or tracked in any way. Your screen data never leaves your device.',
    },
    {
      q: 'Which CSS breakpoints are shown?',
      a: 'We show the standard Bootstrap 5 breakpoints (xs, sm, md, lg, xl, xxl) which align closely with Tailwind CSS and most modern frameworks. These are the most widely-used responsive design thresholds in the industry.',
    },
    {
      q: 'What is "Available Screen" vs. total resolution?',
      a: '"Available Screen" (screen.availWidth × screen.availHeight) is the total display area minus any OS UI elements like the Windows taskbar, macOS menu bar, or dock. This is the maximum space a maximized window can occupy.',
    },
    {
      q: 'Why does my mobile device report different numbers?',
      a: 'Mobile browsers often apply viewport meta tag scaling and have high DPR displays. The physical resolution on modern phones can be 3×–4× higher than the CSS viewport they report to browsers. This is intentional — websites are designed at the CSS pixel level, not the physical pixel level.',
    },
  ];

  function buildFAQ() {
    const list = document.getElementById('faq-list');
    if (!list) return;

    list.innerHTML = FAQS.map((faq, i) => `
      <div class="faq-item" id="faq-${i}">
        <button
          class="faq-question"
          aria-expanded="false"
          aria-controls="faq-answer-${i}"
          id="faq-btn-${i}"
        >
          <span>${faq.q}</span>
          <span class="faq-icon" aria-hidden="true">+</span>
        </button>
        <div
          class="faq-answer"
          id="faq-answer-${i}"
          role="region"
          aria-labelledby="faq-btn-${i}"
        >
          <div class="faq-answer-inner">${faq.a}</div>
        </div>
      </div>
    `).join('');

    // Attach toggle handlers
    list.querySelectorAll('.faq-question').forEach(btn => {
      btn.addEventListener('click', () => {
        const item     = btn.closest('.faq-item');
        const isOpen   = item.classList.contains('open');

        // Close all
        list.querySelectorAll('.faq-item').forEach(el => {
          el.classList.remove('open');
          el.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        });

        // Open clicked if it was closed
        if (!isOpen) {
          item.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });

    // Open first by default
    const first = list.querySelector('.faq-item');
    if (first) {
      first.classList.add('open');
      first.querySelector('.faq-question').setAttribute('aria-expanded', 'true');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildFAQ);
  } else {
    buildFAQ();
  }
})();
