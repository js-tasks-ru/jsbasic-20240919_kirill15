import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides
    this.container  = createElement(`<div class="carousel">
    <!--Кнопки переключения-->
    <div class="carousel__arrow carousel__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </div>
    <div class="carousel__arrow carousel__arrow_left">
      <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
    </div>
  </div`);
    this.carouselInner = createElement('<div class="carousel__inner"></div>');
    this.container.append(this.carouselInner);
    this.renderSlides();
    this.initCarousel();
    this.customEvent();
  }

  renderSlides() { 
    const carouselInner = this.carouselInner;
    for (const slide of this.slides ) {
      const slidesElement = createElement(`<div class="carousel__slide" data-id="${slide.id}">
        <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${slide.price.toFixed(2)}</span>
          <div class="carousel__title">${slide.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>`)
      
      this.carouselInner.appendChild(slidesElement);
    }
  }

  initCarousel() {
    const carousel = this.container.querySelector('.carousel');
    const carouselInner = this.container.querySelector('.carousel__inner');
    this.slides = this.container.querySelectorAll('.carousel__slide');
    const arrowRight = this.container.querySelector('.carousel__arrow_right');
    const arrowLeft = this.container.querySelector('.carousel__arrow_left');
    this.arrowLeft = arrowLeft;
    this.arrowRight = arrowRight;
    this.totalSlides = this.slides.length; 
    this.currentSlide = 0;
    
    arrowRight.addEventListener('click' , () => {
      this.moveForward();
    });

    arrowLeft.addEventListener('click' , () => {
      this.moveBack();
    });

    this.arrowVisible();
  }

  moveForward() {
    if (this.currentSlide >= this.totalSlides - 1) {
      return;
    }
    
    const slideWidth = this.carouselInner.querySelector('.carousel__slide').offsetWidth;
    this.currentSlide = this.currentSlide + 1;
    this.carouselInner.style.transform = `translateX(${-slideWidth * this.currentSlide}px)`;
    
    this.arrowVisible();
  }

  moveBack() {
    if (this.currentSlide <= 0) {
      return;
    }
    
    const slideWidth = this.carouselInner.querySelector('.carousel__slide').offsetWidth;
    this.currentSlide = this.currentSlide - 1;
    this.carouselInner.style.transform = `translateX(${-slideWidth * this.currentSlide}px)`;

    this.arrowVisible();
  }

  arrowVisible () {
    if (this.currentSlide === 0) {
      this.arrowLeft.style.display = 'none';
    } else {
      this.arrowLeft.style.display = '';
    }

    if (this.currentSlide === this.totalSlides - 1) {
      this.arrowRight.style.display = 'none';
    } else {
      this.arrowRight.style.display = '';
    }
  }

  customEvent() {
  const buttons = this.container.querySelectorAll('.carousel__button');
  

  buttons.forEach(button => {
    const slideElement = button.closest('.carousel__slide')
    const productId = slideElement.dataset.id;
    button.addEventListener('click', () => {
      const ce = new CustomEvent('product-add', {
        bubbles: true,
        detail: productId,
      });
      button.dispatchEvent(ce);
    });

    
    button.addEventListener('product-add', event => {
      console.log('Товар добавлен в корзину', event.detail);
    });
  });
}

  get elem() {
    return this.container;
  }
}

