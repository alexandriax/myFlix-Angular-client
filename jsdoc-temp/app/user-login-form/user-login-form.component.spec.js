"use strict";

var _testing = require("@angular/core/testing");
var _userLoginForm = require("./user-login-form.component");
describe('UserLoginFormComponent', function () {
  var component;
  var fixture;
  beforeEach(function () {
    _testing.TestBed.configureTestingModule({
      declarations: [_userLoginForm.UserLoginFormComponent]
    });
    fixture = _testing.TestBed.createComponent(_userLoginForm.UserLoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', function () {
    expect(component).toBeTruthy();
  });
});