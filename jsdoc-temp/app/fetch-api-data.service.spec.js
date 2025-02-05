"use strict";

var _testing = require("@angular/core/testing");
var _fetchApiData = require("./fetch-api-data.service");
describe('FetchApiDataService', function () {
  var service;
  beforeEach(function () {
    _testing.TestBed.configureTestingModule({});
    service = _testing.TestBed.inject(_fetchApiData.UserRegistrationService);
  });
  it('should be created', function () {
    expect(service).toBeTruthy();
  });
});