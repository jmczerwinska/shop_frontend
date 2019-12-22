class Api {
    constructor(){
        this.url = 'http://localhost:3000/db/make-up-magic/';
        this.headers = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });
    }
    
    _handleResponse (response, message) {
        if (response.status >= 400) {
            throw response.status;
        }
        return response.json()
            .catch(this._handleError.bind(this));
    }

    _handleError (error) {
        console.log('Error: ' + error);
        switch (error) {
            case 400:
                alert(error + ' - Twoje zapytanie nie obejmuje wszystkich wymaganych parametrów.');
                break;
            case 401:
                alert(error + ' -  Brak autoryzacji. Zaloguj się do sklepu.');
                break;
            case 403:
                alert(error  + ' - Nie masz uprawnień do modyfikowania zawartości magazynu.');
                break;
            case 404:
                alert(error + ' - W magazynie nie ma produktu o podanym id.');
                break;
            case 409:
                    alert(error + ' - Nie można dodać produktu. W magazynie istnieje już produkt o takim samym id.');
                    break;
        }
    }


     
    _post (path, data) {
        const url = this.url + path;
        return fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: this.headers
            }).then(this._handleResponse);
    }

    _put (path, data) {
        const url = this.url + path;
        return fetch(url, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: this.headers
        }).then(this._handleResponse);
    }

    _get (path) {
        const url = this.url + path;
        return fetch(url, {
            method: 'GET'
        }).then(this._handleResponse);
    }
    
    _delete (path) {
        const url = this.url + path;
        return fetch(url, {
            method: 'DELETE'
        }).then(this._handleResponse);
    }

    addProduct  (id, data) {
        return this._post(id, data)
    }

    getProduct (id) {
        return this._get(id);
    }
    
    getAll () {
        return this._get('');
    }
    
    deleteProduct (id) {
        return this._delete(id);
    }
    
    updateProduct (id, data) {
        return this._put(id, data);
    }
    
    buyProduct (id, count) {
        const path = id + '/buy';
        return this._put(path, count);
    }
}


export default Api;