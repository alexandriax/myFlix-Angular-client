"use strict";

var _testing = require("@angular/core/testing");
var _userRegistrationForm = require("./user-registration-form.component");
describe('UserRegistrationFormComponent', function () {
  var component;
  var fixture;
  beforeEach(function () {
    _testing.TestBed.configureTestingModule({
      declarations: [_userRegistrationForm.UserRegistrationFormComponent]
    });
    fixture = _testing.TestBed.createComponent(_userRegistrationForm.UserRegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', function () {
    expect(component).toBeTruthy();
  });
});