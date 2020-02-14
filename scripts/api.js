class Api {
    constructor() {
        this.url = 'http://localhost:3000/api/db/';
    }
    
    _handleResponse(response) {
        if (response.status >= 400) {
            throw response.status;
        }
        return response.json();
    }
    
    _handleError(error) {
        console.log('Error: ' + error);
        switch (error) {
            case 400:
                alert(`Błąd ${error} - Twoje zapytanie nie obejmuje wszystkich wymaganych parametrów.`);
                break;
            case 401:
                alert(`Błąd ${error} -  Brak autoryzacji. Zaloguj się do sklepu.`);
                break;
            case 403:
                alert(`Błąd ${error} - Nie masz uprawnień do modyfikowania zawartości magazynu.`);
                break;
            case 404:
                alert(`Błąd ${error} - W magazynie nie ma produktu o podanym id.`);
                break;
            case 409:
                alert(`Błąd ${error} - Nie można dodać produktu. W magazynie istnieje już produkt o takim samym id.`);
                break;
        }
    }
     
    _post(data) {
        const url = this.url;
        return fetch(url, {
                method: 'POST',
                body: data,
            }).then(this._handleResponse);
    }

    _put(path, data) {
        const url = this.url + path;
        return fetch(url, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(this._handleResponse);
    }

    _get(path) {
        const url = this.url + path;
        return fetch(url, {
            method: 'GET'
        }).then(this._handleResponse);
    }
    
    _delete(path) {
        const url = this.url + path;
        return fetch(url, {
            method: 'DELETE'
        }).then(this._handleResponse);
    }

    addProduct(data) {
        return this._post(data)
            .then(() => alert('Dodano nowy produkt do magazynu.'))
            .catch((e) => this._handleError(e));
    }

    getProduct(id) {
        return this._get(id)
            .catch((e) => this._handleError(e));
    }
    
    getAll() {
        return this._get('')
            .catch((e) => this._handleError(e));
    }
    
    deleteProduct(id) {
        return this._delete(id)
            .then(() => alert('Usunięto produkt z magazynu.'))
            .catch((e) => this._handleError(e));
    }
    
    updateProduct(id, data) {
        console.log(data)
        return this._put(id, data)
            .then(() => alert('Produkt został zmieniony.'))
            .catch((e) => this._handleError(e));
    }
    
    _buyProduct(id, count) {
        const path = id + '/buy';
        return this._put(path, count)
            .catch((e) => this._handleError(e));
    }
    
    buyAllProducts(productsDataArr) {
        const promiseArr = [];
        for (let i=0; i<productsDataArr.length; i++) {
            const buyOne = this._buyProduct(productsDataArr[i].id, {"count": productsDataArr[i].count});
            promiseArr.push(buyOne);
        }
        Promise.all(promiseArr).then(() => alert('Dziękujemy za dokonanie zakupów w naszym sklepie!'));
    }
}


export default Api;
