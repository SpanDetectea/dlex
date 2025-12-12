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


const footerArrows = document.querySelectorAll('.arrow-footer');

footerArrows.forEach(arrow => {
    arrow.addEventListener('click', () => {
        const list = arrow.nextElementSibling;
        list.classList.toggle('active');
        arrow.classList.toggle('open');
    });
});

const wrapper = document.querySelector('.slider__wrapper');
const slides = document.querySelectorAll('.tile');
const left = document.querySelector('.slider__arrow--left');
const right = document.querySelector('.slider__arrow--right');
const dots = document.querySelectorAll('.slider__dots__dot__wrapper');

let index = 0;

function showSlide(i) {
    const len = slides.length;

    // Скрываем все слайды
    slides.forEach(slide => slide.style.display = 'none');

    // Функция для безопасного показа слайда
    const showSafe = (index) => {
        if (index >= 0 && index < len) {
            slides[index].style.display = 'block';
        }
    };

    // Показываем текущий + два следующих
    showSafe(i);
    showSafe(i + 1);
    showSafe(i + 2);

    // Обновляем точки
    dots.forEach(dot => {
        dot.classList.remove('slider__dots__dot__wrapper--active');
        dot.querySelector('.slider__dots__dot')
            .classList.remove('slider__dots__dot--active');
    });

    if (dots[i]) {
        dots[i].classList.add('slider__dots__dot__wrapper--active');
        dots[i].querySelector('.slider__dots__dot')
            .classList.add('slider__dots__dot--active');
    }
}

// Навигация
right.addEventListener('click', () => {
    index = (index + 1) % slides.length;
    showSlide(index);
});

left.addEventListener('click', () => {
    index = (index - 1 + slides.length) % slides.length;
    showSlide(index);
});

// Клики по точкам
dots.forEach((dot, dotIndex) => {
    dot.addEventListener('click', () => {
        index = dotIndex;
        showSlide(index);
    });
});

// Первое отображение
showSlide(index);
