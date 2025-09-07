import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) {
    this.name = product.name;
    this.price = product.price;
    this.category = product.category;
    this.image = product.image;
    this.id = product.id;
    this.elem = this.createCard();
    this.addEventListeners();
  }
  createCard() { 
    const price1 = this.price.toFixed(2);
    const price2 = `€${price1}`;

    const image12 = `/assets/images/products/${this.image}`;

    const template = `<div class="card">
    <div class="card__top">
        <img src="${image12}" class="card__image" alt="${this.name}">
        <span class="card__price">${price2}</span>
    </div>
    <div class="card__body">
        <div class="card__title">${this.name}</div>
        <button type="button" class="card__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
    </div>
</div>`;
    return createElement(template);
  }

  addEventListeners() { 
    const button = this.elem.querySelector('.card__button'); 
    button.addEventListener('click', this.buttonclick.bind(this)); 
  }

  
  buttonclick(event) { 
    const button = event.target.closest('.card__button'); 
    if (button) { 
      const card = button.closest('.card'); 
      const productId = this.id; 

    
      const Dispatch = new CustomEvent("product-add", { 
        detail: productId, 
        bubbles: true 
      });

      
      card.dispatchEvent(Dispatch);
    } 
  } 
}
