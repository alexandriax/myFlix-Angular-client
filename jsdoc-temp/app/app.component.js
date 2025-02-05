"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppComponent = void 0;
var _core = require("@angular/core");
var _userRegistrationForm = require("./user-registration-form/user-registration-form.component");
var _userLoginForm = require("./user-login-form/user-login-form.component");
var _movieCard = require("./movie-card/movie-card.component");
var _router = require("@angular/router");
var _dec, _class;
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var AppComponent = exports.AppComponent = (_dec = (0, _core.Component)({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
}), _dec(_class = /*#__PURE__*/function () {
  function AppComponent(dialog, router) {
    var _this = this;
    _classCallCheck(this, AppComponent);
    _defineProperty(this, "title", 'myFlix-Angular-client');
    _defineProperty(this, "isWelcomePage", false);
    this.dialog = dialog;
    this.router = router;
    this.router.events.subscribe(function (event) {
      if (event instanceof _router.NavigationEnd) {
        _this.isWelcomePage = event.url === '/' || event.url === '/welcome';
      }
    });
  }
  return _createClass(AppComponent, [{
    key: "openUserRegistrationDialog",
    value: function openUserRegistrationDialog() {
      this.dialog.open(_userRegistrationForm.UserRegistrationFormComponent, {
        width: '280px'
      });
    }
  }, {
    key: "openUserLoginDialog",
    value: function openUserLoginDialog() {
      this.dialog.open(_userLoginForm.UserLoginFormComponent, {
        width: '280px'
      });
    }
  }, {
    key: "openMoviesDialog",
    value: function openMoviesDialog() {
      this.dialog.open(_movieCard.MovieCardComponent, {
        width: '300px'
      });
    }
  }, {
    key: "logout",
    value: function logout() {
      localStorage.clear(); // Clears stored user data
      this.router.navigate(['/welcome']); // Redirects user to the welcome page
    }
  }]);
}()) || _class);