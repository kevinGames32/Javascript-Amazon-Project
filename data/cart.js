import { products } from "./products.js";
export let cart = JSON.parse(localStorage.getItem('cart') || "[]");


export function saveToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart));
    
}
export function getMatchingObject(id){
    let matchingObj;
        products.forEach((object)=>{
            if(object.id == id){
                matchingObj = object
            }
        })
        return matchingObj;
    };
export function addToCart(id, currentSelect){
      let seen = false;
      let matchingItem = getMatchingObject(id);
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
            matchingItem.deliveryOption =deliveryOption;
            matchingItem.quantity =quantity
            cart.push(matchingItem)
        
        }
        console.log(cart)
        saveToStorage();
    }
    
//reduce the cart array to summ all of the quantity items and set said sum to the cart div inner text
//used after every 'add to cart' button press
export const updateCartCount = ()=>{
  let totalItems = cart.reduce((total, cartItem)=>{
    return total + cartItem.quantity;
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
    saveToStorage();
}
export function updateCheckoutHeader(){
    let itemQuantity = cart.reduce((total, cartItem)=>{
        return total+cartItem.quantity;
    }, 0);
    document.querySelector('.js-return-home').innerHTML= itemQuantity || "0";
    
}

export function updateQuantity(productId, quantity){
    cart.forEach((cartItem)=>{
        if((cartItem.id === productId) && quantity !== 0){
            cartItem.quantity = quantity
        } else if(quantity === 0){
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
export function loadCart(func){
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', ()=>{
        console.log(xhr.response);
        func()
    });
    xhr.open('GET', 'https://supersimplebackend.dev/cart');
    xhr.send();
};
export function convertToRequestSchema(){
    let requestCart=[];
      cart.forEach((cartItem)=>{
        const productId = cartItem.id;
        const quantity = cartItem.quantity;
        const deliveryOptionId = cartItem.deliveryOption;
        requestCart.push({productId: productId,quantity:quantity,deliveryOptionId:deliveryOptionId})
      });
    return requestCart;
}