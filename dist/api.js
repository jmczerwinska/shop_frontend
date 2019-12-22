"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Api =
/*#__PURE__*/
function () {
  function Api() {
    _classCallCheck(this, Api);

    this.url = 'http://localhost:3000/db/make-up-magic/';
    this.headers = new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
  }

  _createClass(Api, [{
    key: "_handleResponse",
    value: function _handleResponse(response, message) {
      if (response.status >= 400) {
        throw response.status;
      }

      return response.json()["catch"](this._handleError.bind(this));
    }
  }, {
    key: "_handleError",
    value: function _handleError(error) {
      console.log('Error: ' + error);

      switch (error) {
        case 400:
          alert(error + ' - Twoje zapytanie nie obejmuje wszystkich wymaganych parametrów.');
          break;

        case 401:
          alert(error + ' -  Brak autoryzacji. Zaloguj się do sklepu.');
          break;

        case 403:
          alert(error + ' - Nie masz uprawnień do modyfikowania zawartości magazynu.');
          break;

        case 404:
          alert(error + ' - W magazynie nie ma produktu o podanym id.');
          break;

        case 409:
          alert(error + ' - Nie można dodać produktu. W magazynie istnieje już produkt o takim samym id.');
          break;
      }
    }
  }, {
    key: "_post",
    value: function _post(path, data) {
      var url = this.url + path;
      return fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: this.headers
      }).then(this._handleResponse);
    }
  }, {
    key: "_put",
    value: function _put(path, data) {
      var url = this.url + path;
      return fetch(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: this.headers
      }).then(this._handleResponse);
    }
  }, {
    key: "_get",
    value: function _get(path) {
      var url = this.url + path;
      return fetch(url, {
        method: 'GET'
      }).then(this._handleResponse);
    }
  }, {
    key: "_delete",
    value: function _delete(path) {
      var url = this.url + path;
      return fetch(url, {
        method: 'DELETE'
      }).then(this._handleResponse);
    }
  }, {
    key: "addProduct",
    value: function addProduct(id, data) {
      return this._post(id, data);
    }
  }, {
    key: "getProduct",
    value: function getProduct(id) {
      return this._get(id);
    }
  }, {
    key: "getAll",
    value: function getAll() {
      return this._get('');
    }
  }, {
    key: "deleteProduct",
    value: function deleteProduct(id) {
      return this._delete(id);
    }
  }, {
    key: "updateProduct",
    value: function updateProduct(id, data) {
      return this._put(id, data);
    }
  }, {
    key: "buyProduct",
    value: function buyProduct(id, count) {
      var path = id + '/buy';
      return this._put(path, count);
    }
  }]);

  return Api;
}();

var _default = Api;
exports["default"] = _default;