export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order){
    orders.unshift(order);
    saveToStorage();
}

function saveToStorage(){
    localStorage.setItem('orders', JSON.stringify(orders));
}

export function getOrder(orderId){
    let matchingItem;
    orders.forEach(element => {
        if(element.id === orderId){
            matchingItem = element;
        }
    });
    return matchingItem;
}