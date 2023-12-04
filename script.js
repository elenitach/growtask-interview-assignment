const photosSwiper = new Swiper(".photos", {
  slidesPerView: "auto",
  spaceBetween: 16,
});

const sliderSwiper = new Swiper(".slider__items", {
  slidesPerView: "auto",
  spaceBetween: 16,
});

const buttonMenu = document.querySelector(".button_menu");
const headerText = document.querySelector(".header__h4");
const headerLogo = document.querySelector(".header__logo");
const menu = document.querySelector(".menu");
const menuItems = document.querySelectorAll(".menu__item");
const buttonToForm = document.querySelector(".menu__button");
const buttonsSocial = document.querySelectorAll(".menu__social .button");
const pictures = document.querySelectorAll('.picture');
const picturesRadios = document.querySelectorAll(".pictures__radio");

const toggleMenu = () => {
  if (!buttonMenu.classList.contains("button_menu_open")) {
    buttonMenu.classList.add("button_menu_open");
    menu.classList.add("menu_visible");
    headerLogo.classList.add('hidden');
    headerText.classList.remove('hidden');

  } else {
    buttonMenu.classList.remove("button_menu_open");
    menu.classList.remove("menu_visible");
    headerLogo.classList.remove("hidden");
    headerText.classList.add("hidden");
  }
};

[buttonMenu, buttonToForm, ...menuItems, ...buttonsSocial].forEach((elem) => {
  elem.addEventListener("click", toggleMenu);
});

const toggleActivePicture = (idx) => {
  picturesRadios.forEach((radio) => radio.classList.remove("radio_active"));
  picturesRadios[idx].classList.add('radio_active');
  pictures.forEach((picture) => picture.classList.remove("picture_active"));
  pictures[idx].classList.add('picture_active');
}

picturesRadios.forEach((radio, idx) => {
  radio.addEventListener('click', () => toggleActivePicture(idx))
});