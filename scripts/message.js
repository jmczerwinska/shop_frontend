class Message {
    constructor () {
        this.message = document.createElement('div');
        this.message.className = 'modal';
    }

    show (text) {
        this._addMessage(text);
        this. _addCloseBtn();
        document.documentElement.appendChild(this.modal);
    }

    _addMessage (text) {
        const messPar = document.createElement('p');
        messPar.className = 'message';
        messPar.textContent = text;
        this.modal.appendChild(messPar);
    }

    _addCloseBtn () {
        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'Zamknij';
        closeBtn.addEventListener('click', this.message.remove());
    }
}

export default MessageChannel;