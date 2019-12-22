import Api from './api';

class Shop {
    
    


}

class Offer {
    offer = document.querySelector('.offer');

    getProperty (data, property){
        const itemProperty = document.createElement('div');
        itemProperty.textContent = data['data'][property]
    }
}


class Cart {
    cart = document.querySelector('.cart');
    showCartBttn = document.querySelector('#show-cart');
    closeCartBttn = document.querySelector('#close-cart');
    buyBttn = document.querySelector('#buy-bttn');
    cartTableBd = document.querySelector('.cart-table-body');
    emptyCart = document.querySelector('.empty-cart');
    fullCart = document.querySelector('.full-cart');
}

const api = new Api();
const shop = new Shop();

api.getAll().then(resp => shop.viewOffer(resp));

document.addEventListener("DOMContentLoaded", function() {
    shop.showCartBttn.addEventListener('click', () => shop.cart.style.display = 'block');
    shop.closeCartBttn.addEventListener('click', () => shop.cart.style.display = 'none');
    shop.buyBttn.addEventListener('click', shop.handleBuyBttn.bind(shop));
});