'use strict';

yeomanApp.controller('SelectButtonCtrl'
  , ['$scope', '$rootScope', 'UIEvents', 'NewButtonService', 'DeviceService'
  , function($scope, $rootScope, UIEvents, NewButtonService, DeviceService) {

    /**
     * Sets the existing DeviceType for loading into the ExistingDevices view
     * @param {string} deviceType String of the existing type to use
     */
    $scope.setExistingDeviceType = function(deviceType) {

      $scope.CreateNewButton();
      NewButtonService.Type = deviceType;

      $scope.setRoute('/existingDevices');

    };

    /**
     * Checks to see if there are devices of the specified type
     * @param {[type]} type [description]
     */
    $scope.GetDeviceByType = function(type) {
      var typeDevices = DeviceService.GetDeviceByType(type);
      return typeDevices.length > 0;
    };

    $scope.CreateNewButton = function() {
      NewButtonService.Reset();
    };

    $rootScope.$broadcast(UIEvents.SetConfigureMode, false);

    $rootScope.$on(UIEvents.DevicesLoaded, function(event) {
      $scope.$apply();
    });

}]);
