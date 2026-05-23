
import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {
  constructor() {}

  async render() {
    const carouselHolder = document.querySelector('[data-carousel-holder]');
    carouselHolder.append(new Carousel(slides).elem);

    
    this.ribbonMenu = new RibbonMenu(categories);
    const ribbonHolder = document.querySelector('[data-ribbon-holder]');
    ribbonHolder.append(this.ribbonMenu.elem);

    
    this.stepSlider = new StepSlider({ steps: 5, value: 3 }); 
    const sliderHolder = document.querySelector('[data-slider-holder]');
    sliderHolder.append(this.stepSlider.elem);

   
    this.cartIcon = new CartIcon();
    const iconHolder = document.querySelector('[data-cart-icon-holder]');
    iconHolder.append(this.cartIcon.elem);
    this.cart = new Cart(this.cartIcon);

    
    const response = await fetch('products.json');
    const data = await response.json();
    this.productsGrid = new ProductsGrid(data);

    
    const gridHolder = document.querySelector('[data-products-grid-holder]');
    gridHolder.innerHTML = '';
    gridHolder.append(this.productsGrid.elem);

    
    this.updateAllFilters();

    
    document.body.addEventListener('product-add', (e) => {
      const product = this.productsGrid.products.find(el => el.id === e.detail);
      if (product) {
        this.cart.addProduct(product);
      }
    });

    document.body.addEventListener('slider-change', (e) => {
      this.productsGrid.updateFilter({ maxSpiciness: e.detail });
    });

    document.body.addEventListener('ribbon-select', (e) => {
      this.productsGrid.updateFilter({ category: e.detail });
    });

    document.body.addEventListener('change', (e) => {
      const target = e.target.closest('.filters__checkbox');
      if (!target) return;

      if (e.target.id === 'nuts-checkbox') {
        this.productsGrid.updateFilter({ noNuts: e.target.checked });
      }

      if (e.target.id === 'vegeterian-checkbox') {
        this.productsGrid.updateFilter({ vegeterianOnly: e.target.checked });
      }
    });
  }

  updateAllFilters() {
    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
    });
  }
}
