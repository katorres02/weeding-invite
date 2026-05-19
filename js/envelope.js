(function () {
  'use strict';

  function revealInvitation() {
    const screen     = document.getElementById('envelope-screen');
    const invitation = document.getElementById('invitation');
    screen.classList.add('hidden');
    screen.setAttribute('aria-hidden', 'true');
    invitation.style.opacity      = '1';
    invitation.style.pointerEvents = 'auto';
    invitation.removeAttribute('aria-hidden');
    document.querySelectorAll('.hero-animate').forEach(function (el) {
      el.style.animationPlayState = 'running';
    });
    if (typeof AOS !== 'undefined') AOS.refresh();
  }

  function initEnvelope() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      revealInvitation();
      return;
    }

    var sealImg    = document.getElementById('wax-seal-img');
    var bodyImg    = document.getElementById('envelope-body-img');
    var openImg    = document.getElementById('envelope-open-img');
    var letterCard = document.getElementById('letter-card');
    var screen     = document.getElementById('envelope-screen');
    var hint       = document.getElementById('seal-hint');

    function openEnvelope() {
      sealImg.classList.add('clicked');

      var tl = gsap.timeline({ onComplete: revealInvitation });

      // Hint fades immediately
      tl.to(hint, { opacity: 0, duration: 0.3, ease: 'power1.in' }, 0);

      // Seal shrinks and disappears
      tl.to(sealImg, {
        opacity: 0,
        scale: 0.4,
        duration: 0.45,
        ease: 'power2.in',
        transformOrigin: '50% 50%'
      }, 0);

      // Crossfade: closed envelope fades out, open envelope fades in
      tl.to(bodyImg, { opacity: 0, duration: 0.65, ease: 'power2.inOut' }, 0.3);
      tl.to(openImg, { opacity: 1, duration: 0.65, ease: 'power2.inOut' }, 0.45);

      // Letter card rises from the center
      tl.fromTo(letterCard,
        { opacity: 0, y: 30 },
        { opacity: 1, y: -30, duration: 0.7, ease: 'power1.out' },
        0.8
      );

      // Whole screen fades out → invitation revealed
      tl.to(screen, { opacity: 0, duration: 0.9, ease: 'power2.inOut' }, 1.6);
    }

    sealImg.addEventListener('click', openEnvelope);
    sealImg.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openEnvelope();
      }
    });
  }

  window.initEnvelope = initEnvelope;
})();
