import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ============================================
// ХЕЛПЕР: базовая анимация появления
// ============================================
function revealOnScroll(elements, options = {}) {
  if (!elements || elements.length === 0) return;

  const {
    trigger = elements[0],
    y = 30,
    duration = 0.7,
    stagger = 0.1,
    delay = 0,
    start = 'top 80%',
    once = true,
    clearProps = 'transform',  // ← важно для Swiper и hover-эффектов
  } = options;

  gsap.from(elements, {
    opacity: 0,
    y,
    duration,
    stagger,
    delay,
    ease: 'power2.out',
    clearProps,
    scrollTrigger: {
      trigger,
      start,
      once,
    },
  });
}

// ============================================
// HERO — появление при загрузке
// ============================================
function animateHero() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

  tl.from('.hero__title', { opacity: 0, y: 40, duration: 0.9 })
    .from('.hero__description', { opacity: 0, y: 20, duration: 0.6 }, '-=0.5')
    .from('.hero__actions', { opacity: 0, y: 20, duration: 0.6 }, '-=0.4')
    .from('.hero__visual', { opacity: 0, scale: 0.9, duration: 0.9 }, '-=1');
}

// ============================================
// SERVICES
// ============================================
function animateServices() {
  const section = document.querySelector('.services');
  if (!section) return;

  revealOnScroll('.services__header', {
    trigger: section,
    y: 30,
    duration: 0.7,
  });

  revealOnScroll('.service-card', {
    trigger: section,
    y: 40,
    stagger: 0.12,
    duration: 0.7,
    start: 'top 75%',
  });
}

// ============================================
// CLIENTS
// ============================================
function animateClients() {
  const section = document.querySelector('.clients');
  if (!section) return;

  revealOnScroll('.clients__item', {
    trigger: section,
    y: 24,
    stagger: 0.1,
    duration: 0.6,
    start: 'top 80%',
  });
}

// ============================================
// SOLUTIONS
// ============================================
function animateSolutions() {
  const section = document.querySelector('.solutions');
  if (!section) return;

  revealOnScroll('.solutions__header', {
    trigger: section,
    y: 30,
    duration: 0.7,
  });

  revealOnScroll('.solution-card', {
    trigger: section,
    y: 40,
    stagger: 0.15,
    duration: 0.7,
    start: 'top 75%',
  });
}

// ============================================
// REVIEWS — БЕЗ анимации слайдера
// ============================================
function animateReviews() {
  const section = document.querySelector('.reviews');
  if (!section) return;

  revealOnScroll('.reviews__header', {
    trigger: section,
    y: 30,
    duration: 0.7,
  });

  revealOnScroll('.reviews__controls', {
    trigger: section,
    y: 20,
    duration: 0.5,
    delay: 0.2,
  });

  // ❌ НЕ анимируем .reviews__slider — конфликт с Swiper.
  // Вместо этого анимируем его обёртку или оставляем без анимации.
  // Если очень хочется — анимируем только opacity, без transform:
  gsap.from('.reviews__slider', {
    opacity: 0,
    duration: 0.8,
    delay: 0.3,
    scrollTrigger: {
      trigger: section,
      start: 'top 75%',
      once: true,
    },
  });
}

// ============================================
// STATS — появление + счётчики (ОДНА функция!)
// ============================================
function animateStats() {
  const section = document.querySelector('.stats');
  if (!section) return;

  // Появление блока
  revealOnScroll('.stats__visual', {
    trigger: section,
    y: 30,
    duration: 0.7,
  });

  revealOnScroll('.stats__content', {
    trigger: section,
    y: 30,
    duration: 0.7,
    delay: 0.15,
  });

  revealOnScroll('.stat-card', {
    trigger: section,
    y: 30,
    stagger: 0.12,
    duration: 0.6,
    delay: 0.3,
    start: 'top 80%',
  });

  // Счётчики
  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length === 0) return;

  counters.forEach((el) => {
    const target = Number(el.getAttribute('data-counter'));
    if (isNaN(target)) return;

    const obj = { value: 0 };

    gsap.to(obj, {
      value: target,
      duration: 1.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        once: true,
      },
      onUpdate: () => {
        el.textContent = Math.floor(obj.value).toString();
      },
    });
  });
}

// ============================================
// FOOTER
// ============================================
function animateFooter() {
  const footer = document.querySelector('.footer');
  if (!footer) return;

  revealOnScroll('.footer__brand, .footer__nav, .footer__socials', {
    trigger: footer,
    y: 20,
    stagger: 0.1,
    duration: 0.6,
    start: 'top 90%',
  });
}

// ============================================
// ИНИЦИАЛИЗАЦИЯ
// ============================================
export function initAnimations() {
  animateHero();
  animateServices();
  animateClients();
  animateSolutions();
  animateReviews();
  animateStats();
  animateFooter();
}