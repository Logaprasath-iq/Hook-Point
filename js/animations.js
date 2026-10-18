/**
 * HOOKPOINT — Cinematic Scroll Reveal & Animation Engine
 * Staggers cards, wordings, headings, and images smoothly on scroll using IntersectionObserver.
 */

(function () {
  'use strict';

  // Responsive column count calculator
  function getGridColumnCount() {
    const w = window.innerWidth;
    if (w >= 1024) return 4;
    if (w >= 768) return 3;
    if (w >= 640) return 2;
    return 1;
  }

  // Primary animation observer
  let revealObserver = null;

  function initObserver() {
    if (!('IntersectionObserver' in window)) {
      // Fallback: make everything visible immediately
      document.querySelectorAll('.reveal-card, .reveal-heading, .reveal-text, .reveal-image').forEach(el => {
        el.classList.add('is-visible');
      });
      return;
    }

    if (revealObserver) {
      revealObserver.disconnect();
    }

    revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;

          // Stagger calculation for cards inside grids
          if (el.classList.contains('reveal-card')) {
            const parent = el.parentElement;
            if (parent) {
              const siblings = Array.from(parent.querySelectorAll('.reveal-card'));
              const idx = siblings.indexOf(el);
              const cols = getGridColumnCount();
              const colIndex = idx >= 0 ? idx % cols : 0;
              el.style.setProperty('--reveal-delay', `${colIndex * 120}ms`);
            }
          }

          // Stagger calculation for headings/wordings in groups
          if (el.classList.contains('reveal-heading') || el.classList.contains('reveal-text')) {
            const group = el.closest('.reveal-group');
            if (group) {
              const textSiblings = Array.from(group.querySelectorAll('.reveal-heading, .reveal-text'));
              const tIdx = textSiblings.indexOf(el);
              if (tIdx > 0) {
                el.style.setProperty('--reveal-delay', `${tIdx * 100}ms`);
              }
            }
          }

          el.classList.add('is-visible');
          obs.unobserve(el);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.08
    });

    // Observe cards, headings, texts, images
    const targets = document.querySelectorAll(
      '.reveal-card:not(.is-visible), .reveal-heading:not(.is-visible), .reveal-text:not(.is-visible), .reveal-image:not(.is-visible)'
    );

    targets.forEach(t => revealObserver.observe(t));
  }

  // Public API to refresh observers after dynamic render (products, blog, cart, etc.)
  window.refreshScrollAnimations = function () {
    if (revealObserver) {
      const newTargets = document.querySelectorAll(
        '.reveal-card:not(.is-visible), .reveal-heading:not(.is-visible), .reveal-text:not(.is-visible), .reveal-image:not(.is-visible)'
      );
      newTargets.forEach(t => revealObserver.observe(t));
    } else {
      initObserver();
    }
  };

  // Backwards compatibility helper
  window.initCardScrollReveal = window.refreshScrollAnimations;

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initObserver);
  } else {
    initObserver();
  }

  // Recalculate delays smoothly on resize
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      window.refreshScrollAnimations();
    }, 150);
  }, { passive: true });

})();
