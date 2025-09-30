import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;

    this.slider = createElement(`
      <div class="slider">
        <div class="slider__thumb" style="left: ${this.getPercentage(value)};">
          <span class="slider__value">${this.value}</span>
        </div>
        <div class="slider__progress" style="width: ${this.getPercentage(value)};"></div>
        <div class="slider__steps"></div>
      </div>
    `);

    this.sliderSteps = this.slider.querySelector('.slider__steps');
    this.createSteps();
    this.setInitialValue(); // Устанавливаем начальное значение

    this.clickListener();
    this.DnD();
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
    return (value / (this.steps - 1)) * 100 + '%';
  }

  setInitialValue() {
    this.updateSlider(this.value); // Устанавливаем начальное значение слайдера
  }

  DnD() {
    const thumb = this.slider.querySelector('.slider__thumb');
    const progress = this.slider.querySelector('.slider__progress');
    thumb.ondragstart = () => false;

    thumb.onpointerdown = (event) => {
      event.preventDefault();
      this.slider.classList.add('slider_dragging');

      const shiftX = event.clientX - thumb.getBoundingClientRect().left;
      const sliderWidth = this.slider.offsetWidth;

      const move = (mousemove) => {
        let left = mousemove.clientX - shiftX - this.slider.getBoundingClientRect().left;
        let newLeft = left / sliderWidth * (this.steps - 1);

        newLeft = Math.max(0, Math.min(newLeft, this.steps - 1)); // Ограничение
        this.updateSlider(Math.round(newLeft)); // Обновляем слайдер

        // Генерируем событие изменения значения во время перемещения
        this.slider.dispatchEvent(new CustomEvent('slider-change', {
          detail: this.value,
          bubbles: true,
        }));
      };

      document.addEventListener('pointermove', move);

      document.onpointerup = () => {
        document.removeEventListener('pointermove', move);
        this.slider.classList.remove('slider_dragging');
        document.onpointerup = null;

        // Генерация события после окончания перетаскивания
        this.slider.dispatchEvent(new CustomEvent('slider-change', {
          detail: this.value,
          bubbles: true,
        }));
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
      // Генерация события изменения значения при клике
      this.slider.dispatchEvent(new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true,
      }));
    });
  }

  updateSlider(value) {
    this.value = value; // Обновление текущего значения

    const thumb = this.slider.querySelector('.slider__thumb');
    const progress = this.slider.querySelector('.slider__progress');

    const percentage = this.getPercentage(this.value);
    thumb.style.left = percentage;
    progress.style.width = percentage;

    const sliderValue = this.slider.querySelector('.slider__value');
    sliderValue.textContent = this.value;

    this.updateSteps(); // Обновляем отображаемые шаги
  }

  updateSteps() {
    const spans = this.sliderSteps.querySelectorAll('span');
    spans.forEach(span => span.classList.remove('slider__step-active'));
    spans[this.value].classList.add('slider__step-active'); // Обновляем активный шаг
  }

  get elem() {
    return this.slider;
  }
}
