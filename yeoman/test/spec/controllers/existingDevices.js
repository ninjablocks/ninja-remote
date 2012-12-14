'use strict';

describe('Controller: ExistingDevicesCtrl', function() {

  // load the controller's module
  beforeEach(module('yeomanApp'));

  var ExistingDevicesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller) {
    scope = {};
    ExistingDevicesCtrl = $controller('ExistingDevicesCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function() {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
