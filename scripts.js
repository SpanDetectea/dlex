const popup = document.querySelector('.popup');
const closeBtn = document.querySelector('.close');
const buttonUp = document.querySelector('.button--up');
const ctaButton = document.querySelectorAll('.cta__button');
const video = document.querySelector('.hero__video');
let triggered = false;

closeBtn.addEventListener('click', () => {
    popup.classList.remove('active');
});
popup.addEventListener('click', (e) => {
    if (e.target === popup) {
        popup.classList.remove('active');
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        popup.classList.remove('active');
    }
});

buttonUp.addEventListener('click', () => {
    popup.classList.add('active')
})
ctaButton.forEach(item => item.addEventListener('click', () => {
    popup.classList.add('active')
}))

video.addEventListener('timeupdate', () => {
    const halfTime = video.duration / 2;

    if (!triggered && video.currentTime >= halfTime) {
        triggered = true;
        popup.classList.add('active')
    }
});

 var swiper = new Swiper(".mySwiper", {
      slidesPerView: 3,
      spaceBetween: 30,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });