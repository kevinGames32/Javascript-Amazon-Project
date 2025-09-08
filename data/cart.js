export const cart =[];
export function addToCart(productId, currentSelect){
      let seen = false;
        cart.forEach((item)=>{
            if(productId === item.productId){
              //instead of adding +1 on every click, make sure to take into account the
              //number of items selected on the options list  
                item.quantity+=parseInt(currentSelect.value);
                seen = true;
            }
        })

        //push item to the cart
        if (!seen){
            let quantity = parseInt(currentSelect.value);
            cart.push({productId, quantity})
        }
        console.log(cart)
    }
    
//reduce the cart array to summ all of the quantity items and set said sum to the cart div inner text
//used after every 'add to cart' button press
export const updateCartCount = (cart)=>{
  let totalItems = cart.reduce((total, product)=>{
    return total + product.quantity;
  }, 0);
  const carDiv = document.querySelector('.js-cart-qty');
  carDiv.textContent = totalItems;
}