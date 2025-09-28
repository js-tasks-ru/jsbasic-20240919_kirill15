import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;

    this.slider = createElement(`
      <div class="slider">
        <div class="slider__thumb" style="left: ${this.getPercentage(value)}%;">
          <span class="slider__value">${this.value}</span>
        </div>
        <div class="slider__progress" style="width: ${this.getPercentage(value)}%;"></div>
        <div class="slider__steps"></div>
      </div>
    `);

    this.sliderSteps = this.slider.querySelector('.slider__steps');
    this.createSteps();

    // Инициализируем обработчик клика
    this.clickListener();
  }

  createSteps() {
    this.sliderSteps.innerHTML = '';
    for (let i = 0; i < this.steps; i++) {
      const span = document.createElement('span');
      this.sliderSteps.append(span);
      if (i === this.value) {
        span.classList.add('slider__step-active');
      }
    }
  }

  getPercentage(value) {
    return (value / (this.steps - 1)) * 100;
  }

  clickListener() {
    this.slider.addEventListener('click', (event) => {
      const points = [...this.sliderSteps.querySelectorAll('span')];
      const leftRelative = event.clientX - this.slider.getBoundingClientRect().left;
      const sliderWidth = this.slider.offsetWidth;
      const percentage = leftRelative / sliderWidth;
      const step = Math.round(percentage * (this.steps - 1));

      this.updateSlider(step);
    });
  }

  updateSlider(value) {
    if (value < 0) {
      this.value = 0;
    } else if (value >= this.steps) {
      this.value = this.steps - 1;
    } else {
      this.value = value;
    }

    const thumb = this.slider.querySelector('.slider__thumb');
    const progress = this.slider.querySelector('.slider__progress');
    
    const percentage = this.getPercentage(this.value);
    thumb.style.left = percentage + '%';
    progress.style.width = percentage + '%';

    const sliderValue = this.slider.querySelector('.slider__value');
    sliderValue.textContent = this.value;

    this.updateSteps();

    this.slider.dispatchEvent(new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true,
    }));
  }

  updateSteps() {
    const spans = this.sliderSteps.querySelectorAll('span');
    spans.forEach(span => span.classList.remove('slider__step-active'));
    spans[this.value].classList.add('slider__step-active');
  }

  get elem() {
    return this.slider;
  }
}
