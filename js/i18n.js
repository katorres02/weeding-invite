(function () {
  'use strict';

  var TRANSLATIONS = {
    es: {
      'seal.hint':              'Toca el sello para abrir',
      'letter.text':            'Tenemos el honor de invitarte',
      'hero.pre':               'Nos casamos',
      'countdown.title':        'Faltan',
      'countdown.days':         'Días',
      'countdown.hours':        'Horas',
      'countdown.minutes':      'Minutos',
      'countdown.seconds':      'Segundos',
      'countdown.today':        '¡Hoy es el gran día!',
      'story.title':            'Nuestra Historia',
      'story.text':             'STORY_TEXT',
      'details.title':          'El Gran Día',
      'details.date.title':     'Fecha y Hora',
      'details.venue.title':    'Lugar',
      'details.map.link':       'Ver en mapa ↓',
      'gallery.title':          'Nosotros',
      'wedding.date':           'Sábado, 18 de Julio de 2026',
      'dresscode.title':        'Código de Vestimenta',
      'dresscode.label':        'DRESS_CODE_LABEL',
      'dresscode.desc':         'Queremos que llegues como te sientas más cómodo/a — eso es lo que más nos importa. Si tienes algo en los tonos de la paleta, sería precioso verlos en nuestra celebración, pero no es obligatorio en lo absoluto. Si no los tienes, sin problema: ven con lo que tengas y con lo que te haga sentir bien.',
      'dresscode.note':         'Por favor evita el blanco y el beige — reservados para los novios.',
      'registry.title':         'Mesa de Regalos',
      'registry.text':          'Tu presencia es nuestro mejor regalo. Si deseas obsequiarnos algo, hemos preparado una mesa de regalos para facilitar tu elección.',
      'registry.btn':           'Ver Mesa de Regalos',
      'rsvp.title':             'Confirma tu Asistencia',
      'rsvp.deadline':          'RSVP_DEADLINE',
      'rsvp.text':              'Nos encantaría contar con tu presencia en este día tan especial. Por favor confirma tu asistencia a través del siguiente formulario.',
      'rsvp.btn':               'Confirmar Asistencia',
      'lang.btn.aria':          'Switch to English',
      'aria.envelope':          'Abrir invitación',
      'aria.seal':              'Toca para abrir la invitación',
      'aria.countdown':         'Tiempo restante para la boda',
      'aria.gallery.section':   'Galería de fotos',
      'aria.lightbox':          'Foto ampliada',
      'aria.lb.close':          'Cerrar galería',
      'aria.lb.prev':           'Foto anterior',
      'aria.lb.next':           'Foto siguiente',
      'aria.dresscode.palette': 'Paleta de colores sugerida para invitados',
      'aria.registry.btn':      'Ver mesa de regalos (abre en nueva pestaña)',
      'aria.rsvp.btn':          'Abrir formulario de confirmación de asistencia (abre en nueva pestaña)',
    },
    en: {
      'seal.hint':              'Click the seal to open',
      'letter.text':            'We have the honor of inviting you',
      'hero.pre':               'We\'re getting married',
      'countdown.title':        'Counting Down',
      'countdown.days':         'Days',
      'countdown.hours':        'Hours',
      'countdown.minutes':      'Minutes',
      'countdown.seconds':      'Seconds',
      'countdown.today':        'Today is the big day!',
      'story.title':            'Our Story',
      'story.text':             'STORY_TEXT_EN',
      'details.title':          'The Big Day',
      'details.date.title':     'Date & Time',
      'details.venue.title':    'Venue',
      'details.map.link':       'View on map ↓',
      'gallery.title':          'Us',
      'wedding.date':           'Saturday, July 18, 2026',
      'dresscode.title':        'Dress Code',
      'dresscode.label':        'DRESS_CODE_LABEL',
      'dresscode.desc':         'We want you to come as you feel most comfortable — that\'s what matters most to us. If you happen to have something in the shades below, it would be lovely to see them at our celebration, but it\'s absolutely not required. If you don\'t, no worries at all: wear whatever you have and whatever makes you feel good.',
      'dresscode.note':         'Please avoid white and beige — reserved for the couple.',
      'registry.title':         'Gift Registry',
      'registry.text':          'Your presence is our greatest gift. If you\'d like to give us something, we\'ve set up a gift registry to make it easy.',
      'registry.btn':           'View Gift Registry',
      'rsvp.title':             'RSVP',
      'rsvp.deadline':          'RSVP_DEADLINE_EN',
      'rsvp.text':              'We would love to celebrate this special day with you. Please confirm your attendance through the form below.',
      'rsvp.btn':               'Confirm Attendance',
      'lang.btn.aria':          'Cambiar a Español',
      'aria.envelope':          'Open invitation',
      'aria.seal':              'Click to open the invitation',
      'aria.countdown':         'Time remaining until the wedding',
      'aria.gallery.section':   'Photo gallery',
      'aria.lightbox':          'Enlarged photo',
      'aria.lb.close':          'Close gallery',
      'aria.lb.prev':           'Previous photo',
      'aria.lb.next':           'Next photo',
      'aria.dresscode.palette': 'Suggested color palette for guests',
      'aria.registry.btn':      'View gift registry (opens in new tab)',
      'aria.rsvp.btn':          'Open RSVP form (opens in new tab)',
    }
  };

  var currentLang = localStorage.getItem('wedding-lang') || 'es';

  function t(key) {
    var lang = TRANSLATIONS[currentLang];
    return (lang && lang[key]) || TRANSLATIONS.es[key] || key;
  }

  function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.textContent = t(el.dataset.i18n);
    });

    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      el.setAttribute('aria-label', t(el.dataset.i18nAria));
    });

    document.documentElement.lang = currentLang;

    var btn = document.getElementById('lang-toggle');
    if (btn) {
      btn.textContent = currentLang === 'es' ? 'EN' : 'ES';
      btn.setAttribute('aria-label', t('lang.btn.aria'));
    }
  }

  function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('wedding-lang', lang);
    applyTranslations();
  }

  function initI18n() {
    applyTranslations();
    var btn = document.getElementById('lang-toggle');
    if (btn) {
      btn.addEventListener('click', function () {
        setLanguage(currentLang === 'es' ? 'en' : 'es');
      });
    }
  }

  window.initI18n     = initI18n;
  window.getTranslation = t;
})();
