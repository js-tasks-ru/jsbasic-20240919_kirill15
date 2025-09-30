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
    this.setInitialValue(this.value); // Вызываем установку значений

    this.clickListener();
    this.DnD();
  }

  setInitialValue(value) {
    let sliderValue = this.slider.querySelector('.slider__value');
    let sliderThumb = this.slider.querySelector('.slider__thumb');
    let sliderProgress = this.slider.querySelector('.slider__progress');

    this.updateSteps(value); // Обновляем шаги

    let currentPercent = this.getPercentage(value) + '%';
    sliderThumb.style.left = currentPercent;
    sliderProgress.style.width = currentPercent;
    sliderValue.innerHTML = value;
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

  DnD() {
    let thumb = this.slider.querySelector('.slider__thumb');
    let progress = this.slider.querySelector('.slider__progress');
    thumb.ondragstart = () => false;

    thumb.onpointerdown = (event) => {
      this.slider.classList.add('slider_dragging');
      let shiftX = event.clientX - thumb.getBoundingClientRect().left;

      const move = (mousemove) => {
        const left = mousemove.clientX - shiftX - this.slider.getBoundingClientRect().left;
        let newLeft = left / this.slider.offsetWidth * (this.steps - 1);

        newLeft = Math.max(0, Math.min(newLeft, this.steps - 1)); // Ограничение
        this.updateSlider(Math.round(newLeft));
      }

      document.addEventListener('pointermove', move);
      document.onpointerup = () => {
        document.removeEventListener('pointermove', move);
        this.slider.classList.remove('slider_dragging');
        document.onpointerup = null;
      };
    };
  }

  clickListener() {
    this.slider.addEventListener('click', (event) => {
      const leftRelative = event.clientX - this.slider.getBoundingClientRect().left;
      const sliderWidth = this.slider.offsetWidth;
      const percentage = leftRelative / sliderWidth;
      const step = Math.round(percentage * (this.steps - 1));
      
      this.updateSlider(step);
    });
  }

  updateSlider(value) {
    this.value = value; // Обновление значения

    const thumb = this.slider.querySelector('.slider__thumb');
    const progress = this.slider.querySelector('.slider__progress');

    const percentage = this.getPercentage(this.value);
    thumb.style.left = percentage + '%';
    progress.style.width = percentage + '%';

    const sliderValue = this.slider.querySelector('.slider__value');
    sliderValue.textContent = this.value;

    this.updateSteps(this.value); // Обновление активного шага

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
