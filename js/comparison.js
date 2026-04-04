/* =============================================
   MY SCREEN SIZE — comparison.js
   ============================================= */

(function () {
  'use strict';

  const DEVICES = [
    { name: 'iPhone SE',    w: 375,  h: 667,  color: '#ff6b9d' },
    { name: 'iPhone 15',    w: 393,  h: 852,  color: '#ff9f43' },
    { name: 'iPhone 15 PM', w: 430,  h: 932,  color: '#ffd43b' },
    { name: 'iPad Mini',    w: 768,  h: 1024, color: '#69db7c' },
    { name: 'iPad Pro',     w: 1024, h: 1366, color: '#4dabf7' },
    { name: 'Laptop 13"',   w: 1280, h: 800,  color: '#74c0fc' },
    { name: 'Laptop 15"',   w: 1440, h: 900,  color: '#a9e34b' },
    { name: 'FHD 1080p',    w: 1920, h: 1080, color: '#da77f2' },
    { name: '4K UHD',       w: 3840, h: 2160, color: '#f783ac' },
  ];

  function render() {
    const canvas  = document.getElementById('comparison-canvas');
    const legend  = document.getElementById('comparison-legend');
    if (!canvas || !legend) return;

    const vw = window.screen.width;
    const vh = window.screen.height;

    // Include current screen
    const allDevices = [
      { name: 'Your Screen', w: vw, h: vh, color: 'var(--accent)', isCurrent: true },
      ...DEVICES,
    ];

    // Max width across all (for scaling)
    const maxW    = Math.max(...allDevices.map(d => d.w));
    const maxArea = Math.max(...allDevices.map(d => d.w * d.h));
    const canvasH = 320; // max bar height in px
    const barW    = 44;

    // Build bars — height proportional to area
    canvas.innerHTML = allDevices.map((device) => {
      const heightPct = (device.w * device.h) / maxArea;
      const barHeight = Math.max(Math.round(heightPct * canvasH), 18);
      const pxColor   = device.isCurrent ? 'linear-gradient(to top, var(--accent), var(--accent-2))' : device.color;
      const tooltipTxt = `${device.name}: ${device.w}×${device.h}`;

      return `
        <div class="comp-bar-wrap">
          <div class="tooltip">${tooltipTxt}</div>
          <div
            class="comp-bar ${device.isCurrent ? 'current' : ''} animated"
            style="height:${barHeight}px;width:${barW}px;background:${pxColor};"
            title="${tooltipTxt}"
            role="img"
            aria-label="${tooltipTxt}"
          ></div>
          <div class="comp-label">${device.name}<br/><span style="color:var(--accent-3)">${device.w}×${device.h}</span></div>
        </div>`;
    }).join('');

    // Legend
    const legendItems = allDevices.map(d => {
      const bg = d.isCurrent ? 'linear-gradient(135deg, var(--accent), var(--accent-2))' : d.color;
      return `
        <div class="legend-item">
          <div class="legend-dot" style="background:${d.isCurrent ? 'var(--accent)' : d.color};"></div>
          <div class="legend-info">
            <div class="legend-name">${d.name}${d.isCurrent ? ' <span style="color:var(--accent);font-size:0.65rem;">(you)</span>' : ''}</div>
            <div class="legend-res">${d.w} × ${d.h}</div>
          </div>
        </div>`;
    }).join('');

    legend.innerHTML = `
      <div class="legend-title">Devices</div>
      ${legendItems}`;
  }

  function init() {
    render();
    // Update if screen changes (rare, but possible)
    window.addEventListener('resize', render, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
