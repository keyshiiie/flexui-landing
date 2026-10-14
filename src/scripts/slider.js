import Swiper from 'swiper';
import { Navigation, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export function initReviewsSlider() {
  const sliderEl = document.querySelector('.reviews__slider');
  if (!sliderEl) return;

  new Swiper(sliderEl, {
    modules: [Navigation, Pagination, EffectFade],
    effect: 'fade',
    fadeEffect: { crossFade: true },
    speed: 600,
    loop: true,
    slidesPerView: 1,
    navigation: {
      prevEl: '.reviews__arrow--prev',
      nextEl: '.reviews__arrow--next',
    },
    pagination: {
      el: '.reviews__pagination',
      clickable: true,
    },
  });
}