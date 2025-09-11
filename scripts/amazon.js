import {cart, addToCart, updateCartCount} from '../data/cart.js'
import {products} from '../data/products.js'

//use Accumulator pattern to generate the html of every product, looping through the list with forEach(), every loop
//access the object and use its varaibles to fill the html for every product.
let productsHtml='';
updateCartCount();
products.forEach((products)=>{
     productsHtml+=
    `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${products.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${products.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${products.getRatingUrl()}">
            <div class="product-rating-count link-primary">
              ${products.getRatingCount()}
            </div>
          </div>

          <div class="product-price">
            $${products.getPricedollars()}
          </div>

          <div class="product-quantity-container">
            <select class="js-select-${products.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${products.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${products.id}">
            Add to Cart
          </button>
        </div>`;
    document.querySelector('.js-products-grid').innerHTML=productsHtml;
})


//add item to cart list
document.querySelectorAll('.js-add-to-cart').
forEach((buttonElement, currentItemIdx)=>{

    function showAddedMessage(productId){
      const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);
        addedMessage.classList.add('added-to-cart-op1');

        //if there already exists a timeout then reset the timer
        if(addedMessageTimeoutId){
          clearTimeout(addedMessageTimeoutId);
        }
        //set 2 sec timer for the message to show
        const timeoutID = setTimeout(() => {
          addedMessage.classList.remove('added-to-cart-op1');
        }, 2000);

        //set the button's timer variable equal to the current timer created
        addedMessageTimeoutId = timeoutID;
    }
    //new variable for each button, saves the current timer for the added to cart msg
    //if there is one, used later to reset msg timer if the button is clicked multiple times
    let addedMessageTimeoutId;

    buttonElement.addEventListener('click', ()=>{
        let productId = buttonElement.dataset.productId;
        const {id, image, priceCents, name} = products[currentItemIdx];
        //create a reference to the select element of the current button being pressed, used to get the value to add 
        //to the cart
        const currentSelect = document.querySelector(`.js-select-${productId}`);
        addToCart(id, image, priceCents, name, currentSelect);
        updateCartCount();
        showAddedMessage(productId);
    });
    
});


