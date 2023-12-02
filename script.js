const photosSwiper = new Swiper(".photos", {
  slidesPerView: "auto",
  spaceBetween: 16,
});

const sliderSwiper = new Swiper(".slider__items", {
  slidesPerView: "auto",
  spaceBetween: 16,
});

const buttonMenu = document.querySelector(".button_menu");
const menu = document.querySelector(".menu");
const menuItems = document.querySelectorAll(".menu__item");
const buttonToForm = document.querySelector(".menu__button");
const buttonsSocial = document.querySelectorAll(".menu__social .button");

const toggleMenu = () => {
  if (!buttonMenu.classList.contains("button_menu_open")) {
    buttonMenu.classList.add("button_menu_open");
    menu.classList.add("menu_visible");
  } else {
    buttonMenu.classList.remove("button_menu_open");
    menu.classList.remove("menu_visible");
  }
};

[buttonMenu, buttonToForm, ...menuItems, ...buttonsSocial].forEach((elem) => {
  elem.addEventListener("click", toggleMenu);
});
