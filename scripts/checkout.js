import renderOrderSummary from "./checkout/orderSummary.js";
import renderPaymentSummary from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";
import { loadCart } from "../data/cart.js";
//import '../data/cart-oop.js'
//import '../data/backendPractice.js'

async function loadPage() {
    try{
        await loadProducts();
        const value = await new Promise((resolve)=>{
            loadCart(()=>{
                resolve('val1');
            });
        });
        console.log(value);
    } catch (error) {
        console.log('Unexpected Error, try again later...')
    }
    
    renderOrderSummary();
    renderPaymentSummary();
}
loadPage();
/*
Promise.all([loadProducts(),new Promise((resolve)=>{
    loadCart(()=>{
        resolve();
    });
})]).then(()=>{
    renderOrderSummary();
    renderPaymentSummary();
});
*/