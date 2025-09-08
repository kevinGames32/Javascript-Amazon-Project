
import {cart, removeFromCart, saveToStorage, updateCheckoutHeader, updateQuantity} from '../data/cart.js';
import { calculateDollars } from './utils/utils.js';


let checkoutHtml='';
cart.forEach((cartItem)=>{
    const itemId = cartItem.id;
    const itemImg = cartItem.image;
    const itemName = cartItem.name;
    const itemPrice = calculateDollars(cartItem.priceCents);
    const itemQuantity = cartItem.quantity;

    document.querySelector('.js-order-summary').innerHTML =
    checkoutHtml+=`<div class="cart-item-container js-${itemId}-container">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${itemImg}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${itemName}
                </div>
                <div class="product-price">
                    $${itemPrice}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label${itemId}">${itemQuantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update" data-product-id="${itemId}">
                    Update
                  </span>
                  <input class="quantity-input js-quantity-input${itemId}"></input>
                  <span class="save-quantity-link link-primary" data-product-id="${itemId}">save</span>
                  <span class="delete-quantity-link link-primary js-delete" data-product-id="${itemId}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${itemId}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${itemId}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${itemId}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> `;
});
updateCheckoutHeader();

function deleteItemContainer(currentId){
    document.querySelector(`.js-${currentId}-container`).remove();
};

document.querySelectorAll('.js-delete').forEach((link)=>{
    link.addEventListener('click',()=>{
        const currentId = link.dataset.productId;
        removeFromCart(currentId);
        deleteItemContainer(currentId);
        updateCheckoutHeader();
        saveToStorage();
    })
});


//todo, implement the update quantity part
document.querySelectorAll('.js-update')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;

      const container = document.querySelector(
        `.js-${productId}-container`
      );
      container.classList.add('is-editing-quantity');
    });
  });


  document.querySelectorAll('.save-quantity-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
        
      const productId = link.dataset.productId;
      const newQuantity = Number(document.querySelector(`.js-quantity-input${productId}`).value);
      updateQuantity(productId, newQuantity);

      const container = document.querySelector(
        `.js-${productId}-container`
      );
      container.classList.remove('is-editing-quantity');
      const quantityLabel = document.querySelector(`.js-quantity-label${productId}`);
      quantityLabel.innerHTML = newQuantity;
    });
    
    

  });
