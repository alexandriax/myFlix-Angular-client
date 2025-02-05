"use strict";

var _testing = require("@angular/core/testing");
var _movieCard = require("./movie-card.component");
describe('MovieCardComponent', function () {
  var component;
  var fixture;
  beforeEach(function () {
    _testing.TestBed.configureTestingModule({
      declarations: [_movieCard.MovieCardComponent]
    });
    fixture = _testing.TestBed.createComponent(_movieCard.MovieCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', function () {
    expect(component).toBeTruthy();
  });
});