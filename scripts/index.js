import Api from './api.js';
import Offer from  './offer.js';
import Cart from './cart.js';

class Shop {
    constructor(){
        this.api = new Api();
        this.offer = new Offer();
        this.cart = new Cart();    
    }

    getOffer () {
       this.api.getAll().then(res => this.offer.showOffer(res));
    }
}


const shop = new Shop();

document.addEventListener("DOMContentLoaded", function() {
    shop.cart.showCartBtn.addEventListener('click', () => shop.cart.cart.style.display = 'block');
    shop.cart.closeCartBtn.addEventListener('click', () => shop.cart.cart.style.display = 'none');
    // shop.buyBttn.addEventListener('click', shop.handleBuyBttn.bind(shop));
});

shop.getOffer();