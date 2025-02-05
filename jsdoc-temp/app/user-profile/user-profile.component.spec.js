"use strict";

var _testing = require("@angular/core/testing");
var _userProfile = require("./user-profile.component");
describe('UserProfileComponent', function () {
  var component;
  var fixture;
  beforeEach(function () {
    _testing.TestBed.configureTestingModule({
      declarations: [_userProfile.UserProfileComponent]
    });
    fixture = _testing.TestBed.createComponent(_userProfile.UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', function () {
    expect(component).toBeTruthy();
  });
});