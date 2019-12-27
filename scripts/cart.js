import Message from './message.js';

class Cart {
    constructor() {
        this.cart = document.querySelector('.cart');
        this.showCartBtn = document.querySelector('#show-cart');
        this.closeCartBtn = document.querySelector('#close-cart');
        this.buyBtn = document.querySelector('#buy-bttn');
        this.cartTableBd = document.querySelector('.cart-table-body');
        this.emptyCart = document.querySelector('.empty-cart');
        this.fullCart = document.querySelector('.full-cart');

        this.message = new Message();
    }

    handleAddToCart (id) {
        this._createRow(id);
        this._getSummaryPrice();
        this.emptyCart.style.display = 'none';
        this.fullCart.style.display = 'block';
        this.message.show("Dodano produkt do koszyka.");
    }

    _createRow (id) {
        const row = document._createElement('tr');
        row.className = 'cart-row';
        row.id = id;
        this._createCells(id, row);
        this.cartTableBd.appendChild(row);
    }

    _createCells (id, parent) {
        const cellNames = ['name', 'count', 'price', 'delete'];

        for (let i=0; i<cellNames.length; i++) {
            const cell = document.createElement('td');
            cell.className = 'cell-' + cellNames[i];
            cell.id = 'cell-' + cellNames[i] + id;
            cell.textContent = this.addDataToCell(cell, id);
            parent.appendChild(cell);
        }
    }

    _addDataToCell = function (cell,id) {
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
            case 'cell-delete':
                return cell.textContent = '&times';
        }
        
    }

    _getSummaryPrice () {
       const sum = document.createElement('span');
       sum.textContent = this.cartTableBd.querySelectorAll('.cell-price').reduce((a, b) => a + b);
       document.getElementById('summary-price').appendChild(sum);
    }

    _collectBuyData (rows){
        let data = [];
        for (let i=0; i<rows.length; i++) {
            const rowId = rows[i].dataset.prodId;
            const count = document.querySelector(`#cell-count${CSS.escape(rowId)}`).innerHTML;
            const prodData = {
                'id': parseInt(rowId),
                'count': parseInt(count)
            }
            data.push(prodData);
        }
        return data;
    }
    
    _handleBuyBttn = function () {
        const rows = this.cartTableBd.children;
        const allData = this._collectBuyData(rows);
        for (let i=0; i<allData.length; i++) {
            api.buyProduct(allData[i].id, {"count": allData[i].count});
        }
        this.message.show('Dziękujemy za dokonanie zakupów w naszym sklepie!');
        this.cartTableBd.querySelectorAll('*').forEach(r => r.remove());
        this.fullCart.style.display = 'none';
        this.emptyCart.style.display = 'block';
    }
}

export default Cart;