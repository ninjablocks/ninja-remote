'use strict';

describe('Controller: ConfigureSocketCtrl', function() {

  // load the controller's module
  beforeEach(module('yeomanApp'));

  var ConfigureSocketCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller) {
    scope = {};
    ConfigureSocketCtrl = $controller('ConfigureSocketCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function() {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
