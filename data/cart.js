export let cart = JSON.parse(localStorage.getItem('cart') || "[]");


export function saveToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart));
    
}

export function addToCart(id, image, priceCents, name, currentSelect){
      let seen = false;
        cart.forEach((item)=>{
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
            cart.push({id,image,priceCents,name, quantity, deliveryOption})
        }
        console.log(cart)
        saveToStorage();
    }
    
//reduce the cart array to summ all of the quantity items and set said sum to the cart div inner text
//used after every 'add to cart' button press
export const updateCartCount = ()=>{
  let totalItems = cart.reduce((total, product)=>{
    return total + product.quantity;
  }, 0);
  const carDiv = document.querySelector('.js-cart-qty');
  carDiv.textContent = totalItems;
}

export function removeFromCart(id){
    const newCart=[];
    cart.forEach((cartItem)=>{
        if(cartItem.id !== id){
            newCart.push(cartItem)
        }
    })
    cart = newCart;
    updateCheckoutHeader();
}
export function updateCheckoutHeader(){
    let itemQuantity = cart.reduce((total, cartItem)=>{
        return total+cartItem.quantity;
    }, 0);
    document.querySelector('.js-return-home').innerHTML= itemQuantity || "0";
    saveToStorage();
}

export function updateQuantity(productId, quantity){
    cart.forEach((cartItem)=>{
        if((cartItem.id === productId) && quantity !== 0){
            cartItem.quantity = quantity
        } else if(quantity == 0){
            removeFromCart(productId);
        }
    });
    updateCheckoutHeader();
    saveToStorage();
}


//take a product id and a new optionid and update the cart item 
export function updateDeliveryOption(productId, newOptionId){
    cart.forEach((cartItem)=>{
        if(cartItem.id === productId){
            cartItem.deliveryOption = newOptionId;
            saveToStorage();
        }
    });
}