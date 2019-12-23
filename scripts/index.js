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

shop.getOffer();