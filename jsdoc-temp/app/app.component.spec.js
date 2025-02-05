"use strict";

var _testing = require("@angular/core/testing");
var _testing2 = require("@angular/router/testing");
var _app = require("./app.component");
describe('AppComponent', function () {
  beforeEach(function () {
    return _testing.TestBed.configureTestingModule({
      imports: [_testing2.RouterTestingModule],
      declarations: [_app.AppComponent]
    });
  });
  it('should create the app', function () {
    var fixture = _testing.TestBed.createComponent(_app.AppComponent);
    var app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
  it("should have as title 'myFlix-Angular-client'", function () {
    var fixture = _testing.TestBed.createComponent(_app.AppComponent);
    var app = fixture.componentInstance;
    expect(app.title).toEqual('myFlix-Angular-client');
  });
  it('should render title', function () {
    var _compiled$querySelect;
    var fixture = _testing.TestBed.createComponent(_app.AppComponent);
    fixture.detectChanges();
    var compiled = fixture.nativeElement;
    expect((_compiled$querySelect = compiled.querySelector('.content span')) === null || _compiled$querySelect === void 0 ? void 0 : _compiled$querySelect.textContent).toContain('myFlix-Angular-client app is running!');
  });
});