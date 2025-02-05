"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserProfileComponent = void 0;
var _core = require("@angular/core");
var _dec, _class;
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var UserProfileComponent = exports.UserProfileComponent = (_dec = (0, _core.Component)({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
}), _dec(_class = /*#__PURE__*/function () {
  /**
   * Creates an instance of UserProfileComponent.
   * @param {UserRegistrationService} userService - Service for handling user-related API calls.
   */
  function UserProfileComponent(userService) {
    _classCallCheck(this, UserProfileComponent);
    /**
     * Stores current user data.
     */
    _defineProperty(this, "user", {});
    /** 
     * Stores updated username.
    */
    _defineProperty(this, "newUsername", '');
    _defineProperty(this, "newEmail", '');
    _defineProperty(this, "newPassword", '');
    _defineProperty(this, "favoriteMovieIds", []);
    _defineProperty(this, "allMovies", []);
    _defineProperty(this, "favoriteMovies", []);
    this.userService = userService;
  }
  return _createClass(UserProfileComponent, [{
    key: "ngOnInit",
    value: function ngOnInit() {
      var _this = this;
      this.getUserData();
      setTimeout(function () {
        _this.newUsername = '';
        _this.newEmail = '';
        _this.newPassword = '';
      }, 0);
    }

    /**
     * Fetches user's data & fav movies from the API.
     */
  }, {
    key: "getUserData",
    value: function getUserData() {
      var _this2 = this;
      this.userService.getUser().subscribe({
        next: function next(resp) {
          console.log('Fetched user:', resp);
          _this2.user = resp;
          _this2.favoriteMovieIds = resp.favoriteMovies || [];
          _this2.getAllMovies();
          _this2.newUsername = '';
          _this2.newEmail = '';
          _this2.newPassword = '';
        },
        error: function error(err) {
          console.error('Error fetching user:', err);
        }
      });
    }
  }, {
    key: "getAllMovies",
    value: function getAllMovies() {
      var _this3 = this;
      this.userService.getAllMovies().subscribe({
        next: function next(movies) {
          _this3.allMovies = movies;
          _this3.filterFavoriteMovies();
        },
        error: function error(err) {
          console.error("Error fetching movies:", err);
        }
      });
    }
    /**
     * Filters the user's favorite movies from the full movie list.
     */
  }, {
    key: "filterFavoriteMovies",
    value: function filterFavoriteMovies() {
      var _this4 = this;
      this.favoriteMovies = this.allMovies.filter(function (movie) {
        return _this4.favoriteMovieIds.includes(movie._id);
      });
    }
    /**
     * Updates the user's profile with new input values.
     * If an input field is empty, it keeps the existing value.
     */
  }, {
    key: "onSubmit",
    value: function onSubmit() {
      var _this5 = this;
      var updatedUser = {
        username: this.newUsername.trim() || this.user.username,
        email: this.newEmail.trim() || this.user.email
      };
      if (this.newPassword.trim()) {
        updatedUser.password = this.newPassword.trim();
      }
      this.userService.editUser(updatedUser).subscribe({
        next: function next(response) {
          alert('Profile updated successfully!');
          _this5.user = response;
          _this5.newUsername = '';
          _this5.newEmail = '';
          _this5.newPassword = '';
        },
        error: function error(err) {
          console.error('Error updating user:', err);
        }
      });
    }
  }]);
}()) || _class);