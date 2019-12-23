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

    _handleAddToCart (id) {
        this.createRow(id);
        alert("Dodano produkt do koszyka.");
        this.emptyCart.style.display = 'none';
        this.fullCart.style.display = 'block';
    }

    createRow (id) {
        const row = document.createElement('tr');
        row.className = 'cart-row';
        row.id = id;
        this.createCells(id, row);
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
        const price = document.querySelector(`#price${CSS.escape(id)}`).innerHTML;
        const count = document.querySelector(`#count${CSS.escape(id)}`).value;
        switch (cell.className) {
            case 'cell-name':
                return cell.textContent = document.querySelector('[data-prod-id= name'+CSS.escape(id)+']').innerHTML;
            case 'cell-count':
                return cell.textContent = count;
            case 'cell-price':
                return cell.textContent= price*count + ' zł';
            case 'cell-delete':
                return cell.textContent = '&times';
        }
        
    }

}

export default Cart;