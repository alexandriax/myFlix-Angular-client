"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppModule = void 0;
var _core = require("@angular/core");
var _http = require("@angular/common/http");
var _platformBrowser = require("@angular/platform-browser");
var _router = require("@angular/router");
var _appRouting = require("./app-routing.module");
var _app = require("./app.component");
var _userRegistrationForm = require("./user-registration-form/user-registration-form.component");
var _animations = require("@angular/platform-browser/animations");
var _material = require("./shared/material.module");
var _forms = require("@angular/forms");
var _userLoginForm = require("./user-login-form/user-login-form.component");
var _movieCard = require("./movie-card/movie-card.component");
var _welcomePage = require("./welcome-page/welcome-page.component");
var _icon = require("@angular/material/icon");
var _input = require("@angular/material/input");
var _button = require("@angular/material/button");
var _card = require("@angular/material/card");
var _formField = require("@angular/material/form-field");
var _dialog = require("@angular/material/dialog");
var _snackBar = require("@angular/material/snack-bar");
var _userProfile = require("./user-profile/user-profile.component");
var _dialogContent = require("./dialog-content/dialog-content.component");
var _dec, _class;
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
var appRoutes = [{
  path: 'welcome',
  component: _welcomePage.WelcomePageComponent
}, {
  path: 'movies',
  component: _movieCard.MovieCardComponent
}, {
  path: 'profile',
  component: _userProfile.UserProfileComponent
}, {
  path: '',
  redirectTo: 'welcome',
  pathMatch: 'prefix'
}];
var AppModule = exports.AppModule = (_dec = (0, _core.NgModule)({
  declarations: [_app.AppComponent, _userRegistrationForm.UserRegistrationFormComponent, _userLoginForm.UserLoginFormComponent, _movieCard.MovieCardComponent, _welcomePage.WelcomePageComponent, _userProfile.UserProfileComponent, _dialogContent.DialogContentComponent],
  imports: [_platformBrowser.BrowserModule, _http.HttpClientModule, _appRouting.AppRoutingModule, _forms.FormsModule, _router.RouterModule.forRoot(appRoutes), _animations.BrowserAnimationsModule, _material.MaterialModule, _icon.MatIconModule, _button.MatButtonModule, _input.MatInputModule, _card.MatCardModule, _formField.MatFormFieldModule, _dialog.MatDialogModule, _snackBar.MatSnackBarModule],
  providers: [],
  bootstrap: [_app.AppComponent]
}), _dec(_class = /*#__PURE__*/_createClass(function AppModule() {
  _classCallCheck(this, AppModule);
})) || _class);