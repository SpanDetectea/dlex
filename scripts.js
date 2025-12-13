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
const sliderDots = document.querySelector('.slider__dots');

let index = 0;
let countTile = 4;

window.addEventListener('resize', () => {
    const width = window.innerWidth;
    if (width < 1024 && width > 768) {
        countTile = 3
        index = 0
    } else if (width <= 768 && width >= 420) {
        countTile = 2
        index = 0
    } else if (width >= 1024) {
        countTile = 4
        index = 0
    }
    showSlide(index);
});

function showSlide(i) {
    const len = slides.length;

    slides.forEach(slide => slide.style.display = 'none');
    sliderDots.innerHTML = '';

    const showSafe = (index) => {
        if (index >= 0 && index < len && index + countTile - 1 < len) {
            for (let i = 0; i < countTile; i++) {
                slides[index + i].style.display = 'block';
            }
        }
    };

    let countDots = slides.length - countTile + 1

    for (let i = 0; i < countDots; i++) {
        const dotWrapper = document.createElement('div');
        dotWrapper.classList.add('slider__dots__dot__wrapper');
        const dot = document.createElement('div');
        dot.classList.add('slider__dots__dot');
        if (i === index) {
            dotWrapper.classList.add('slider__dots__dot__wrapper--active');
            dot.classList.add('slider__dots__dot--active');
        }
        dotWrapper.appendChild(dot);
        dotWrapper.addEventListener('click', () => {
            index = i;
            showSlide(index);
        });
        sliderDots.appendChild(dotWrapper);
    }

    showSafe(i);

    if (sliderDots[i]) {
        sliderDots[i].classList.add('slider__dots__dot__wrapper--active');
        sliderDots[i].querySelector('.slider__dots__dot')
            .classList.add('slider__dots__dot--active');
    }
}

right.addEventListener('click', () => {
    if (index + countTile < slides.length) {
        showSlide(++index);
    }
});

left.addEventListener('click', () => {
    if (index > 0) {
        showSlide(--index);
    }
});


showSlide(index);