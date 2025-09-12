import createElement from '../../assets/lib/create-element.js';
export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = this.createCarousel();
    this.addEventListener1();
    this.currentSlide = 0;
    this.updateSlideVisibility();
    this.updateButtons();
    
  }

  

  createCarousel() { 
    const slidesHtml = this.slides.map(slide => {
      const price = slide.price.toFixed(2);
      const price2 = `€${price}`;
      const image1 = `/assets/images/carousel/${slide.image}`;

       

      return `
       <div class="carousel__slide" data-id="${slide.id}">
        <img src="${image1}" class="carousel__img" alt="${slide.name}">
        <div class="carousel__caption">
          <span class="carousel__price">${price2}</span>
          <div class="carousel__title">${slide.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>`;
    }).join("");

    return createElement(`
       <div class="carousel">
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner">${slidesHtml}</div> <!-- Слайды вставляются сюда -->
      </div>
    `);
        

  }
  addEventListener1() { 
    const leftbutton = this.elem.querySelector('.carousel__arrow_left');
    const rightbutton = this.elem.querySelector('.carousel__arrow_right');
    const slides = this.elem.querySelectorAll('.carousel__slide');

    rightbutton.addEventListener('click', () => { 

      this.moveToSlide(this.currentSlide + 1);
      
    });

    leftbutton.addEventListener('click', () => { 
      this.moveToSlide(this.currentSlide - 1);
    });

  }

  moveToSlide (index) { 
    const slides = this.elem.querySelectorAll('.carousel__slide')
    if(index  <  0) {
      this.currentSlide = 0
    } else if (index >= slides.length) { 

      this.currentSlide = slides.length - 1

    } else {
      this.currentSlide = index;
    }
    this.updateSlideVisibility();
    this.updateButtons();
  }

  updateSlideVisibility() {

    const slides = this.elem.querySelectorAll('.carousel__slide')
    for (let index = 0; index < slides.length; index++) {
      const slide = slides[index];

      if (index === this.currentSlide) { 
        slide.style.display = 'block';
      } else {
        slide.style.display = 'none';
      }
    }

}
  updateButtons() {
    const btnLeft = this.elem.querySelector('.carousel__arrow_left'); 
    const btnRight = this.elem.querySelector('.carousel__arrow_right'); 

    
    if (this.currentSlide === 0) {
      btnLeft.style.display = 'none';
    } else {
      btnLeft.style.display = 'block'; 
    }

    
    if (this.currentSlide === this.slides.length - 1) {
      btnRight.style.display = 'none';
    } else {
      btnRight.style.display = 'block'; 
    }
  }
}
