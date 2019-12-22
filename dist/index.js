"use strict";

var _api = _interopRequireDefault(require("./api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Shop = function Shop() {
  _classCallCheck(this, Shop);
};

var Offer =
/*#__PURE__*/
function (_Shop) {
  _inherits(Offer, _Shop);

  function Offer() {
    _classCallCheck(this, Offer);

    return _possibleConstructorReturn(this, _getPrototypeOf(Offer).apply(this, arguments));
  }

  return Offer;
}(Shop);

var Cart =
/*#__PURE__*/
function (_Shop2) {
  _inherits(Cart, _Shop2);

  function Cart() {
    _classCallCheck(this, Cart);

    return _possibleConstructorReturn(this, _getPrototypeOf(Cart).apply(this, arguments));
  }

  return Cart;
}(Shop);

var api = new _api["default"]();
var shop = new Shop();
api.getAll().then(function (resp) {
  return shop.viewOffer(resp);
});
document.addEventListener("DOMContentLoaded", function () {
  shop.showCartBttn.addEventListener('click', function () {
    return shop.cart.style.display = 'block';
  });
  shop.closeCartBttn.addEventListener('click', function () {
    return shop.cart.style.display = 'none';
  });
  shop.buyBttn.addEventListener('click', shop.handleBuyBttn.bind(shop));
});