import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.container = createElement(`<div class="products-grid">
      <div class="products-grid__inner"></div>
    </div>`);
    this.render();
  }

  render(products = this.products) { 
    const productInner = this.container.querySelector('.products-grid__inner');
    productInner.innerHTML = '';
    for (let i = 0; i < products.length; i++) { 
      const productCard = products[i];
      const productCardInstance = new ProductCard(productCard);
      const productCardElement = productCardInstance.elem;
      productInner.appendChild(productCardElement);
    }
  }

  updateFilter(filters) {
    
    this.filters = { ...this.filters, ...filters };

    
    const filteredProducts = this.products.filter(product => {
      
      if (this.filters.noNuts === true) {
        if (product.nuts === true) {
          return false; 
        }
      }

      
      if (this.filters.vegeterianOnly === true) {
        if (!product.vegeterian) {
          return false; 
        }
      }

      
      if (this.filters.maxSpiciness !== undefined) {
        let spicinessValue = product.spiciness;
        if (spicinessValue === undefined) {
          spicinessValue = 0;
        }
        if (spicinessValue > this.filters.maxSpiciness) {
          return false; 
        }
      }

      
      if (this.filters.category !== undefined && this.filters.category !== '') {
        if (!product.category || product.category !== this.filters.category) {
          return false; 
        }
      }

      
      return true;
    });

    this.render(filteredProducts);
  }

  get elem() { 
    return this.container;
  }
}

  



