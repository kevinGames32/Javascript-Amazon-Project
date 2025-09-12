import renderOrderSummary from "./checkout/orderSummary.js";
import renderPaymentSummary from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";
import { loadCart } from "../data/cart.js";
//import '../data/cart-oop.js'
//import '../data/backendPractice.js'
Promise.all([
    new Promise((resolve)=>{
        loadProducts(()=>{
            resolve();
    });
}), 
new Promise((resolve)=>{
    loadCart(()=>{
        resolve('val');
    });
})
]).then((values)=>{
    console.log(values)
    renderOrderSummary();
    renderPaymentSummary();
});