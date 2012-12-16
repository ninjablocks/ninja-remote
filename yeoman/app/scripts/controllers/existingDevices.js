'use strict';

yeomanApp.controller('ExistingDevicesCtrl'
  , ['$scope', '$rootScope', 'UIEvents', 'NewButtonService', 'DeviceService'
  , function($scope, $rootScope, UIEvents, NewButtonService, DeviceService) {

    $scope.DeviceType = NewButtonService.Type;
    $scope.ExistingDevices = [];


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
      NewButtonService.Device = device;
      console.log(NewButtonService);
    };


    /**
     * Watches for changes to the DeviceType and reloads the user devices (by type)
     */
    $scope.$watch('DeviceType', function() {

      $scope.LoadDevices();

    });





}]);
