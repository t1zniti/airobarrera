/* ═══════════════════════════════════════════════════════
   WINDSCREEN — Interaction Layer
   script.js
   ═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── DOM References ─── */
  const header     = document.getElementById('siteHeader');
  const hamburger  = document.getElementById('hamburger');
  const mainNav    = document.getElementById('mainNav');
  const heroBg     = document.querySelector('.hero-bg');
  const navLinks   = document.querySelectorAll('.nav-link');

  /* ─── Mobile nav overlay (injected once) ─── */
  const overlay = document.createElement('div');
  overlay.classList.add('nav-overlay');
  document.body.appendChild(overlay);


  /* ═══════════════════════════════════════════════════════
     1. STICKY HEADER — adds .scrolled class on scroll
     On inner pages (no hero), header stays in scrolled state.
  ═══════════════════════════════════════════════════════ */
  var isInnerPage = document.body.classList.contains('page-inner');

  function onScroll() {
    if (isInnerPage) return; // always scrolled on inner pages
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // initialise on load


  /* ═══════════════════════════════════════════════════════
     2. MOBILE MENU TOGGLE
  ═══════════════════════════════════════════════════════ */
  function closeMenu() {
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    mainNav.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function openMenu() {
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    mainNav.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  hamburger.addEventListener('click', function () {
    if (mainNav.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  overlay.addEventListener('click', closeMenu);

  /* Close menu when a nav link is tapped */
  navLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  /* Close on Escape key */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mainNav.classList.contains('open')) {
      closeMenu();
    }
  });


  /* ═══════════════════════════════════════════════════════
     3. SCROLL REVEAL — Intersection Observer
  ═══════════════════════════════════════════════════════ */
  var revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // animate once
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    /* Fallback: show everything if IO not supported */
    revealElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }


  /* ═══════════════════════════════════════════════════════
     4. HERO BACKGROUND — Ken Burns entrance
  ═══════════════════════════════════════════════════════ */
  if (heroBg) {
    window.addEventListener('load', function () {
      heroBg.classList.add('loaded');
    });
  }


  /* ═══════════════════════════════════════════════════════
     5. ACTIVE NAV LINK — highlight based on scroll position
  ═══════════════════════════════════════════════════════ */
  var sections = document.querySelectorAll('section[id]');

  function updateActiveLink() {
    var scrollY = window.scrollY + 100;

    sections.forEach(function (section) {
      var top    = section.offsetTop;
      var height = section.offsetHeight;
      var id     = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });

})();
