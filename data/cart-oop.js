class Cart{
    constructor(){
    
    this.cartItems = undefined;
}
    loadFromStorage(){
        this.cartItems = JSON.parse(localStorage.getItem('cart-oop') || "[]")
    }
    saveToStorage(){
    localStorage.setItem('cart-oop', JSON.stringify(this.cartItems));
    }
    addToCart(id, image, priceCents, name, currentSelect){
        let seen = false;
            this.cartItems.forEach((item)=>{
                if(id === item.id){
                //instead of adding +1 on every click, make sure to take into account the
                //number of items selected on the options list  
                    item.quantity+=parseInt(currentSelect.value);
                    seen = true;
                }
            })

            //push item to the cart
            if (!seen){
                let deliveryOption = '1';
                let quantity = parseInt(currentSelect.value);
                cart.cartItems.push({id,image,priceCents,name, quantity, deliveryOption})
            }
            console.log(cart.cartItems)
            this.saveToStorage();
    }
    updateCartCount(){
        let totalItems = this.cartItems.reduce((total, product)=>{
                return total + product.quantity;
            }, 0);
            const cartDiv = document.querySelector('.js-cart-qty');
            cartDiv.textContent = totalItems;
    }
    removeFromCart(id){
        const newCart=[];
        this.cartItems.forEach((cartItem)=>{
            if(cartItem.id !== id){
                newCart.push(cartItem)
            }
        })
        this.cartItems = newCart;
        this.updateCheckoutHeader();
    }
    updateCheckoutHeader(){
        let itemQuantity = this.cartItems.reduce((total, cartItem)=>{
            return total+cartItem.quantity;
        }, 0);
        document.querySelector('.js-return-home').innerHTML= itemQuantity || "0";
        this.saveToStorage();
    }
    updateQuantity(productId, quantity){
        this.cartItems.forEach((cartItem)=>{
            if((cartItem.id === productId) && quantity !== 0){
                cartItem.quantity = quantity
            } else if(quantity == 0){
                this.removeFromCart(productId);
            }
        });
        this.updateCheckoutHeader();
        this.saveToStorage();
    }
    updateDeliveryOption(productId, newOptionId){
        this.forEach((cartItem)=>{
            if(cartItem.id === productId){
                cartItem.deliveryOption = newOptionId;
                this.saveToStorage();
            }
        });
    }   
};
let cart = new Cart();
cart.loadFromStorage();
cart.addToCart('123', 'asd',599,'basket',{"value":1});
console.log(cart)
