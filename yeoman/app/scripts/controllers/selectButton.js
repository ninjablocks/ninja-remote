'use strict';

yeomanApp.controller('SelectButtonCtrl'
  , ['$scope', '$rootScope', 'UIEvents', 'NewButtonService', 'DeviceService'
  , function($scope, $rootScope, UIEvents, NewButtonService, DeviceService) {

    /**
     * Sets the existing DeviceType for loading into the ExistingDevices view
     * @param {string} deviceType String of the existing type to use
     */
    $scope.setExistingDeviceTypes = function(types) {

      $scope.CreateNewButton();
      NewButtonService.Types = types
      NewButtonService.Button.Options.name = "My " + $scope.DeviceTypeToButtonType(types) + " Button";
      $scope.setRoute('/existingDevices');

    };

    $scope.DeviceTypeToButtonType = function(deviceTypes) {
      var buttonType = "";

      if (deviceTypes.indexOf("rf433") >= 0) {
        buttonType = "Socket"
        if (deviceTypes.indexOf("button") >= 0) {
          buttonType = "RF";
        }
      } else if (deviceTypes.indexOf("relay") >= 0) {
        buttonType = "Relay";
      } else if (deviceTypes.indexOf("rgbled") >= 0) {
        buttonType = "RGB LED";
      }

      return buttonType;
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
