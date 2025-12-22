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
          ${this.categories.map(el => 
            `<a href="#" class="ribbon__item" data-id="${el.id}">${el.name}</a>`
          ).join('')}
        </nav>
        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>`
    );

    this.init();
    this.Category();
  }

  init() {
    
    this.ribbonInner = this.container.querySelector('.ribbon__inner');
    this.leftButton = this.container.querySelector('.ribbon__arrow_left');
    this.rightButton = this.container.querySelector('.ribbon__arrow_right');

    
     this.ribbonInner.addEventListener('scroll', () => {
      this.checkScroll();
    });

    
    this.container.addEventListener('click', (event) => {
      const target = event.target.closest('BUTTON');
      
      if (target === this.leftButton) {
        this.ribbonInner.scrollBy(-350 , 0);
      }
      
      if (target === this.rightButton) {
        this.ribbonInner.scrollBy(350 , 0);
      }
    });

    
    this.checkScroll();
  }

  checkScroll() {
    const scrollLeft = this.ribbonInner.scrollLeft;
    const clientWidth = this.ribbonInner.clientWidth;
    const scrollRight = this.ribbonInner.scrollWidth - scrollLeft - clientWidth;
    console.log('1)прокрутка влево сколько пикселей 2)видимая ширина 3)полная ширина' ,scrollLeft , clientWidth , scrollRight )

    
    if (scrollLeft < 1) {
      this.leftButton.classList.remove('ribbon__arrow_visible');
    } else {
      this.leftButton.classList.add('ribbon__arrow_visible');
    }

    
    if (scrollRight < 1) {
      this.rightButton.classList.remove('ribbon__arrow_visible');
    } else {
      this.rightButton.classList.add('ribbon__arrow_visible');
    }
  } 

  Category() {
  this.ribbonItems = this.container.querySelectorAll('.ribbon__item');


    this.ribbonItems.forEach(element => {
    element.addEventListener('click', (event) => {
      event.preventDefault();

        if (event.target.closest('a')) {
          this.ribbonItems.forEach(item => {
            item.classList.remove('ribbon__item_active');
          });

        
      event.target.classList.add('ribbon__item_active');


        
      const categoryId = event.target.dataset.id;


  
        this.container.dispatchEvent(new CustomEvent('ribbon-select', {
          detail: categoryId,
          bubbles: true
        }));
      }
    });
  });
}




  get elem() {
    return this.container;
  }
}
