'use strict';

yeomanApp.controller('SelectButtonCtrl'
  , ['$scope', '$rootScope', 'UIEvents', 'NewButtonService'
  , function($scope, $rootScope, UIEvents, NewButtonService) {

    console.log("Select Button Instantiated", Math.random())
    /**
     * Sets the existing DeviceType for loading into the ExistingDevices view
     * @param {string} deviceType String of the existing type to use
     */
    $scope.setExistingDeviceType = function(deviceType) {
      console.log("setExistingDeviceType");

      NewButtonService.Type = deviceType;

      $scope.setRoute('/existingDevices'); 

    };



}]);
