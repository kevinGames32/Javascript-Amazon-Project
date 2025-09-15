import { deliveryOptions } from '../../data/deliveryOptions.js'
import {cart, convertToRequestSchema} from '../../data/cart.js';
import calculateDollars from '../../scripts/utils/utils.js';
import { addOrder } from '../../data/orders.js';


export default function renderPaymentSummary(){
    let currentBulkItemPrice = calculateBulkitemPrice();
    let currentShippingTotal = getShippingTotal();
    let totalBeforeTax = currentBulkItemPrice + currentShippingTotal; 
    let taxCents = (totalBeforeTax) * 0.1;
    let grandTotal = taxCents + totalBeforeTax;
    let finalHtml = `
    <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div class="js-order-summary-item-count"></div>
            <div class="payment-summary-money">$${calculateDollars({priceCents:currentBulkItemPrice})}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${calculateDollars({priceCents:currentShippingTotal})}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${calculateDollars({priceCents:totalBeforeTax})}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${calculateDollars({priceCents:taxCents})}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${calculateDollars({priceCents:grandTotal})}</div>
          </div>

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>
    `;
    document.querySelector('.js-payment-summary').innerHTML = finalHtml;
    const summaryItemCount = document.querySelector('.js-order-summary-item-count');
    summaryItemCount.textContent = `items (${String(document.querySelector('.js-return-home').textContent)}):`;



    document.querySelector('.js-place-order').addEventListener('click', async ()=>{
      try{
         let requestCart = convertToRequestSchema();
         const response = await fetch('https://supersimplebackend.dev/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({cart: requestCart})
        })

        const order = await response.json();
        addOrder(order)
      } catch(error){
        console.log('Unexpected error, try again later...')
      }
      window.location.href = 'orders.html'
    });

    
}
function calculateBulkitemPrice(){
  cart
    let bulkItemPrice = cart.reduce((total, cartItem)=>{
        return total + (cartItem.priceCents * cartItem.quantity)
    }, 0);
    return bulkItemPrice;
}

function getShippingTotal(){
    let shippingTotal=0;
    cart.forEach(cartItem => {   
        deliveryOptions.forEach((option)=>{
            if(cartItem.deliveryOption == option.id){
                shippingTotal+=option.priceCents;
            }
        });
    });
    return shippingTotal ? shippingTotal:0;
}

