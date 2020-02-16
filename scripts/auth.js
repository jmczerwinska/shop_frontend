import ApiUser from './api_user.js';

class Authentication {
    constructor(){
        this.apiUser = new ApiUser;

        this.signLogin = document.getElementById('sign-login');
        this.signEmail = document.getElementById('sign-email');
        this.signPassword = document.getElementById('sign-pass');
        this.signBtn = document.getElementById('sign-button');

        this.logLogin = document.getElementById('log-login');
        this.logPassword = document.getElementById('log-pass');
        this.logBtn = document.getElementById('log-button');

        this.logBtn.addEventListener('click', this._handleLog.bind(this));
        this.signBtn.addEventListener('click', this._handleCreate.bind(this)    );
    }

    _handleCreate() {
        const data = {
            login: this.signLogin.value,
            email: this.signEmail.value,
            password: this.signPassword.value
        }
        console.log(data);
        this.apiUser.createUser(data);
    }

    _handleLog() {
        const data = {
            login: this.logLogin.value,
            password: this.logPassword.value
        }
        console.log(data);
        this.apiUser.logUser(data);
    }
}

const authentication = new Authentication();