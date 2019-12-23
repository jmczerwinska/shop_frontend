import Api from './api.js';
import Offer from  './offer.js';
import Cart from './cart.js';

class Shop {
    constructor(){
        this.api = new Api();
        this.offer = new Offer();
        this.cart = new Cart();    
    }

    getOffer (data) {
       this.api.getAll().then(res => this.offer.showOffer(res));
    }
}


const shop = new Shop();

// document.addEventListener("DOMContentLoaded", function() {
//     shop.showCartBtn.addEventListener('click', () => shop.cart.style.display = 'block');
//     shop.closeCartBatts.addEventListener('click', () => shop.cart.style.display = 'none');
//     shop.buyBttn.addEventListener('click', shop.handleBuyBttn.bind(shop));
// });

shop.getOffer();