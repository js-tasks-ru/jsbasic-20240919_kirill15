export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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
    
    if(cartItem.count === 0) {
      this.cartItems = this.cartItems.filter(item => item.id  !== productId);
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
    let totalCount = 0;
    for (let i = 0; i < this.cartItems.length; i++) { 
      const item = this.cartItems[i];
      totalCount = totalCount + (item.count * item.price);
    }
    return totalCount;
  }
  
     
  

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  } 
}


