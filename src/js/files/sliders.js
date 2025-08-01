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

let slidersStore = {};

function initResponsiveSlider({
	sliderId,
	wrapperSelector,
	slideSelector,
	widthBreakpoint = 800,
	slidesPerView = 1,
	storeKey
}) {
	const swiperEl = document.getElementById(sliderId);
	const wrapper = document.querySelector(wrapperSelector);
	const slides = wrapper?.querySelectorAll(slideSelector);
	const pagination = swiperEl?.querySelector('.swiper-pagination');

	const isMobile = window.innerWidth <= widthBreakpoint;

	if (!swiperEl || !wrapper || !slides) return;

	const storedSlider = slidersStore[storeKey];

	if (isMobile && !storedSlider) {
		swiperEl.classList.add('swiper');
		wrapper.classList.add('swiper-wrapper');
		slides.forEach(slide => slide.classList.add('swiper-slide'));
		if (pagination) pagination.classList.add('swiper-pagination-visible');

		slidersStore[storeKey] = new Swiper(swiperEl, {
			modules: [Pagination],
			observer: true,
			observeParents: true,
			slidesPerView,
			spaceBetween: 0,
			speed: 800,
			loop: true,
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
		});
	} else if (!isMobile && storedSlider) {
		storedSlider.destroy(true, true);
		slidersStore[storeKey] = null;

		swiperEl.classList.remove('swiper');
		wrapper.classList.remove('swiper-wrapper');
		slides.forEach(slide => slide.classList.remove('swiper-slide'));
		if (pagination) pagination.classList.remove('swiper-pagination-visible');
	}
}

function initAllSliders() {
	initResponsiveSlider({ 
		//тут змінити класи для swiper на свої 
		sliderId: 'companies-slider', 
		wrapperSelector: '.companies__container', 
		slideSelector: '.company',
		widthBreakpoint: 800,
		slidesPerView: 1,
		storeKey: 'companiesSlider',
	});
	
	initResponsiveSlider({
		sliderId: 'best-sellers-slider',
		wrapperSelector: '.product-list__container',
		slideSelector: '.product-card-slide',
		widthBreakpoint: 1200,
		slidesPerView: 'auto',
		storeKey: 'sellerSlider',
	});
}

window.addEventListener("load", function (e) {
	// Запуск ініціалізації слайдерів
	// initSliders();
	// Запуск ініціалізації скролла на базі слайдера (за класом swiper_scroll)
	//initSlidersScroll();

	// initCompaniseSlider();
	//initSellerSlider();
	initAllSliders();
});

window.addEventListener('resize', () => {
	// initCompaniseSlider();
	// initSellerSlider();
	initAllSliders();
})