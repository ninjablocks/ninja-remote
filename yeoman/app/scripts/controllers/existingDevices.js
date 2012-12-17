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
        $scope.ExistingDevices = DeviceService.GetDeviceByType($scope.DeviceType);
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
          $scope.setRoute('/configureDeviceRf433');
          break;
        case "rgbled":
          $scope.setRoute('/configureDeviceLed');
          break;
        case "relay":
          $scope.setRoute('/configureDeviceRelay');
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
