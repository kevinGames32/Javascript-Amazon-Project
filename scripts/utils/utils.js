export default function calculateDollars({priceCents = 100, places = 2 }={}){
    return (Math.round(priceCents)/100).toFixed(places);
}