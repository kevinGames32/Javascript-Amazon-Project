import renderOrderSummary from "./checkout/orderSummary.js";
import renderPaymentSummary from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";
import { loadCart } from "../data/cart.js";
//import '../data/cart-oop.js'
//import '../data/backendPractice.js'

async function loadPage() {
    try{
        await Promise.all([loadProducts(),loadCart()])
    } catch (error) {
        console.log('Unexpected Error, try again later...')
    }
    
    renderOrderSummary();
    renderPaymentSummary();
}
loadPage();


/* promises and request practice
function makeRequest(){
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load',()=>{
        console.log(xhr.response)
    });
    xhr.open('GET', 'https://supersimplebackend.dev/greeting');
    xhr.send();
}
makeRequest();

function makeRequestFetch(){
    fetch('https://supersimplebackend.dev/greeting').then((response)=>{
        response.text().then((data)=>{
            console.log(data)
        })
    });
}
makeRequestFetch();

async function makeRequestFetchAsync(){
    const response = await fetch('https://supersimplebackend.dev/greeting');
    const data = await response.text();
    console.log(data)
};
makeRequestFetchAsync();
*/
/*
async function makeRequestFetch(){
    try{
        const response = await fetch('https://supersimplebackend.dev/greeting',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        }
    });

    if(response.status >= 400){
        throw response;
    }

    const data = await response.text();
    console.log(data) 
    } catch (error) {
        if(error.status === 400){
            const data = await error.json();
            console.log(data)
        
        }else{
            console.log("network error")
        }
    }
}
makeRequestFetch();
*/

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