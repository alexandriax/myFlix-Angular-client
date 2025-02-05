"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WelcomePageComponent = void 0;
var _core = require("@angular/core");
var _userRegistrationForm = require("../user-registration-form/user-registration-form.component");
var _userLoginForm = require("../user-login-form/user-login-form.component");
var _dec, _class;
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var WelcomePageComponent = exports.WelcomePageComponent = (_dec = (0, _core.Component)({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
}), _dec(_class = /*#__PURE__*/function () {
  /**
  * Creates an instance of WelcomePageComponent.
  * @param {MatDialog} dialog - Service for opening modals.
  */
  function WelcomePageComponent(dialog) {
    _classCallCheck(this, WelcomePageComponent);
    this.dialog = dialog;
  }
  return _createClass(WelcomePageComponent, [{
    key: "ngOnInit",
    value: function ngOnInit() {}
    // This is the function that will open the dialog when the signup button is clicked  
  }, {
    key: "openUserRegistrationDialog",
    value: function openUserRegistrationDialog() {
      this.dialog.open(_userRegistrationForm.UserRegistrationFormComponent, {
        // Assigning the dialog a width
        width: '280px'
      });
    }
  }, {
    key: "openUserLoginDialog",
    value: function openUserLoginDialog() {
      this.dialog.open(_userLoginForm.UserLoginFormComponent, {
        // Assigning the dialog a width
        width: '280px'
      });
    }
  }]);
}()) || _class);