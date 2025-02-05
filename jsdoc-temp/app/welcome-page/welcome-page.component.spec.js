"use strict";

var _testing = require("@angular/core/testing");
var _welcomePage = require("./welcome-page.component");
describe('WelcomePageComponent', function () {
  var component;
  var fixture;
  beforeEach(function () {
    _testing.TestBed.configureTestingModule({
      declarations: [_welcomePage.WelcomePageComponent]
    });
    fixture = _testing.TestBed.createComponent(_welcomePage.WelcomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', function () {
    expect(component).toBeTruthy();
  });
});