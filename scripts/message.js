class Message {
    constructor (text) {
        this.message = document.createElement('div');
        this.message.className = 'modal';
        this._addMessage(text);
        this. _addCloseBtn();
        document.documentElement.appendChild(this.message);
    }

    _addMessage (text) {
        const messPar = document.createElement('p');
        messPar.className = 'message';
        messPar.textContent = text;
        this.message.appendChild(messPar);
    }

    _addCloseBtn () {
        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'Zamknij';
        closeBtn.className = 'close-modal-btn'
        closeBtn.addEventListener('click', () => this.message.remove());
        this.message.appendChild(closeBtn);
    }
}

export default Message;