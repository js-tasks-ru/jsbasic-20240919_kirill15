import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.slider = createElement(`<div class="container" style="padding: 50px;">
      <div class="slider">
        <div class="slider__thumb" style="left: ${this.getValueProts(value)}%;">
          <span class="slider__value">${this.value}</span>
        </div>
        <div class="slider__progress" style="width:${this.getValueProts(value)}%;"></div>
        <div class="slider__steps"></div>
      </div>
    </div>`);

    this.sliderStep = this.slider.querySelector('.slider__steps');
    this.updateSteps();
    this.initClickListener();
  }

  updateSteps() {
    this.sliderStep.innerHTML = ''; 
    for (let i = 0; i < this.steps; i++) {
      const span = document.createElement('span');
      this.sliderStep.append(span);
      if (i === this.value) { 
        span.classList.add('slider__step-active');
      }
    }
  }

  getValueProts(value) { 
    return (value / (this.steps - 1)) * 100;
  }

  initClickListener() {
    this.slider.querySelector('.slider').addEventListener('click', (event) => {
      const sliderWidth = this.slider.querySelector('.slider').offsetWidth;
      const left = event.clientX - this.slider.getBoundingClientRect().left;
      const leftRelative = left / sliderWidth;
      const step = Math.round(leftRelative * (this.steps - 1));
      this.setValue(step);
    });
  }

  setValue(value) { 
    if (value < 0) { 
      this.value = 0;
    } else if (value >= this.steps) {
      this.value = this.steps - 1;
    } else {
      this.value = value;
    }

    const thumb = this.slider.querySelector('.slider__thumb');
    const progress = this.slider.querySelector('.slider__progress');
    const valueProts = this.getValueProts(this.value);
    
    thumb.style.left = valueProts + '%';
    progress.style.width = valueProts + '%';
    
    const sliderValue = this.slider.querySelector('.slider__value');
    sliderValue.textContent = this.value;

    this.updateSteps();

    const event = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    });

    this.slider.dispatchEvent(event);
  }

  get elem() {
    return this.slider;
  }
}
