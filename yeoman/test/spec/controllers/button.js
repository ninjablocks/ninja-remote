'use strict';

describe('Controller: ButtonCtrl', function() {

  // load the controller's module
  beforeEach(module('yeomanApp'));

  var ButtonCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller) {
    scope = {};
    ButtonCtrl = $controller('ButtonCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function() {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
