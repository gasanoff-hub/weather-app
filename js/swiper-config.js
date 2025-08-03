const breakpoints = {
  600: { slidesPerView: 3 },
  769: { slidesPerView: 3 },
  800: { slidesPerView: 4 },
  992: { slidesPerView: 3 },
  1024: { slidesPerView: 3 },
  1200: { slidesPerView: 4 },
  1440: { slidesPerView: 4 }
};

let swiperCards = new Swiper(".swiper", {
  slidesPerView: 2,
  spaceBetween: 20,
  grabCursor: true,
  breakpoints: breakpoints
});

const showMoreDesktop = document.querySelector(".btn--desktop");

let isLess = false;

showMoreDesktop.addEventListener("click", (e) => {
  e.preventDefault();

  hiddenItems.forEach((item) => {
    item.classList.toggle("hidden");
  });

  container.classList.toggle("alt-layout");
  swiperCards.update();
  swiperCards.setBreakpoint();

  showMoreDesktop.textContent = showMoreDesktop.textContent === "SEE MORE" ? "SHOW LESS" : "SEE MORE";

  document.querySelectorAll(".forecast__item").forEach((item) => {
    item.classList.toggle("expanded");
  });

  isLess = !isLess;

  if (isLess) {
    swiperCards.params.breakpoints = {};
    swiperCards.params.slidesPerView = 2;
    swiperCards.update();
  } else {
    swiperCards.destroy(true, true);
    setTimeout(() => {
      swiperCards = new Swiper(".swiper", {
        slidesPerView: 2,
        spaceBetween: 20,
        grabCursor: true,
        breakpoints: breakpoints
      });
    }, 0);
  }
});