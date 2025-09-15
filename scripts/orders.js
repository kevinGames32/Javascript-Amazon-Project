import { orders } from "../data/orders.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { getMatchingObject } from "../data/cart.js";
import calculateDollars from "./utils/utils.js";
import { loadProducts } from "../data/products.js";
import { addToCart } from "../data/cart.js";
import { updateCartCount } from "../data/cart.js";
import { cart } from "../data/cart.js";
async function loadPage(){
    await loadProducts();
    updateCartCountOrders();

    let finalHtml='';
    const ordersContrainer = document.querySelector('.js-orders-grid');
    orders.forEach(order => {
        const orderTimeString = dayjs(order.orderTime).format('MMMM D');
        finalHtml+=`
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${orderTimeString}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${calculateDollars({priceCents:order.totalCostCents})}</div>
            </div>
          </div>
          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>
        <div class="order-details-grid">
          ${productList(order)}
        </div>
      </div>
    `;
    });

    function productList(order){
        let productList = order.products;
        console.log(productList)
        let finalHtml =''
        let productObject;
        productList.forEach((item)=>{
        productObject = getMatchingObject(item.productId)
        finalHtml += `
        <div class="product-image-container">
          <img src="${productObject.image}">
        </div>
        <div class="product-details">
          <div class="product-name">
            ${productObject.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${
              dayjs(item.estimatedDeliveryTime).format('MMMM D')
            }
          </div>
          <div class="product-quantity">
            Quantity: ${item.quantity}
          </div>
          <button class="buy-again-button button-primary js-buy-it-again" data-product-id="${item.productId}">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>
        <div class="product-actions">
          <a href="tracking.html?orderId=${order.id}&productId=${item.productId}">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      `;
        })
        return finalHtml;
    
    }
    ordersContrainer.innerHTML = finalHtml;
    document.querySelectorAll('.js-buy-it-again').forEach((button)=>{
        button.addEventListener('click', ()=>{
            addToCart(button.dataset.productId, {value:1});
            button.innerHTML = 'Added'
            updateCartCountOrders();
            
        })
    });
    
}
function updateCartCountOrders(){
    document.querySelector('.js-cart-qty').textContent = cart.reduce((total, element)=>{
        return total + element.quantity
    }, 0);
}
loadPage();
