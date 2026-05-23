import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]
  modal = null;
  
  


  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this.addEventListeners();
  }

  addProduct(product) { 

     if (!product) {
      return
    };
    
    let cartItem = this.cartItems.find(item => item.id === product.id)
      if(!cartItem) { 
        this.cartItems.push({
           name: product.name,
           price: product.price,
           category: product.category,
          image: product.image,
          id: product.id,
          count: 1
        })
      }
      else { 
        cartItem.count++;
      }
      this.onProductUpdate(cartItem);
  }


  updateProductCount(productId, amount) { 
    const cartItem = this.cartItems.find(item => item.id === productId);

    if (!cartItem) {
      return;
    }
    
    cartItem.count += amount;
    
    if (cartItem.count === 0) {
      this.cartItems = this.cartItems.filter(item => item.id  !== productId);
      this.onProductUpdate(null);
    }
    this.onProductUpdate(cartItem);
  }

  isEmpty() { 
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    let totalCount = 0;
    for (let i = 0; i < this.cartItems.length; i++) { 
      const item = this.cartItems[i].count;
      totalCount = totalCount + item;
    }
    return totalCount;
  }

  
  getTotalPrice() {
    let totalPrice = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
      const item = this.cartItems[i];
      totalPrice += item.count * item.price;
    }
    return totalPrice;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }


renderModal() {
  if (this.modal) {
    this.modal.close();
  }
  this.modal = new Modal();
  this.modal.setTitle('Your order');

  const modalBody = document.createElement('div');

  // Сначала добавляем товары
  for (const cartItem of this.cartItems) {
    const productCard = this.renderProduct(cartItem, cartItem.count);
    modalBody.appendChild(productCard);
  }

  
  const orderForm = this.renderOrderForm();
  modalBody.appendChild(orderForm);

  
  this.modal.setBody(modalBody);
  this.modal.open();

  
  const container = document.querySelector('.modal__body'); 

  const plusButtons = container.querySelectorAll('.cart-counter__button_plus');
  const minusButtons = container.querySelectorAll('.cart-counter__button_minus');

  for (const button of plusButtons) {
    button.addEventListener('click', () => {
      const productCard = button.closest('.cart-product');
      const productId = productCard.dataset.productId;
      this.updateProductCount(productId, 1);
    });
  }

  for (const button of minusButtons) {
    button.addEventListener('click', () => {
      const productCard = button.closest('.cart-product');
      const productId = productCard.dataset.productId;
      this.updateProductCount(productId, -1);
    });
  }

  const cartForm = container.querySelector('.cart-form');
  if (cartForm) {
    cartForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this.onSubmit(event);
    });
  }
}


onProductUpdate(cartItem) {
  if (!cartItem || !cartItem.id) {
    if (document.body.classList.contains('is-modal-open')) {
      const modalBody = document.querySelector('.modal__body');
      let infoPrice = null;

      if (modalBody) {
        infoPrice = modalBody.querySelector('.cart-buttons__info-price');
      }

      if (infoPrice) {
        infoPrice.textContent = `€${this.getTotalPrice().toFixed(2)}`;
      }
    }

   
    if (this.isEmpty() && this.modal) {
      this.modal.close();
      this.modal = null;
    }

    this.cartIcon.update(this);
    return;
  }

  
  if (document.body.classList.contains('is-modal-open')) {
    const productId = cartItem.id;
    const modalBody = document.querySelector('.modal__body');

    let productCount = null;
    let productPrice = null;

    if (modalBody) {
      productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
      productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
    }

    const infoPrice = document.querySelector('.cart-buttons__info-price');

    if (productPrice) {
      productPrice.textContent = `€${(cartItem.price * cartItem.count).toFixed(2)}`;
    }
    if (infoPrice) {
      infoPrice.textContent = `€${this.getTotalPrice().toFixed(2)}`;
    }
    if (productCount) {
      productCount.textContent = cartItem.count;
    }
  }

  this.cartIcon.update(this);
}


  

onSubmit(event) {
    event.preventDefault();
    let submitButton = document.querySelector('[type="submit"]');
    submitButton.classList.add('is-loading');
    let form = document.querySelector('.cart-form')

    fetch('https://httpbin.org/post', {
      method: "POST",
      body: new FormData(form)
    }).then((response) => {
      if (response.ok) {
        this.modal.setTitle('Success!');
        this.cartItems = [];
        this.cartIcon.update(this);
        this.modal.setBody(createElement(`
          <div class="modal__body-inner">
            <p>
              Order successful! Your order is being cooked :) <br>
              We’ll notify you about delivery time shortly.<br>
              <img src="/assets/images/delivery.gif">
            </p>
          </div>
        `));
      };})
  };

  

  


  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }

}



