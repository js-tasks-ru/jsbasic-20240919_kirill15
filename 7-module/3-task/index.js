import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.value = value;
    this.steps = steps;
    this.slider = createElement(`<div class="container" style="padding: 50px;">
  <!--Корневой элемент слайдера-->
  <div class="slider">

    <!--Ползунок слайдера с активным значением-->
    <div class="slider__thumb" style="left: ${this.getValueProts(value)}%;">
      <span class="slider__value">${this.value}</span>
    </div>

    <!--Заполненная часть слайдера-->
    <div class="slider__progress" style="width:${this.getValueProts(value)}%;"></div>

    <!--Шаги слайдера-->
    <div class="slider__steps">
    </div>
  </div>

</div>`)

   
    this.sliderStep = this.slider.querySelector('.slider__steps');
    for (let i = 0; i < this.steps; i++) {

      const span = document.createElement('span');
      this.sliderStep.append(span);

      if (i === this.value) { 
        
        span.classList.add('slider__steps-active');

      }
    }

    this.click();
  }

  getValueProts(value) { 
    return (value / (this.steps - 1)) * 100;
  }

  click() {
    const slider = this.slider.querySelector('.slider');
    slider.addEventListener('click' , (ev) => {

      let left = ev.clientX - slider.getBoundingClientRect().left;
      const sliderWidth = slider.offsetWidth;
      console.log(`Координата клика: ${left}px`);
      console.log(`Ширина слайдера: ${sliderWidth}px`);
      let leftRelative = left / sliderWidth;
      console.log(leftRelative);
      const step = Math.round(leftRelative * (this.steps - 1));
      console.log(step);

      this.setValue(step);
      

  })
}
  setValue(value) { 

    if (value < 0) { 
      this.value = 0;

    } else if (value >= this.steps) {
      this.value = this.steps - 1
    } else {
      this.value = value;
    }

    const thumb = this.slider.querySelector('.slider__thumb');
    const progress = this.slider.querySelector('.slider__progress');
    const valueProts = (this.value / (this.steps - 1)) * 100;
    thumb.style.left = valueProts + '%'
    progress.style.width = valueProts + '%'
    console.log(`Позиция ползунка: ${thumb.style.left}`);
    const slidervalue = this.slider.querySelector('.slider__value');
    slidervalue.textContent = this.value;


    const event = new CustomEvent('slider-change' , {
      detail: this.value,
      bubble: true
    });

    this.slider.dispatchEvent(event);



        
    
    
    

  }
get elem() {
  return this.slider
}
 
}

