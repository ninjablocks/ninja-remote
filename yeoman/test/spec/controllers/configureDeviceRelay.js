'use strict';

describe('Controller: ConfigureDeviceRelayCtrl', function() {

  // load the controller's module
  beforeEach(module('yeomanApp'));

  var ConfigureDeviceRelayCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller) {
    scope = {};
    ConfigureDeviceRelayCtrl = $controller('ConfigureDeviceRelayCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function() {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
