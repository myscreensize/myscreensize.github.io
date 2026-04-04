/* =============================================
   MY SCREEN SIZE — breakpoints.js
   ============================================= */

(function () {
  'use strict';

  const BREAKPOINTS = [
    { name: 'xs',  label: 'Extra Small',  min: 0,    max: 575,  cls: 'col-*',     use: 'Phones (portrait)',     fw: 'xs',  tw: 'default',  color: '#ff6b9d' },
    { name: 'sm',  label: 'Small',        min: 576,  max: 767,  cls: 'col-sm-*',  use: 'Phones (landscape)',    fw: 'sm',  tw: 'sm:',      color: '#ffa94d' },
    { name: 'md',  label: 'Medium',       min: 768,  max: 991,  cls: 'col-md-*',  use: 'Tablets',               fw: 'md',  tw: 'md:',      color: '#ffd43b' },
    { name: 'lg',  label: 'Large',        min: 992,  max: 1199, cls: 'col-lg-*',  use: 'Laptops / desktops',    fw: 'lg',  tw: 'lg:',      color: '#69db7c' },
    { name: 'xl',  label: 'Extra Large',  min: 1200, max: 1399, cls: 'col-xl-*',  use: 'Large desktops',        fw: 'xl',  tw: 'xl:',      color: '#4dabf7' },
    { name: 'xxl', label: '2X Large',     min: 1400, max: Infinity, cls: 'col-xxl-*', use: '4K / Ultra-wide',   fw: 'xxl', tw: '2xl:',     color: '#da77f2' },
  ];

  const MAX_WIDTH = 1600; // visual scale ceiling

  function getActive(vw) {
    return BREAKPOINTS.filter(bp => vw >= bp.min && vw <= bp.max);
  }

  function getAll(vw) {
    return BREAKPOINTS.map(bp => ({ ...bp, active: vw >= bp.min }));
  }

  function renderRuler(vw) {
    const fill = document.getElementById('bp-fill');
    if (!fill) return;
    const pct = Math.min((vw / MAX_WIDTH) * 100, 100);
    fill.style.width = pct + '%';
  }

  function renderLabels() {
    const wrap = document.getElementById('bp-labels');
    if (!wrap) return;
    wrap.innerHTML = BREAKPOINTS.map((bp, i) => {
      const pct = i === BREAKPOINTS.length - 1 ? 100 : (bp.min / MAX_WIDTH) * 100;
      return `<span style="position:absolute;left:${pct}%;">${bp.min ? bp.min + 'px' : '0'}</span>`;
    }).join('');
    wrap.style.position = 'relative';
  }

  function renderCards(vw) {
    const wrap = document.getElementById('bp-cards');
    if (!wrap) return;
    wrap.innerHTML = BREAKPOINTS.map(bp => {
      const isActive = vw >= bp.min && (bp.max === Infinity || vw <= bp.max);
      return `
        <div class="bp-card ${isActive ? 'active' : ''}" role="status" aria-label="${bp.label} breakpoint ${isActive ? 'active' : 'inactive'}">
          <span class="bp-dot" style="${isActive ? `background:${bp.color};box-shadow:0 0 6px ${bp.color};` : ''}"></span>
          <span>${bp.name.toUpperCase()}</span>
          ${isActive ? '<span style="font-size:0.65rem;opacity:0.7;">✓ Active</span>' : ''}
        </div>`;
    }).join('');
  }

  function renderTable(vw) {
    const tbody = document.getElementById('breakpoint-tbody');
    if (!tbody) return;
    tbody.innerHTML = BREAKPOINTS.map(bp => {
      const isMatch = vw >= bp.min && (bp.max === Infinity || vw <= bp.max);
      const rangeStr = bp.max === Infinity ? `≥ ${bp.min}px` : `${bp.min}px – ${bp.max}px`;
      return `
        <tr>
          <td style="font-family:var(--font-mono);color:${bp.color};">${bp.name}</td>
          <td>${bp.label}</td>
          <td><code style="font-family:var(--font-mono);font-size:0.75rem;background:var(--surface-2);padding:2px 7px;border-radius:4px;">${bp.cls}</code></td>
          <td style="color:var(--text-3);">${bp.use}</td>
          <td>
            <span class="bp-badge ${isMatch ? 'match' : ''}">
              ${isMatch ? '✓ Match' : '— No'}
            </span>
          </td>
        </tr>`;
    }).join('');
  }

  function update() {
    const vw = window.innerWidth;
    renderRuler(vw);
    renderCards(vw);
    renderTable(vw);
  }

  function init() {
    renderLabels();
    update();
    window.addEventListener('resize', update, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
