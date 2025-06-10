// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";


const menuToggle = document.querySelector('.sideMenu__icon');
const sideMenu = document.querySelector('.header__nav');
let lastScrollTop = 0;
const header = document.querySelector('.header');

document.addEventListener('DOMContentLoaded', () => {
    menuToggle.addEventListener('click', () => {
        sideMenu.classList.toggle('active_sideMenu');
        menuToggle.classList.toggle('open');
        document.body.classList.toggle('no-scroll');
    })
    window.addEventListener('resize', () => {
        if (window.innerWidth > 850) {
            sideMenu.classList.add('no-transition'); 
            sideMenu.classList.remove('active_sideMenu');
            menuToggle.classList.remove('open');
        } 
        else {
            sideMenu.classList.remove('no-transition');
        }
    });
    window.addEventListener ('scroll', () => {
        let scrollTop = window.scrollY || document.documentElement.scrollTop;

        if ((scrollTop > lastScrollTop) && (scrollTop > header.offsetHeight)) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        } 
    
        lastScrollTop = scrollTop;
    });
});