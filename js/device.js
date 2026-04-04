/* =============================================
   MY SCREEN SIZE — device.js
   ============================================= */

(function () {
  'use strict';

  const $ = id => document.getElementById(id);
  const set = (id, val) => { const el = $(id); if (el) el.textContent = val; };
  const badge = (val, yes = 'Yes', no = 'No') =>
    val ? `<span class="badge-yes">${yes}</span>` : `<span class="badge-no">${no}</span>`;

  function parseUserAgent() {
    const ua = navigator.userAgent;
    let browser = 'Unknown', version = '—', engine = '—';

    if (/Edg\//.test(ua)) {
      browser = 'Microsoft Edge';
      version = ua.match(/Edg\/([\d.]+)/)?.[1] || '—';
      engine  = 'Blink';
    } else if (/OPR\/|Opera/.test(ua)) {
      browser = 'Opera';
      version = ua.match(/OPR\/([\d.]+)/)?.[1] || '—';
      engine  = 'Blink';
    } else if (/Firefox\//.test(ua)) {
      browser = 'Firefox';
      version = ua.match(/Firefox\/([\d.]+)/)?.[1] || '—';
      engine  = 'Gecko';
    } else if (/Chrome\//.test(ua) && !/Chromium/.test(ua)) {
      browser = 'Google Chrome';
      version = ua.match(/Chrome\/([\d.]+)/)?.[1] || '—';
      engine  = 'Blink';
    } else if (/Safari\//.test(ua) && !/Chrome\//.test(ua)) {
      browser = 'Safari';
      version = ua.match(/Version\/([\d.]+)/)?.[1] || '—';
      engine  = 'WebKit';
    } else if (/Chromium\//.test(ua)) {
      browser = 'Chromium';
      version = ua.match(/Chromium\/([\d.]+)/)?.[1] || '—';
      engine  = 'Blink';
    }
    return { browser, version, engine };
  }

  function getPlatform() {
    const ua = navigator.userAgent;
    if (/Windows NT 10/.test(ua)) return 'Windows 10/11';
    if (/Windows NT 6\.3/.test(ua)) return 'Windows 8.1';
    if (/Windows NT 6\.1/.test(ua)) return 'Windows 7';
    if (/Windows/.test(ua)) return 'Windows';
    if (/Mac OS X/.test(ua)) {
      const ver = ua.match(/Mac OS X ([\d_]+)/)?.[1]?.replace(/_/g, '.') || '';
      return `macOS ${ver}`;
    }
    if (/iPhone|iPad|iPod/.test(ua)) {
      const ver = ua.match(/OS ([\d_]+)/)?.[1]?.replace(/_/g, '.') || '';
      return `iOS ${ver}`;
    }
    if (/Android/.test(ua)) {
      const ver = ua.match(/Android ([\d.]+)/)?.[1] || '';
      return `Android ${ver}`;
    }
    if (/Linux/.test(ua)) return 'Linux';
    if (/CrOS/.test(ua)) return 'ChromeOS';
    return navigator.platform || 'Unknown';
  }

  function getGPU() {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) return 'WebGL not available';
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      if (ext) {
        const renderer = gl.getParameter(ext.UNMASKED_RENDERER_WEBGL);
        // Truncate long GPU strings
        return renderer.length > 38 ? renderer.substring(0, 36) + '…' : renderer;
      }
      return 'Info not exposed';
    } catch (e) {
      return 'Unavailable';
    }
  }

  function getColorScheme() {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches)  return 'Dark';
    if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'Light';
    return 'No preference';
  }

  function populateHardware() {
    set('hw-platform', getPlatform());
    set('hw-cores',    navigator.hardwareConcurrency ? navigator.hardwareConcurrency + ' logical cores' : 'Not reported');
    set('hw-memory',   navigator.deviceMemory        ? navigator.deviceMemory + ' GB (approx.)' : 'Not reported');
    set('hw-gpu',      getGPU());
    set('hw-touch',    navigator.maxTouchPoints ? navigator.maxTouchPoints + ' points' : '0 (no touch)');

    // Battery API
    if ('getBattery' in navigator) {
      navigator.getBattery().then(battery => {
        const pct = Math.round(battery.level * 100);
        const charging = battery.charging ? ' ⚡ Charging' : '';
        set('hw-battery', pct + '%' + charging);
      }).catch(() => set('hw-battery', 'Permission denied'));
    } else {
      set('hw-battery', 'API not available');
    }
  }

  function populateBrowser() {
    const { browser, version, engine } = parseUserAgent();
    set('br-name',     browser);
    set('br-version',  version);
    set('br-engine',   engine);
    set('br-language', navigator.language || navigator.userLanguage || '—');
    set('br-cookies',  navigator.cookieEnabled ? 'Enabled' : 'Disabled');
    set('br-dnt',      navigator.doNotTrack === '1' ? 'Enabled' : 'Disabled');
  }

  function populateNetwork() {
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (conn) {
      set('net-type',  conn.effectiveType ? conn.effectiveType.toUpperCase() : '—');
      set('net-speed', conn.downlink     ? conn.downlink + ' Mbps'           : '—');
      set('net-rtt',   conn.rtt          ? conn.rtt + ' ms'                  : '—');
    } else {
      set('net-type',  'Not available');
      set('net-speed', 'Not available');
      set('net-rtt',   'Not available');
    }

    set('sys-timezone',    Intl.DateTimeFormat().resolvedOptions().timeZone || '—');
    set('sys-colorscheme', getColorScheme());
    set('sys-motion',      window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'Reduced' : 'Normal');
  }

  function init() {
    populateHardware();
    populateBrowser();
    populateNetwork();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
