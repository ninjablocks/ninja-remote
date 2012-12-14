'use strict';

yeomanApp.controller('SelectButtonCtrl'
  , ['$scope', '$rootScope', 'UIEvents', 'NewButtonService'
  , function($scope, $rootScope, UIEvents, NewButtonService) {

    /**
     * Sets the existing DeviceType for loading into the ExistingDevices view
     * @param {string} deviceType String of the existing type to use
     */
    $scope.setExistingDeviceType = function(deviceType) {

      $scope.CreateNewButton();
      NewButtonService.Type = deviceType;

      $scope.setRoute('/existingDevices');

    };


    $scope.CreateNewButton = function() {
      NewButtonService.Reset();
    };



}]);
