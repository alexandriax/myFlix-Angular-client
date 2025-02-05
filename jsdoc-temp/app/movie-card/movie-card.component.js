"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MovieCardComponent = void 0;
var _core = require("@angular/core");
var _dialogContent = require("../dialog-content/dialog-content.component");
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
var MovieCardComponent = exports.MovieCardComponent = (_dec = (0, _core.Component)({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
}), _dec2 = (0, _core.Input)(), _dec(_class = (_class2 = /*#__PURE__*/function () {
  /**
   * Creates an instance of MovieCardComponent.
   * @param {UserRegistrationService} fetchApiData - Service for fetching API data.
   * @param {MatDialog} dialog - Angular Material dialog service for opening modals.
   */
  function MovieCardComponent(fetchApiData, dialog) {
    _classCallCheck(this, MovieCardComponent);
    /**
     * List of movies to display, received as an input from the parent component.
     */
    _initializerDefineProperty(this, "movies", _descriptor, this);
    /**
     * Array of user's favorite movie IDs.
     */
    _defineProperty(this, "favoriteMovies", []);
    this.fetchApiData = fetchApiData;
    this.dialog = dialog;
  }
  return _createClass(MovieCardComponent, [{
    key: "ngOnInit",
    value: function ngOnInit() {
      this.getMovies();
      this.getUserFavorites();
    }

    /**
     * Opens a dialog displaying additional information.
     * @param {string} title - Title of the dialog.
     * @param {string} content - Content of the dialog (genre or synopsis).
     */
  }, {
    key: "openDialog",
    value: function openDialog(title, content) {
      this.dialog.open(_dialogContent.DialogContentComponent, {
        width: '500px',
        data: {
          title: title,
          content: content
        }
      });
    }
  }, {
    key: "getMovies",
    value: function getMovies() {
      var _this = this;
      this.fetchApiData.getAllMovies().subscribe({
        next: function next(movies) {
          _this.movies = movies;
        },
        error: function error(err) {
          console.error("error getting movies:", err);
        }
      });
    }
  }, {
    key: "getUserFavorites",
    value: function getUserFavorites() {
      var _this2 = this;
      this.fetchApiData.getUser().subscribe({
        next: function next(user) {
          _this2.favoriteMovies = user.favoriteMovies || [];
        },
        error: function error(err) {
          console.error("error getting user favorites:", err);
        }
      });
    }
  }, {
    key: "isFavorite",
    value: function isFavorite(movieId) {
      return Array.isArray(this.favoriteMovies) && this.favoriteMovies.includes(movieId);
    }
  }, {
    key: "toggleFavorite",
    value: function toggleFavorite(movie) {
      var _this3 = this;
      if (!movie || !movie._id) {
        console.error("movie ID is undefined");
        return;
      }
      var movieId = movie._id;
      if (this.isFavorite(movieId)) {
        this.fetchApiData.removeFavoriteMovie(movieId).subscribe({
          next: function next(updatedUser) {
            _this3.favoriteMovies = updatedUser.favoriteMovies || [];
          },
          error: function error(err) {
            return console.error("failed to remove ".concat(movieId, ":"), err);
          }
        });
      } else {
        this.fetchApiData.addFavoriteMovie(movieId).subscribe({
          next: function next(updatedUser) {
            _this3.favoriteMovies = updatedUser.favoriteMovies || [];
          },
          error: function error(err) {
            return console.error("failed to add ".concat(movieId, ":"), err);
          }
        });
      }
    }
  }]);
}(), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "movies", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _class2)) || _class);