"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserRegistrationService = void 0;
var _core = require("@angular/core");
var _http = require("@angular/common/http");
var _rxjs = require("rxjs");
var _operators = require("rxjs/operators");
var _dec, _class;
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// api url that will provide data for the client app
var apiUrl = 'https://moo-movies-10a7ea08abc9.herokuapp.com';
var UserRegistrationService = exports.UserRegistrationService = (_dec = (0, _core.Injectable)({
  providedIn: 'root'
}), _dec(_class = /*#__PURE__*/function () {
  /**
  * Creates an instance of UserRegistrationService.
  * @param {HttpClient} http - Angular's HTTP client for making API calls.
  */
  function UserRegistrationService(http) {
    _classCallCheck(this, UserRegistrationService);
    this.http = http;
  }

  /**
  * Registers a new user.
  * @param {Object} userData - User data including username, password, email, and birthday.
  * @returns {Observable<any>} API response.
  */
  // api call for the user registration endpoint
  return _createClass(UserRegistrationService, [{
    key: "userRegistration",
    value: function userRegistration(userData) {
      console.log(userData);
      return this.http.post(apiUrl + '/users', userData).pipe((0, _operators.catchError)(this.handleError));
    }
    /**
     * Logs in a user.
     * @param {Object} userData - User credentials (username and password).
     * @returns {Observable<any>} API response including user details and token.
     */
    // user login
  }, {
    key: "userLogin",
    value: function userLogin(userData) {
      console.log(userData);
      return this.http.post(apiUrl + '/login', {
        username: userData.username,
        password: userData.password
      }, {
        headers: new _http.HttpHeaders({
          'Content-type': 'application/json'
        })
      }).pipe((0, _operators.map)(function (response) {
        if (response.user && response.user.username) {
          localStorage.setItem('username', response.user.username);
          localStorage.setItem('user', response.user._id);
        }
        return response;
      }), (0, _operators.catchError)(this.handleError));
    }

    //get all movies
  }, {
    key: "getAllMovies",
    value: function getAllMovies() {
      var token = localStorage.getItem('token');
      console.log('Stored Token:', token);
      return this.http.get(apiUrl + '/movies', {
        headers: new _http.HttpHeaders({
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        })
      }).pipe((0, _operators.map)(this.extractResponseData), (0, _operators.catchError)(this.handleError));
    }

    //get one movie
  }, {
    key: "getMovie",
    value: function getMovie(movieId) {
      var token = localStorage.getItem('token');
      return this.http.get(apiUrl + "/movies/".concat(movieId), {
        headers: new _http.HttpHeaders({
          Authorization: 'Bearer ' + token
        })
      }).pipe((0, _operators.map)(this.extractResponseData), (0, _operators.catchError)(this.handleError));
    }

    //get director
  }, {
    key: "getDirector",
    value: function getDirector(directorName) {
      var token = localStorage.getItem('token');
      return this.http.get(apiUrl + "/movies/directors/".concat(directorName), {
        headers: new _http.HttpHeaders({
          Authorization: 'Bearer ' + token
        })
      }).pipe((0, _operators.map)(this.extractResponseData), (0, _operators.catchError)(this.handleError));
    }

    //get genre
  }, {
    key: "getGenre",
    value: function getGenre(genreName) {
      var token = localStorage.getItem('token');
      return this.http.get(apiUrl + "/movies/genres/".concat(genreName), {
        headers: new _http.HttpHeaders({
          Authorization: 'Bearer ' + token
        })
      }).pipe((0, _operators.map)(this.extractResponseData), (0, _operators.catchError)(this.handleError));
    }

    //get user
  }, {
    key: "getUser",
    value: function getUser() {
      var token = localStorage.getItem('token');
      var username = localStorage.getItem('username');
      return this.http.get(apiUrl + "/users/".concat(username), {
        headers: new _http.HttpHeaders({
          Authorization: 'Bearer ' + token
        })
      }).pipe((0, _operators.map)(this.extractResponseData), (0, _operators.catchError)(this.handleError));
    }

    //get favorite movies
  }, {
    key: "getFavoriteMovies",
    value: function getFavoriteMovies(userId) {
      var _this = this;
      var token = localStorage.getItem('token');
      console.log("Fetching favorite movies for user: ".concat(userId));
      return this.http.get(apiUrl + "/users/".concat(userId, "/movies"), {
        headers: new _http.HttpHeaders({
          Authorization: 'Bearer ' + token
        })
      }).pipe((0, _operators.map)(function (response) {
        console.log("API Response:", response);
        return _this.extractResponseData(response);
      }), (0, _operators.catchError)(this.handleError));
    }

    /**
     * Adds a movie to the user's list of favorites.
     * @param {string} movieId - ID of the movie to add.
     * @returns {Observable<any>} Updated user details.
     */
    //add favorite movie
  }, {
    key: "addFavoriteMovie",
    value: function addFavoriteMovie(movieId) {
      var token = localStorage.getItem('token');
      var userId = localStorage.getItem('user');
      return this.http.post(apiUrl + "/users/".concat(userId, "/movies/").concat(movieId), null, {
        headers: new _http.HttpHeaders({
          Authorization: "Bearer " + token
        })
      }).pipe((0, _operators.map)(this.extractResponseData), (0, _operators.catchError)(this.handleError));
    }
    /**
     * Updates user profile information.
     * @param {Object} userData - Updated user information.
     * @returns {Observable<any>} Updated user details.
     */
    //edit user
  }, {
    key: "editUser",
    value: function editUser(userData) {
      console.log('Request payload:', userData);
      var token = localStorage.getItem('token');
      var userId = localStorage.getItem('user');
      return this.http.put(apiUrl + "/users/".concat(userId), userData, {
        headers: new _http.HttpHeaders({
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        })
      }).pipe((0, _operators.map)(this.extractResponseData), (0, _operators.catchError)(this.handleError));
    }

    //delete user
  }, {
    key: "deleteUser",
    value: function deleteUser() {
      var token = localStorage.getItem('token');
      var userId = localStorage.getItem('user');
      return this.http["delete"](apiUrl + "/users/".concat(userId), {
        headers: new _http.HttpHeaders({
          Authorization: 'Bearer ' + token
        })
      }).pipe((0, _operators.map)(this.extractResponseData), (0, _operators.catchError)(this.handleError));
    }

    //remove movie from favorites
  }, {
    key: "removeFavoriteMovie",
    value: function removeFavoriteMovie(movieId) {
      var token = localStorage.getItem('token');
      var userId = localStorage.getItem('user');
      return this.http["delete"](apiUrl + "/users/movies/".concat(movieId), {
        headers: new _http.HttpHeaders({
          Authorization: "Bearer " + token
        })
      }).pipe((0, _operators.map)(this.extractResponseData), (0, _operators.catchError)(this.handleError));
    }
  }, {
    key: "handleError",
    value: function handleError(error) {
      if (error.error instanceof ErrorEvent) {
        console.error('Some error occurred:', error.error.message);
      } else {
        console.error("Error Status code ".concat(error.status, ", ") + "Error body is: ".concat(error.error));
      }
      return (0, _rxjs.throwError)('Something bad happened; please try again later.');
    }
  }, {
    key: "extractResponseData",
    value: function extractResponseData(res) {
      var body = res;
      return body || {};
    }
  }]);
}()) || _class);