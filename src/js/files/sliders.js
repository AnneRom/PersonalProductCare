/*
Документація по роботі у шаблоні: 
Документація слайдера: https://swiperjs.com/
Сніппет(HTML): swiper
*/

// Підключаємо слайдер Swiper з node_modules
// При необхідності підключаємо додаткові модулі слайдера, вказуючи їх у {} через кому
// Приклад: { Navigation, Autoplay }
import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
/*
Основні модулі слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Детальніше дивись https://swiperjs.com/
*/

// Стилі Swiper
// Базові стилі
import "../../scss/base/swiper.scss";
// Повний набір стилів з scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Повний набір стилів з node_modules
// import 'swiper/css';

let companiesSlider = null;

function initCompaniseSlider() {
	const swiperCompanies = document.getElementById('companies-slider');
	const wrapper = document.querySelector('.companies__container');
	const sliders = wrapper.querySelectorAll('.company');
	const pagination = swiperCompanies.querySelector('.swiper-pagination');

	const isMobile = window.innerWidth <= 800;

	if (!swiperCompanies || !wrapper || !sliders) return;

	if (isMobile && !companiesSlider) 
		{
			swiperCompanies.classList.add('swiper');
			wrapper.classList.add('swiper-wrapper');
			sliders.forEach(slide => slide.classList.add('swiper-slide'));

			if (pagination) pagination.classList.add('swiper-pagination-visible');

			companiesSlider = new Swiper('#companies-slider', {

			modules: [Pagination],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 0,
			speed: 800,
			loop: true,
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			on: {

			}
		});

		} else if (!isMobile && companiesSlider) {
			companiesSlider.destroy(true, true);
			companiesSlider = null;

			swiperCompanies.classList.remove('swiper');
			wrapper.classList.remove('swiper-wrapper');
			sliders.forEach(slide => slide.classList.remove('swiper-slide'));

			if (pagination) pagination.classList.remove('swiper-pagination-visible');
		}
}

let sellerSlider = null;

function initSellerSlider() {
	const swiperSeller = document.getElementById('best-sellers-slider');
	const wrapper = document.querySelector('.product-list__container');
	const sliders = wrapper.querySelectorAll('.product-card-slide');
	const pagination = swiperSeller.querySelector('.swiper-pagination');

	const isMobile = window.innerWidth <= 1200;

	if (!swiperSeller || !wrapper || !sliders) return;

	if (isMobile && !sellerSlider) 
		{
			swiperSeller.classList.add('swiper');
			wrapper.classList.add('swiper-wrapper');
			sliders.forEach(slide => slide.classList.add('swiper-slide'));

			if (pagination) pagination.classList.add('swiper-pagination-visible');

			sellerSlider = new Swiper(swiperSeller, {

			modules: [Pagination],
			observer: true,
			observeParents: true,
			slidesPerView: 'auto',
			spaceBetween: 0,
			speed: 800,
			loop: true,
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			on: {

			}
		});

		} else if (!isMobile && sellerSlider) {
			sellerSlider.destroy(true, true);
			sellerSlider = null;

			swiperSeller.classList.remove('swiper');
			wrapper.classList.remove('swiper-wrapper');
			sliders.forEach(slide => slide.classList.remove('swiper-slide'));

			if (pagination) pagination.classList.remove('swiper-pagination-visible');
		}
}

// Ініціалізація слайдерів
function initSliders() {
	// Список слайдерів
	// Перевіряємо, чи є слайдер на сторінці
	if (document.querySelector('.swiper')) { // Вказуємо склас потрібного слайдера
		// Створюємо слайдер
		new Swiper('.swiper', { // Вказуємо склас потрібного слайдера
			// Підключаємо модулі слайдера
			// для конкретного випадку
			modules: [Pagination],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 0,
			//autoHeight: true,
			speed: 800,

			//touchRatio: 0,
			//simulateTouch: false,
			loop: true,
			//preloadImages: false,
			//lazy: true,

			/*
			// Ефекти
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			*/

			// Пагінація
	
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
		

			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Кнопки "вліво/вправо"
			// navigation: {
			// 	prevEl: '.swiper-button-prev',
			// 	nextEl: '.swiper-button-next',
			// },
			/*
			// Брейкпоінти
			breakpoints: {
				640: {
					slidesPerView: 1,
					spaceBetween: 0,
					autoHeight: true,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1268: {
					slidesPerView: 4,
					spaceBetween: 30,
				},
			},
			*/
			// Події
			on: {

			}
		});
	}
}
// Скролл на базі слайдера (за класом swiper scroll для оболонки слайдера)
function initSlidersScroll() {
	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}

window.addEventListener("load", function (e) {
	// Запуск ініціалізації слайдерів
	// initSliders();
	// Запуск ініціалізації скролла на базі слайдера (за класом swiper_scroll)
	//initSlidersScroll();
	initCompaniseSlider();
	initSellerSlider();
});

window.addEventListener('resize', () => {
	initCompaniseSlider();
	initSellerSlider();
})