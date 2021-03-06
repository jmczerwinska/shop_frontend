import Api from './api.js'

class Cart {
    constructor() {
        this.cart = document.querySelector('.cart');
        this.closeCartBtn = document.querySelector('#close-cart');
        this.buyBtn = document.querySelector('#buy-bttn');
        this.cartTableBd = document.querySelector('.cart-table-body');
        this.emptyCart = document.querySelector('.empty-cart');
        this.fullCart = document.querySelector('.full-cart');
        this.cartIcon = document.querySelector('.cart-panel');

        this.cartIcon.addEventListener('click', () => this.cart.classList.add('clicked'));
        this.closeCartBtn.addEventListener('click', () => this.cart.classList.remove('clicked'));
        this.api = new Api();
    }


    addToCart(id) {
        this._createRow(id);
        this._getSummaryPrice();
        this.emptyCart.style.display = 'none';
        this.fullCart.style.display = 'block';
        alert("Dodano produkt do koszyka.");
    }

    _createRow(id) {
        const row = document.createElement('tr');
        row.className = 'cart-row';
        row.id = id;
        this._createCells(id, row);
        this.cartTableBd.appendChild(row);
    }

    _createCells(id, parent) {
        const cellNames = ['name', 'count', 'price'];

        for (let i=0; i<cellNames.length; i++) {
            const cell = document.createElement('td');
            cell.className = 'cell-' + cellNames[i];
            cell.id = 'cart-' + cellNames[i] + id;
            cell.textContent = this._addDataToCell(cell, id);
            parent.appendChild(cell);
        }
    }

    _addDataToCell(cell,id) {
        const price = document.querySelector(`#price${CSS.escape(id)}`).textContent;
        const count = document.querySelector(`#count${CSS.escape(id)}`).value;
        const name = document.querySelector(`#name${CSS.escape(id)}`).textContent;
        
        switch (cell.className) {
            case 'cell-name':
                return cell.textContent = name;
            case 'cell-count':
                return cell.textContent = count;
            case 'cell-price':
                return cell.textContent= price*count + ' zł';
        }
        
    }

    _getSummaryPrice() {
        const sum = document.getElementById('summary-price');
        
        const prices = [];
        this.cartTableBd.querySelectorAll('.cell-price').forEach(n => prices.push(n.textContent));
        const sumPrice = prices.map(n =>parseInt(n)).reduce((a, b) => a + b);
           
        sum.textContent = `Wartość zamówienia: ${sumPrice} zł`;
    }

    _collectBuyData(rows) {
        let data = [];
        for (let i=0; i<rows.length; i++) {
            const rowId = rows[i].id;
            const count = document.querySelector(`#cart-count${CSS.escape(rowId)}`).innerHTML;
            const prodData = {
                'id': rowId,
                'count': parseInt(count)
            }
            data.push(prodData);
        }
        return data;
    }
    
    _handleBuyBtn() {
        const rows = this.cartTableBd.children;
        const allData = this._collectBuyData(rows);
        this.api.buyAllProducts(allData);
        this.cartTableBd.querySelectorAll('*').forEach(r => r.remove());
        this.fullCart.style.display = 'none';
        this.emptyCart.style.display = 'block';
    }

    addEvent() {
        this.buyBtn.addEventListener('click', this._handleBuyBtn.bind(this));
    }
}

export default Cart;