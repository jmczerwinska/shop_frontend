import Api from './api.js';

class Storage {
    constructor() {
        this.storageTbBd = document.querySelector('.storage-table-body');
        this.api = new Api();
    }

    _createTbBd(allData) {
        for (let i = 0; i < allData.length; i++) {
            const id = allData[i]._id;
            const data = allData[i].data;
            this._createRow(id, data);
        }
    }

    _createRow(id, data) {
        const row = document.createElement('tr');
        row.className = 'row';
        row.id = 'row' + id;

        this._createPropCells(id, data, row);
        this._addUpdateBtn(id, row);
        this._addDeleteBtn(id, row);
        this.storageTbBd.appendChild(row);
    }

    _createPropCells(id, data, parent) {
        const cellNames = ['id', 'name', 'description', 'count', 'price'];

        for (let i = 0; i < cellNames.length; i++) {
            const cell = document.createElement('td');
            cell.className = 'cell-' + cellNames[i];
            cell.id = cellNames[i] + id;
            cell.textContent = this._addDataToCell(cell, data, id);
            parent.appendChild(cell);
        }
    }

    _addDataToCell(cell, data, id) {
        const { name, description, count, price } = data;

        switch (cell.className) {
            case 'cell-id':
                return cell.textContent = id;
            case 'cell-name':
                return cell.textContent = name;
            case 'cell-description':
                return cell.textContent = description;
            case 'cell-count':
                return cell.textContent = count;
            case 'cell-price':
                return cell.textContent = price;
        }

    }

    _addDeleteBtn(id, parent) {
        const delBtn = document.createElement('button');
        delBtn.className = 't-btn';
        delBtn.dataset.btnId = id;
        delBtn.textContent = 'Usuń';
        delBtn.addEventListener('click', this._handleDeleteTb.bind(this));
        parent.appendChild(delBtn);
    }

    _handleDeleteTb(e) {
        const id = e.target.dataset.btnId;
        this.api.deleteProduct(id);
        
    }

    _addUpdateBtn(id, parent) {
        const upBtn = document.createElement('button');
        upBtn.className = 't-btn';
        upBtn.dataset.btnId = id;
        upBtn.textContent = 'Aktualizuj';
        upBtn.addEventListener('click', this._handleUpdateTb.bind(this));
        parent.appendChild(upBtn);
    }

    _handleUpdateTb() {
    
    }

    showStorage() {
        this.api.getAll().then((res) => this._createTbBd(res));
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

        this.addInputs.forEach(el => el.value = '');
        this.addBtn.disabled = true;
        // this._createRow(id,data);
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

    _handleChange() {
        const id = this.updateId.value;
        const data = {
            "name": this.updateName.value,
            "description": this.updateDescription.value,
            "price": this.updatePrice.value,
            "count": this.updateCount.value
        }

        this.api.updateProduct(id, data);  

        this.updateInputs.forEach(el => el.value = '');
        this.updateBtn.disabled = true;
        
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

        this.deleteId.value = '';
        this.deleteBtn.disabled = true;
        
    }
}

const storage = new Storage();
new DeleteProduct();
new NewProduct();
new UpdateProduct();


storage.showStorage();