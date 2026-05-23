import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.slider = createElement(`<div class="slider">
        <div class="slider__thumb">
          <span class="slider__value">${this.value}</span>
        </div>
        <div class="slider__progress"></div>
        <div class="slider__steps"></div>
      </div>`)
  
   const sliderSteps = this.slider.querySelector('.slider__steps');

    for (let i = 0; i < this.steps; i++) {
      const step = document.createElement('span');

      if (i === this.value) {
        step.classList.add('slider__step-active'); 
      }

      sliderSteps.appendChild(step);
    }

    this.Slide();
  
}

Slide() { 
  this.thumb = this.slider.querySelector('.slider__thumb');
  this.progress = this.slider.querySelector('.slider__progress');

  this.slider.addEventListener('click' , (event) => { 
      let left = event.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;
      let segments = this.steps - 1;
      let approximateValue = leftRelative * segments;
      let value = Math.round(approximateValue);
      let valuePercents = value / segments * 100;
      this.thumb.style.left = `${valuePercents}%`;
      this.progress.style.width = `${valuePercents}%`;
      this.value = value;
      
      this.slider.querySelector('.slider__value').textContent = this.value;
      
      const steps = this.slider.querySelectorAll('.slider__steps span');
      for (let i = 0; i < steps.length; i++) {
        if (i === this.value) {
          steps[i].classList.add('slider__step-active');
        } else {
          steps[i].classList.remove('slider__step-active');
        }
      }

      this.slider.dispatchEvent(new CustomEvent('slider-change' , {
        detail: this.value,
        bubbles: true,
      }));
    });
}



  get elem() { 
    return this.slider;
  }

}



