'use strict';

describe('Controller: ConfigureDeviceLedCtrl', function() {

  // load the controller's module
  beforeEach(module('yeomanApp'));

  var ConfigureDeviceLedCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller) {
    scope = {};
    ConfigureDeviceLedCtrl = $controller('ConfigureDeviceLedCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function() {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
