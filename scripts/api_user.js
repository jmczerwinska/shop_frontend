import Api from './api.js'

class ApiUser extends Api {
    constructor() {
        super()
        this.authUrl = 'http://localhost:3000/api/auth/';
    }

    createUser(data){
        const path = this.url + 'create';
        return fetch(path, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(this._handleResponse)
        .then(() => alert('Konto zostało utworzone'))
        .catch((e) => this._handleError(e));
    }

    log
}

export default ApiUser;