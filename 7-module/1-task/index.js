import createElement from "../../assets/lib/create-element.js";

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.container = createElement(`
      <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>

        <nav class="ribbon__inner">
          ${this.categories.map((elem1) =>  ( `<a href="#" class="ribbon__item" data-id="${elem1.id}">${elem1.name}</a>`
            )).join('')}
        </nav>

        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
    `);

    this.addProt(); 
  }

  addProt() {
    this.ribbon = this.container.querySelector(".ribbon__inner");
    this.arrowLeft = this.container.querySelector(".ribbon__arrow_left");
    this.arrowRight = this.container.querySelector(".ribbon__arrow_right");

    
    this.ribbon.addEventListener('scroll', () => {
      this.toggle();
    });

    this.container.addEventListener('click', (ev) => { 
      const target = ev.target.closest('.ribbon__item');

      if (target) { 
        this.selectItem(target, ev);
      }
    })

    
    this.container.addEventListener('click', (ev) => {
      const target = ev.target.closest('button');
      if (target === this.arrowLeft) {
        this.ribbon.scrollBy(-350, 0); 
      }
      if (target === this.arrowRight) {
        this.ribbon.scrollBy(350, 0); 
      }
      this.toggle(); 
    });
  }

  toggle() {
    let scrollLeft = this.ribbon.scrollLeft;
    let scrollRight = this.ribbon.scrollWidth - scrollLeft - this.ribbon.clientWidth;

   
    scrollLeft < 1 ? 
      this.arrowLeft.classList.remove('ribbon__arrow_visible') : 
      this.arrowLeft.classList.add('ribbon__arrow_visible');
    
    scrollRight < 1 ?
    this.arrowRight.classList.remove('ribbon__arrow_visible') : 
      this.arrowRight.classList.add('ribbon__arrow_visible');
  }

  selectItem(select, event) {

    event.preventDefault();

    const items = this.container.querySelectorAll('.ribbon__item');
    for (let i = 0; i < items.length; i++) { 
      items[i].classList.remove('ribbon__item_active');
    }

    select.classList.add('ribbon__item_active');


    const customEvent = new CustomEvent('ribbon-select', {
      detail: select.dataset.id,
      bubbles: true
    });

    this.container.dispatchEvent(customEvent);



  }

  

  get elem() {
    return this.container;
  }
}
