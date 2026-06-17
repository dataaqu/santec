/**
 * სანტექ-1972 — main.js
 * Interactions: mobile menu, smooth-scroll, scroll-spy,
 * scroll-reveal, hero carousel, sticky-header-on-scroll.
 */

(function () {
  'use strict';

  /* ─────────────────────────────────────────
   * 1. Mobile menu toggle
   * ───────────────────────────────────────── */
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      // toggle('hidden') returns true when hidden is ADDED (menu closes)
      const nowHidden = mobileMenu.classList.toggle('hidden');
      menuBtn.setAttribute('aria-expanded', String(!nowHidden));
    });

    // Close mobile menu when any nav link inside it is clicked
    mobileMenu.querySelectorAll('[data-nav]').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ─────────────────────────────────────────
   * 2. Smooth-scroll for all [data-nav]
   * ───────────────────────────────────────── */
  document.querySelectorAll('[data-nav]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('data-nav');
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ─────────────────────────────────────────
   * 3. Scroll-spy — highlight header nav
   *    IntersectionObserver rootMargin keeps
   *    only the section crossing the viewport
   *    mid-band active at any one time.
   * ───────────────────────────────────────── */
  const SECTIONS = ['hero', 'about', 'services', 'contact'];

  // Only consider desktop nav links inside <header> for highlight
  const header = document.querySelector('header');
  const headerNavLinks = header
    ? header.querySelectorAll('[data-nav]')
    : [];

  function setActiveNav(activeId) {
    headerNavLinks.forEach((link) => {
      const id = link.getAttribute('data-nav');
      if (id === activeId) {
        link.classList.remove('text-ink-300');
        link.classList.add('text-brand-400');
      } else {
        link.classList.remove('text-brand-400');
        link.classList.add('text-ink-300');
      }
    });
  }

  const spyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveNav(entry.target.id);
        }
      });
    },
    { rootMargin: '-45% 0px -45% 0px' }
  );

  SECTIONS.forEach((id) => {
    const section = document.getElementById(id);
    if (section) {
      spyObserver.observe(section);
    }
  });

  /* ─────────────────────────────────────────
   * 4. Scroll-reveal
   *    Adds .is-visible when element enters
   *    viewport; unobserves after reveal.
   *    Staggered delay per position in list.
   * ───────────────────────────────────────── */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = (i % 6) * 60 + 'ms';
    revealObserver.observe(el);
  });

  /* ─────────────────────────────────────────
   * 5. Hero carousel
   *    next / prev / goto; opacity toggle;
   *    dot width/color; counter text;
   *    5 s auto-advance; pause on hover.
   *    Respects reduced-motion user preference.
   * ───────────────────────────────────────── */
  const carouselRoot = document.getElementById('hero-carousel');

  if (carouselRoot) {
    const slides = Array.from(carouselRoot.querySelectorAll('.slide'));
    const dots = Array.from(carouselRoot.querySelectorAll('[data-slide]'));
    const counter = document.getElementById('hero-counter');
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let currentIndex = 0;
    let autoTimer = null;

    function renderCarousel() {
      slides.forEach((slide, n) => {
        if (n === currentIndex) {
          slide.classList.add('opacity-100');
          slide.classList.remove('opacity-0');
        } else {
          slide.classList.remove('opacity-100');
          slide.classList.add('opacity-0');
        }
      });

      dots.forEach((dot, n) => {
        if (n === currentIndex) {
          dot.classList.add('w-7');
          dot.classList.add('bg-brand-500');
          dot.classList.remove('w-3');
          dot.classList.remove('bg-ink-700');
        } else {
          dot.classList.remove('w-7');
          dot.classList.remove('bg-brand-500');
          dot.classList.add('w-3');
          dot.classList.add('bg-ink-700');
        }
      });

      if (counter) {
        const total = slides.length;
        counter.innerHTML = '0' + (currentIndex + 1) + ' <span class="text-ink-600">/ 0' + total + '</span>';
      }
    }

    function goTo(n) {
      currentIndex = (n + slides.length) % slides.length;
      renderCarousel();
    }

    function startAuto() {
      if (reducedMotion) {
        return;
      }
      if (autoTimer !== null) { clearInterval(autoTimer); autoTimer = null; }
      autoTimer = setInterval(() => {
        goTo(currentIndex + 1);
      }, 5000);
    }

    function stopAuto() {
      if (autoTimer !== null) {
        clearInterval(autoTimer);
        autoTimer = null;
      }
    }

    // Arrow buttons
    const prevBtn = carouselRoot.querySelector('#hero-prev');
    const nextBtn = carouselRoot.querySelector('#hero-next');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => { stopAuto(); goTo(currentIndex - 1); startAuto(); });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => { stopAuto(); goTo(currentIndex + 1); startAuto(); });
    }

    // Dot buttons
    dots.forEach((dot, n) => {
      dot.addEventListener('click', () => { stopAuto(); goTo(n); startAuto(); });
    });

    // Pause on hover; resume on leave
    carouselRoot.addEventListener('mouseenter', stopAuto);
    carouselRoot.addEventListener('mouseleave', startAuto);

    // Init
    renderCarousel();
    startAuto();
  }

  /* ─────────────────────────────────────────
   * 6. Sticky header — stronger shadow
   *    when page is scrolled down past 8 px.
   * ───────────────────────────────────────── */
  if (header) {
    function updateHeaderShadow() {
      if (window.scrollY > 8) {
        header.classList.add('shadow-lg');
        header.classList.add('border-ink-700');
      } else {
        header.classList.remove('shadow-lg');
        header.classList.remove('border-ink-700');
      }
    }

    window.addEventListener('scroll', updateHeaderShadow, { passive: true });
    updateHeaderShadow();
  }
})();
