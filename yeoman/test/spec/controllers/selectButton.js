'use strict';

describe('Controller: SelectButtonCtrl', function() {

  // load the controller's module
  beforeEach(module('yeomanApp'));

  var SelectButtonCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller) {
    scope = {};
    SelectButtonCtrl = $controller('SelectButtonCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function() {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
