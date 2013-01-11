'use strict';

yeomanApp.controller('ExistingDevicesCtrl'
  , ['$scope', '$rootScope', 'UIEvents', 'NewButtonService', 'DeviceService'
  , function($scope, $rootScope, UIEvents, NewButtonService, DeviceService) {

    $scope.DeviceTypes = NewButtonService.Types;
    $scope.ExistingDevices = [];
    $scope.ConfigurePage = "/";

    /**
     * This route requires a $scope.DeviceType to be set. If none then redirect user
     * back to selectButton page
     **/
    $scope.CheckDeviceTypes = function() {
      if ($scope.DeviceTypes.length === 0) {
        $scope.setRoute('/selectButton');
      }
    };

    $scope.CheckDeviceTypes();

    /**
     * Loads the users devices to the UI
     */
    $scope.LoadDevices = function() {
      $scope.ExistingDevices = [];
      for (var i=0; i<$scope.DeviceTypes.length; i++) {
        var deviceType = $scope.DeviceTypes[i];
        if (deviceType === 'rf433-button') {
          $scope.ExistingDevices = $scope.ExistingDevices.concat(DeviceService.GetDeviceByType('rf433'));
        } else {
          $scope.ExistingDevices = $scope.ExistingDevices.concat(DeviceService.GetDeviceByType(deviceType));

        }
        console.log("Loading devices", deviceType);
      }
      console.log("Devices Loaded");
      $scope.SmartCheck();

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

        // $scope.setRoute('/selectButton');
      }
    };


    /**
     * Event Handler to use the selected device as the new button device
     */
    $scope.UseDevice = function(device) {
      NewButtonService.Button.SetDevice(device);

      var deviceType = $scope.DeviceTypes[0];

      // TODO: Determine how to configure the new device
      switch (deviceType) {
        case "rf433":
          $scope.setRoute('/configureSocket');
          break;
        case "rf433-button":
          $scope.setRoute('/configureRfButton');
          break;
        case "rgbled":
        case "rgbled8":
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

    /**
     * Turn off configure mode
     */
    $rootScope.$broadcast(UIEvents.SetConfigureMode, false);



}]);
