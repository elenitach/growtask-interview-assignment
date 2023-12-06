const buttonMenu = document.querySelector(".button_menu");
const headerText = document.querySelector(".header__h4");
const headerLogo = document.querySelector(".header__logo");
const menu = document.querySelector(".menu");
const menuItems = document.querySelectorAll(".menu__item");
const buttonToForm = document.querySelector(".menu__button");
const buttonsSocial = document.querySelectorAll(".menu__social .button");
const pictures = document.querySelectorAll(".picture");
const picturesRadios = document.querySelectorAll(".pictures__radio");
const faqs = document.querySelectorAll(".question");
const form = document.querySelector(".form");
const submitButton = form.querySelector(".form__button");

const initializeSwiper = () => {
  new Swiper(".photos", {
    slidesPerView: "auto",
  });

  new Swiper(".slider__items", {
    slidesPerView: "auto",
    navigation: {
      nextEl: ".slider__button_next",
      prevEl: ".slider__button_prev",
    },
  });
};

const toggleMenu = () => {
  buttonMenu.classList.toggle("button_menu_open");
  menu.classList.toggle("menu_visible");
  headerLogo.classList.toggle("hidden");
  headerText.classList.toggle("hidden");
};

const toggleActivePicture = (idx) => {
  picturesRadios.forEach((radio) => radio.classList.remove("radio_active"));
  picturesRadios[idx].classList.add("radio_active");
  pictures.forEach((picture) => picture.classList.remove("picture_active"));
  pictures[idx].classList.add("picture_active");
};

const animateFAQs = () => {
  faqs.forEach((q) => {
    const summary = q.querySelector("summary");
    const answer = q.querySelector(".question__answer");
    const icon = q.querySelector(".button__img");
    let isClosing = false;
    let isExpanding = false;
    let animation = null;

    const onAnimationFinish = (open) => {
      q.open = open;
      animation = null;
      isClosing = false;
      isExpanding = false;
      q.style.height = "";
    };

    const expand = () => {
      isExpanding = true;
      const startHeight = `${q.offsetHeight}px`;
      const endHeight = `${summary.offsetHeight + answer.offsetHeight}px`;

      if (animation) {
        animation.icon.cancel();
        animation.answer.cancel();
      }
      animation = {
        icon: icon.animate(
          {
            transform: ["rotate(0)", "rotate(-45deg)"],
          },
          {
            duration: 300,
            easing: "ease-out",
          }
        ),
        answer: q.animate(
          {
            height: [startHeight, endHeight],
          },
          {
            duration: 300,
            easing: "ease-out",
          }
        ),
      };
      animation.answer.onfinish = () => onAnimationFinish(true);
      animation.answer.oncancel = () => (isExpanding = false);
    };

    const close = () => {
      isClosing = true;
      const startHeight = `${q.offsetHeight}px`;
      const endHeight = `${summary.offsetHeight}px`;
      if (animation) {
        animation.icon.cancel();
        animation.answer.cancel();
      }
      animation = {
        icon: icon.animate(
          {
            transform: ["rotate(-45deg)", "rotate(0)"],
          },
          {
            duration: 300,
            easing: "ease-out",
          }
        ),
        answer: q.animate(
          {
            height: [startHeight, endHeight],
          },
          {
            duration: 300,
            easing: "ease-out",
          }
        ),
      };
      animation.answer.onfinish = () => onAnimationFinish(false);
      animation.answer.oncancel = () => (isClosing = false);
    };

    const open = () => {
      q.style.height = `${q.offsetHeight}px`;
      q.open = true;
      window.requestAnimationFrame(expand);
    };

    summary.addEventListener("click", (e) => {
      e.preventDefault();
      if (isClosing || !q.open) {
        open();
      } else if (isExpanding || q.open) {
        close();
      }
    });
  });
};

const handleFormSubmit = () => {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const response = await fetch("", {
      method: "POST",
      body: data,
    });
    const result = await response.json();
    console.log(result);
  });

  submitButton.addEventListener("click", () => {
    const invalidInputs = form.querySelectorAll(".form__input:invalid");
    invalidInputs.forEach((input) => {
      input.classList.add("input_invalid");
      input.addEventListener("input", (e) =>
        e.target.classList.remove("input_invalid")
      );
    });
  });
};

const main = () => {
  [buttonMenu, buttonToForm, ...menuItems, ...buttonsSocial].forEach((elem) => {
    elem.addEventListener("click", toggleMenu);
  });

  picturesRadios.forEach((radio, idx) => {
    radio.addEventListener("click", () => toggleActivePicture(idx));
  });

  initializeSwiper();
  animateFAQs();
  handleFormSubmit();
};

main();