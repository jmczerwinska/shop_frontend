import Cart from './cart.js';

class Offer {
    constructor () {
        this.offer = document.querySelector('.offer');
        this.cart = new Cart();
    }

    showOffer (allData) {
        console.log(allData.length)
        for (let i=0; i<allData.length; i++) {
            const id = allData[i].data._id;
            const data = allData[i].data;
            console.log(allData)
            this._createItem(id, data);
        }
    }

    _createItem (id, data) {
        const item = document.createElement('div');
        item.className = "item";
        item.id = 'item-' + id;
            
        const itemPropDiv = this._createItemPropDiv(id, data);
        const addToCartDiv = this._createAddToCartDiv(id, data);
            
        item.appendChild(itemPropDiv);
        item.appendChild(addToCartDiv);
    
        this.offer.appendChild(item);
    }

    _createItemPropDiv(id, data) {
        const itemPropDiv = document.createElement('div');
        itemPropDiv.className = 'item-props';

        const { name, description, price } = data;
        
        this._createPropEl(id, 'name', name, 'h5', itemPropDiv);
        this._createPropEl(id,'description', description, 'p', itemPropDiv);
        this._createPropEl(id, 'price', price, 'p', itemPropDiv);

        return itemPropDiv;
    }
    
    _createPropEl (id, propName, property, child, parent){
        const singleProp = document.createElement(child);
        singleProp.textContent = property;
        singleProp.className = propName;
        singleProp.id = propName + id;
        parent.appendChild(singleProp);
    }

    _createAddToCartDiv (id, data) {
        const addToCartDiv = document.createElement('div');
        addToCartDiv.className = 'add-to-cart';

        if (data.count > 0) {
        this._addCount(id, addToCartDiv);
        this._addCartBtn(addToCartDiv);
        } else {
            const status = document.createElement('p');
            status.textContent = 'produkt chwilowo niedostępny';
            addToCartDiv.appendChild(status);
        }

        return addToCartDiv;
    }

    _addCartBtn (parent) {
        const cartBtn = document.createElement('button');
        cartBtn.className = 'add-cart-btn';
        cartBtn.innerHTML = '<i class="fas fa-cart-plus"></i> Dodaj';
        cartBtn.addEventListener('click', this.cart.handleAddToCart(id).bind(this));
        parent.appendChild(cartBtn);
    }

    _addCount (id, parent) {
        const count = document.createElement('input');
        count.className = 'count';
        count.dataset.prodId = 'count-' + id;
        count.type = 'number';
        count.min = 1;
        count.value = 1;
        parent.appendChild(count);
    }  
}

export default Offer;