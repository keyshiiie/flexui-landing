/**
 * Mobile menu controller
 * - открытие/закрытие по бургеру
 * - аккордеон для подменю
 * - блокировка скролла
 * - закрытие по Escape / клику по ссылке / оверлею
 */
export function initMobileMenu() {
  const header = document.querySelector('[data-header]');
  const burger = document.querySelector('[data-burger]');
  const menu = document.querySelector('[data-mobile-menu]');
  const overlay = document.querySelector('[data-mobile-overlay]');
  const accordions = document.querySelectorAll('[data-accordion]');

  if (!burger || !menu) return;

  const open = () => {
    menu.classList.add('is-open');
    burger.classList.add('is-active');
    burger.setAttribute('aria-expanded', 'true');
    menu.setAttribute('aria-hidden', 'false');
    document.body.classList.add('is-locked');
  };

  const close = () => {
    menu.classList.remove('is-open');
    burger.classList.remove('is-active');
    burger.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('is-locked');

    // Закрываем все подменю при закрытии
    accordions.forEach((btn) => {
      btn.setAttribute('aria-expanded', 'false');
      btn.closest('.mobile-menu__item')?.classList.remove('is-open');
    });
  };

  const toggle = () => {
    menu.classList.contains('is-open') ? close() : open();
  };

  // Клик по бургеру
  burger.addEventListener('click', toggle);

  // Клик по оверлею
  overlay?.addEventListener('click', close);

  // Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      close();
    }
  });

  // Аккордеон
  accordions.forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.mobile-menu__item');
      const isOpen = item?.classList.contains('is-open');

      // Закрываем все остальные
      accordions.forEach((other) => {
        other.setAttribute('aria-expanded', 'false');
        other.closest('.mobile-menu__item')?.classList.remove('is-open');
      });

      if (!isOpen && item) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Закрытие по клику на любую ссылку внутри меню
  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      // Небольшая задержка, чтобы успел сработать переход
      setTimeout(close, 150);
    });
  });

  // Автозакрытие при ресайзе до десктопа
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && menu.classList.contains('is-open')) {
      close();
    }
  });
}