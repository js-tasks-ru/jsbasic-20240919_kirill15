import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) {
    this.product = product;
    this.container = createElement(`<div id="holder" class="container_half">
    <div class="card">
      <div class="card__top">
        <img src="/assets/images/products/${product.image}" class="card__image" alt="product">
        <span class="card__price">€${product.price.toFixed(2)}</span>
      </div>
      <div class="card__body">
        <div class="card__title">${product.name}</div>
        <button type="button" class="card__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
    </div>
  </div>`);

  this.customEvent();
  }

  customEvent() {
    const button = this.container.querySelector('.card__button');
    button.addEventListener('click' , (event) => { 
      let ce = new CustomEvent('product-add' , {
        detail:this.product.id,
        bubbles: true,
      })
      button.dispatchEvent(ce);
    })

    button.addEventListener('product-add' , (event) => { 
            console.log('Товар добавлен в корзину' , event.detail)
        })

  } 

  get elem () {
    return this.container;
  }

  
}