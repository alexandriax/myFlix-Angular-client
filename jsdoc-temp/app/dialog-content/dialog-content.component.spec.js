"use strict";

var _testing = require("@angular/core/testing");
var _dialogContent = require("./dialog-content.component");
describe('DialogContentComponent', function () {
  var component;
  var fixture;
  beforeEach(function () {
    _testing.TestBed.configureTestingModule({
      declarations: [_dialogContent.DialogContentComponent]
    });
    fixture = _testing.TestBed.createComponent(_dialogContent.DialogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', function () {
    expect(component).toBeTruthy();
  });
});