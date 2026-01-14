export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    
    if (!product) {
      return;
    } 
    
    
    
    let product1 = this.cartItems.find(item  => item.product.id === product.id)
    if (product1) {

      product1.count += 1;
      this.onProductUpdate(this.cartItems);

    } else {

      const newCartItem = {product , count: 1}

      this.cartItems.push(newCartItem)

      this.onProductUpdate(product1);

    }
    
  }

  updateProductCount(productId, amount) {

    let product1 = this.cartItems.find(item  => item.product.id === productId)

    product1.count += amount;

    if (product1.count <= 0) { 

      this.cartItems = this.cartItems.filter(item => item.product.id !==productId );

    }

    this.onProductUpdate(product1);
    
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    let count1 = 0

    for (let i = 0; i < this.cartItems.length; i++) {

      count1 += this.cartItems[i].count

    }
    return count1
    
  }

  getTotalPrice() {
    return this.cartItems.reduce((totalPrice, item) => totalPrice + item.product.price * item.count, 0)
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

