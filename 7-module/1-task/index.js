import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
   constructor(categories) {
    this.categories = categories;
    this.container = createElement(`
      <div class="ribbon">
        <!-- Кнопка прокрутки влево -->
        <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>

        <!-- Ссылки на категории -->
        <nav class="ribbon__inner">
          ${this.categories.map(element => `
            <a href="#" class="ribbon__item" data-id="${element.id}">${element.name}</a>
          `).join('')}
        </nav>

        <!-- Кнопка прокрутки вправо -->
        <button class="ribbon__arrow ribbon__arrow_right  ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
    `);

    this.Scroll();
    this.Category();
  }

  Scroll() { 
    this.ribbonInner = this.container.querySelector('.ribbon__inner');
    this.arrowLeft = this.container.querySelector('.ribbon__arrow_left');
    this.arrowRight = this.container.querySelector('.ribbon__arrow_right');

    this.arrowRight.addEventListener('click' , () => {
      this.ribbonInner.scrollBy(350 , 0)
    })

    this.arrowLeft.addEventListener('click' , () => { 
      this.ribbonInner.scrollBy(-350 , 0)
    })

    this.ribbonInner.addEventListener('scroll', () => {
    this.checkScroll();
  });

    this.checkScroll();
  }

  checkScroll() { 
    let scrollLeft = this.ribbonInner.scrollLeft;
    let scrollWidth = this.ribbonInner.scrollWidth;
    let clientWidth = this.ribbonInner.clientWidth;
    let scrollRight = scrollWidth - scrollLeft - clientWidth;
    console.log(scrollLeft);
    console.log(scrollRight , scrollWidth , clientWidth)


    if (scrollLeft <= 1) { 
      this.arrowLeft.classList.remove('ribbon__arrow_visible');
    } else { 
      this.arrowLeft.classList.add('ribbon__arrow_visible');
    }

    if (scrollRight <= 1) { 
      this.arrowRight.classList.remove('ribbon__arrow_visible');
    } else { 
      this.arrowRight.classList.add('ribbon__arrow_visible')
    }
  }


  Category() {
    const elements = this.container.querySelectorAll('.ribbon__item');
    elements.forEach(element => {
      element.addEventListener('click', (event) => {
        event.preventDefault();

      
        elements.forEach(el => {
          el.classList.remove('ribbon__item_active');
        });

      
        element.classList.add('ribbon__item_active');

        const categoryId = element.getAttribute('data-id'); 
        const customEvent = new CustomEvent('ribbon-select', {
          detail: categoryId,  
          bubbles: true       
        });

        this.elem.dispatchEvent(customEvent);
      });
    });
  }
  


 

  get elem() { 
    return this.container;
  }

}







   







