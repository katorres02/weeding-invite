(function () {
  'use strict';

  function skipEnvelope() {
    const screen = document.getElementById('envelope-screen');
    const invitation = document.getElementById('invitation');
    screen.classList.add('hidden');
    screen.setAttribute('aria-hidden', 'true');
    invitation.style.opacity = '1';
    invitation.style.pointerEvents = 'auto';
    invitation.removeAttribute('aria-hidden');
    document.querySelectorAll('.hero-animate').forEach(function (el) {
      el.style.animationPlayState = 'running';
    });
    if (typeof AOS !== 'undefined') AOS.refresh();
  }

  function initEnvelope() {
    // Skip animation for users who prefer reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      skipEnvelope();
      return;
    }

    const seal = document.getElementById('wax-seal');
    const flap = document.getElementById('envelope-flap');
    const letterCard = document.getElementById('letter-card');
    const screen = document.getElementById('envelope-screen');
    const hint = document.getElementById('seal-hint');

    // Fix SVG transform origin before animation starts.
    // svgOrigin uses SVG coordinate space — "200 0" is the top-center of the flap
    // in the 400x280 viewBox.
    gsap.set(flap, { svgOrigin: '200 0' });

    function openEnvelope() {
      seal.classList.add('clicked');

      const tl = gsap.timeline({
        onComplete: function () {
          screen.classList.add('hidden');
          screen.setAttribute('aria-hidden', 'true');

          const invitation = document.getElementById('invitation');
          invitation.style.opacity = '1';
          invitation.style.pointerEvents = 'auto';
          invitation.removeAttribute('aria-hidden');

          document.querySelectorAll('.hero-animate').forEach(function (el) {
            el.style.animationPlayState = 'running';
          });

          if (typeof AOS !== 'undefined') AOS.refresh();
        }
      });

      // Fade out hint text immediately
      tl.to(hint, { opacity: 0, duration: 0.3, ease: 'power1.in' }, 0);

      // Scale and fade the wax seal out
      tl.to(seal, {
        scale: 0,
        opacity: 0,
        duration: 0.45,
        ease: 'power2.in',
        transformOrigin: 'center'
      }, 0);

      // Rotate the flap open (rotateX negative = opens toward viewer)
      tl.to(flap, {
        rotateX: -175,
        duration: 0.8,
        ease: 'power2.inOut'
      }, 0.2);

      // Letter card rises from the envelope
      tl.fromTo(letterCard,
        { y: 40, opacity: 0 },
        { y: -55, opacity: 1, duration: 0.7, ease: 'power1.out' },
        0.65
      );

      // Fade out the entire envelope screen
      tl.to(screen, {
        opacity: 0,
        duration: 0.9,
        ease: 'power2.inOut'
      }, 1.1);
    }

    // Click on seal
    seal.addEventListener('click', openEnvelope);

    // Keyboard: Enter or Space on seal
    seal.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openEnvelope();
      }
    });
  }

  // Expose for main.js
  window.initEnvelope = initEnvelope;
})();
