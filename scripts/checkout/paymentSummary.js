import { deliveryOptions } from '../../data/deliveryOptions.js'
import {cart, removeFromCart, saveToStorage, updateCheckoutHeader, updateQuantity, updateDeliveryOption} from '../../data/cart.js';
import { calculateDollars } from '../../scripts/utils/utils.js';

export default function renderPaymentSummary(){
    const summaryItemCount = document.querySelector('.js-order-summary-item-count');
    summaryItemCount.textContent = `items (${String(document.querySelector('.js-return-home').textContent)}):`;
    let currentBulkItemPrice = calculateBulkitemPrice();
    let currentShippingTotal = getShippingTotal();
    let totalBeforeTax = currentBulkItemPrice + currentShippingTotal; 
    let taxCents = (totalBeforeTax) * 0.1;
    
}
function calculateBulkitemPrice(){
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

