class Cart {
    constructor() {
        this.cart = document.querySelector('.cart');
        this.showCartBtn = document.querySelector('#show-cart');
        this.closeCartBtn = document.querySelector('#close-cart');
        this.buyBtn = document.querySelector('#buy-bttn');
        this.cartTableBd = document.querySelector('.cart-table-body');
        this.emptyCart = document.querySelector('.empty-cart');
        this.fullCart = document.querySelector('.full-cart');
    }

// document.addEventListener("DOMContentLoaded", function() {
//     shop.showCartBttn.addEventListener('click', () => shop.cart.style.display = 'block');
//     shop.closeCartBttn.addEventListener('click', () => shop.cart.style.display = 'none');
//     shop.buyBttn.addEventListener('click', shop.handleBuyBttn.bind(shop));
// });
}

export default Cart;