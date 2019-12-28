import Api from './api.js';
import Message from './message.js';

class Storage {
    constructor() {
        this.storageTbBd = document.querySelector('.storage-table-body');
        this.api = new Api();
    }

    viewStorage() {

    }
}

class NewProduct extends Storage {
    constructor() {
        super();
    
        this.addId = document.getElementById('add-id');
        this.addName = document.getElementById('add-name');
        this.addDescription = document.getElementById('add-descript');
        this.addPrice = document.getElementById('add-price');
        this.addCount = document.getElementById('add-count');
        this.addInputs = [this.addId, this.addName, this.addDescription, this.addPrice, this.addCount];
        
        this.addBtn = document.getElementById('add-btn');

        for (let i = 0; i < this.addInputs.length; i++) {
            this.addInputs[i].addEventListener('change', this._checkAddInputs.bind(this));
        }
        this.addBtn.addEventListener('click', this._handleAdd.bind(this));
    }

    _checkAddInputs() {
        this.addBtn.disabled = !(this.addInputs.every(el => el !== ''));
    }

    _handleAdd() {
        const id = this.addId.value;
        const data = {
            "name": this.addName.value,
            "description": this.addDescription.value,
            "price": this.addPrice.value,
            "count": this.addCount.value
        }

        this.api.addProduct(id, data);
       
        new Message('Dodano nowy produkt do magazynu.')
        this.addInputs.forEach(el => el.value = '');
        this.addBtn.disabled = true;
        this.viewStorage();
    }
}

class UpdateProduct extends Storage {
    constructor() {
        super();

        this.updateId = document.getElementById('update-id');
        this.updateName = document.getElementById('update-name');
        this.updateDescription = document.getElementById('update-descript');
        this.updatePrice = document.getElementById('update-price');
        this.updateCount = document.getElementById('update-count');
        this.updateInputs = [this.updateId, this.updateName, this.updateDescription, this.updatePrice, this.updateCount];

        this.updateBtn = document.getElementById('update-btn');

        for (let i = 0; i < this.updateInputs.length; i++) {
            this.updateInputs[i].addEventListener('change', this._checkUpdateInputs.bind(this));
        }
        this.updateBtn.addEventListener('click', this._handleChange.bind(this));
    }

    _checkUpdateInputs() {
        this.updateBtn.disabled = this.updateInputs.every(el => el === '');
    }

    _handleChange () {
        const id = this.updateId.value;
        const data = {
            "name": this.updateName.value,
            "description": this.updateDescription.value,
            "price": this.updatePrice.value,
            "count": this.updateCount.value
        }

        this.api.updateProduct(id, data);

        new Message('Produkt został zmieniony.');
        this.updateInputs.forEach(el=> el.value = '');
        this.updateBtn.disabled = true;
        this.viewStorage();
    }

    _clearSection() {
        ;
    }    
}

class DeleteProduct extends Storage {
    constructor() {
        super();

        this.deleteId = document.getElementById('delete-id');
        this.deleteBtn = document.getElementById('delete-btn');
        
        this.deleteId.addEventListener('input', this._checkDeleteInput.bind(this));
        this.deleteBtn.addEventListener('click', this._handleDelete.bind(this));
    }
    
    _checkDeleteInput() {
        this.deleteBtn.disabled = !(this.deleteId !== '');
    } 

    _handleDelete() {
        const id = this.deleteId.value;
        
        this.api.deleteProduct(id);
        
        new Message('Usunięto produkt z magazynu.');
        this.deleteId.value = '';
        this.deleteBtn.disabled = true;
        // this.viewStorage();
    }
}

const storage = new Storage();
new DeleteProduct();
new NewProduct();
new UpdateProduct();