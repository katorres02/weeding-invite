(function () {
  'use strict';

  // Update this to the wedding date/time in ISO 8601 format
  const WEDDING_DATE = new Date('2026-07-18T17:00:00-04:00');

  const els = {
    days:    document.getElementById('cd-days'),
    hours:   document.getElementById('cd-hours'),
    minutes: document.getElementById('cd-minutes'),
    seconds: document.getElementById('cd-seconds'),
  };

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function updateUnit(el, newValue) {
    const padded = pad(newValue);
    if (el.textContent === padded) return;
    el.textContent = padded;
    el.classList.remove('cd-flip');
    // Force reflow so the class removal registers before re-adding
    void el.offsetWidth;
    el.classList.add('cd-flip');
    setTimeout(() => el.classList.remove('cd-flip'), 350);
  }

  function tick() {
    const delta = WEDDING_DATE - Date.now();

    if (delta <= 0) {
      const section = document.getElementById('countdown-section');
      if (section) {
        section.querySelector('.section-inner').innerHTML =
          '<h2 style="color: var(--color-gold)">¡Hoy es el gran día!</h2>';
      }
      clearInterval(timer);
      return;
    }

    updateUnit(els.days,    Math.floor(delta / 86400000));
    updateUnit(els.hours,   Math.floor((delta % 86400000) / 3600000));
    updateUnit(els.minutes, Math.floor((delta % 3600000) / 60000));
    updateUnit(els.seconds, Math.floor((delta % 60000) / 1000));
  }

  tick();
  const timer = setInterval(tick, 1000);
})();
