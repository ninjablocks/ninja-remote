'use strict';

yeomanApp.controller('ExistingDevicesCtrl'
  , ['$scope', '$rootScope', 'UIEvents', 'NewButtonService', 'DeviceService'
  , function($scope, $rootScope, UIEvents, NewButtonService, DeviceService) {

    $scope.DeviceType = NewButtonService.Type;
    $scope.ExistingDevices = [];


    /**
     * This route requires a $scope.DeviceType to be set. If none then redirect user
     * back to selectButton page
     **/
    $scope.CheckDeviceType = function() {
      if ($scope.DeviceType === '') {
        $scope.setRoute('/selectButton');
      }
    };

    $scope.CheckDeviceType();

    /**
     * Loads the users devices to the UI
     */
    $scope.LoadDevices = function() {
      if ($scope.DeviceType) {
        if ($scope.DeviceType === 'rf433-button') {
          $scope.ExistingDevices = DeviceService.GetDeviceByType('rf433');
        } else {
          $scope.ExistingDevices = DeviceService.GetDeviceByType($scope.DeviceType);
        }
        $scope.SmartCheck();
      }
    };

    /**
     * Checks the devices for inferred selections
     */
    $scope.SmartCheck = function() {
      // TODO: Check if only 1 device and automatically use it
      if ($scope.ExistingDevices.length === 1) {
        var defaultDevice = $scope.ExistingDevices[0];
        $scope.UseDevice(defaultDevice);
      } else if ($scope.ExistingDevices.length === 0) {
        $scope.setRoute('/selectButton');
      }
    };


    /**
     * Event Handler to use the selected device as the new button device
     */
    $scope.UseDevice = function(device) {
      NewButtonService.Button.SetDevice(device);

      // TODO: Determine how to configure the new device
      switch ($scope.DeviceType) {
        case "rf433":
          $scope.setRoute('/configureSocket');
          break;
        case "rf433-button":
          $scope.setRoute('/configureRfButton');
          break;
        case "rgbled":
          $scope.setRoute('/configureLed');
          break;
        case "relay":
          $scope.setRoute('/configureRelay');
          break;
      }
    };


    /**
     * Watches for changes to the DeviceType and reloads the user devices (by type)
     */
    $scope.$watch('DeviceType', function() {

      $scope.LoadDevices();

    });




}]);
