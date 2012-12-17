'use strict';

describe('Controller: ConfigureDeviceRf433Ctrl', function() {

  // load the controller's module
  beforeEach(module('yeomanApp'));

  var ConfigureDeviceRf433Ctrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller) {
    scope = {};
    ConfigureDeviceRf433Ctrl = $controller('ConfigureDeviceRf433Ctrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function() {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
