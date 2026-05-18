(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    // ── i18n (must run first — sets all text content) ────────
    if (typeof window.initI18n === 'function') {
      window.initI18n();
    }

    // ── AOS (scroll animations) ──────────────────────────────
    AOS.init({
      duration: 900,
      once: true,
      offset: 80,
      easing: 'ease-out-cubic'
    });

    // ── Envelope ────────────────────────────────────────────
    if (typeof window.initEnvelope === 'function') {
      window.initEnvelope();
    }

    // ── Gallery lightbox ────────────────────────────────────
    initLightbox();

    // ── Smooth scroll for internal links ────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  });

  // ── LIGHTBOX ──────────────────────────────────────────────
  function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lbImg    = document.getElementById('lb-img');
    const lbClose  = document.getElementById('lb-close');
    const lbPrev   = document.getElementById('lb-prev');
    const lbNext   = document.getElementById('lb-next');
    const figures  = Array.from(document.querySelectorAll('.gallery-grid figure'));

    if (!lightbox || figures.length === 0) return;

    let currentIndex = 0;
    let lastFocused = null;

    function getImages() {
      return figures.map(function (fig) {
        return {
          src: fig.dataset.full || fig.querySelector('img').src,
          alt: fig.querySelector('img').alt
        };
      });
    }

    function open(index) {
      const images = getImages();
      currentIndex = (index + images.length) % images.length;
      lbImg.src = images[currentIndex].src;
      lbImg.alt = images[currentIndex].alt;
      lightbox.removeAttribute('hidden');
      document.body.setAttribute('aria-hidden', 'true');
      lastFocused = document.activeElement;
      lbClose.focus();
      document.addEventListener('keydown', handleLightboxKey);
    }

    function close() {
      lightbox.setAttribute('hidden', '');
      document.body.removeAttribute('aria-hidden');
      document.removeEventListener('keydown', handleLightboxKey);
      if (lastFocused) lastFocused.focus();
    }

    function navigate(dir) {
      const images = getImages();
      currentIndex = (currentIndex + dir + images.length) % images.length;
      lbImg.src = images[currentIndex].src;
      lbImg.alt = images[currentIndex].alt;
    }

    function handleLightboxKey(e) {
      if (e.key === 'Escape')      { close(); return; }
      if (e.key === 'ArrowLeft')   { navigate(-1); return; }
      if (e.key === 'ArrowRight')  { navigate(1); return; }

      // Trap focus inside lightbox
      const focusable = lightbox.querySelectorAll('button, [tabindex]:not([tabindex="-1"])');
      const first = focusable[0];
      const last  = focusable[focusable.length - 1];
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    // Open on figure click/keydown
    figures.forEach(function (fig, i) {
      fig.addEventListener('click', function () { open(i); });
      fig.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); }
      });
    });

    // Close on backdrop click (outside image)
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) close();
    });

    lbClose.addEventListener('click', close);
    lbPrev.addEventListener('click', function () { navigate(-1); });
    lbNext.addEventListener('click', function () { navigate(1); });
  }

})();
