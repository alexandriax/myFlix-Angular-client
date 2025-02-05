"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserLoginFormComponent = void 0;
var _core = require("@angular/core");
var _dec, _dec2, _class, _class2, _descriptor;
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
var UserLoginFormComponent = exports.UserLoginFormComponent = (_dec = (0, _core.Component)({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
}), _dec2 = (0, _core.Input)(), _dec(_class = (_class2 = /*#__PURE__*/function () {
  /**
  * Creates an instance of UserLoginFormComponent.
  * @param {UserRegistrationService} fetchApiData - Service for handling API calls.
  * @param {MatDialogRef<UserLoginFormComponent>} dialogRef - Reference to the login dialog.
  * @param {MatSnackBar} snackBar - Snackbar for displaying notifications.
  * @param {Router} router - Router for navigating after login.
  */

  function UserLoginFormComponent(fetchApiData, dialogRef, snackBar, router) {
    _classCallCheck(this, UserLoginFormComponent);
    _initializerDefineProperty(this, "userData", _descriptor, this);
    this.fetchApiData = fetchApiData;
    this.dialogRef = dialogRef;
    this.snackBar = snackBar;
    this.router = router;
  }
  return _createClass(UserLoginFormComponent, [{
    key: "ngOnInit",
    value: function ngOnInit() {}

    /**
     * Logs in user by sending credentials to API.
     * Saves user information and token to local storage.
     * Closes the dialog, displays a success message, and redirects to the movies page.
     */
  }, {
    key: "loginUser",
    value: function loginUser() {
      var _this = this;
      console.log(this.userData);
      this.fetchApiData.userLogin(this.userData).subscribe(function (result) {
        console.log(result);
        var userId = localStorage.getItem('user');
        console.log('User ID:', userId);

        // save user and token to local storage
        console.log(result.userId);
        localStorage.setItem('user', result.user._id);
        localStorage.setItem('token', result.token);
        console.log("API Login Response:", result);
        console.log("Received User Object:", result.user);
        if (result.user && result.user.username) {
          localStorage.setItem('username', result.user.username);
        } else {
          console.error("No username found in response!");
        }
        ;
        _this.dialogRef.close();
        _this.snackBar.open('login successful!', 'OK', {
          duration: 2000
        });
        console.log('Saved Token:', localStorage.getItem('token'));
        console.log("Username:", localStorage.getItem("username"));
        console.log("User ID:", localStorage.getItem('user'));
        _this.router.navigate(['movies']);
      }, function (error) {
        // debugging
        console.error('Error status:', error.status); // HTTP status code
        console.error('Error body:', error.error); // error body from the server
        _this.snackBar.open(error.error.message || 'Login failed. Please try again.', 'OK', {
          duration: 2000
        });
      });
    }
  }]);
}(), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "userData", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {
      username: '',
      password: ''
    };
  }
}), _class2)) || _class);