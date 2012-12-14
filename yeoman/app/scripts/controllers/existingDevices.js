'use strict';

yeomanApp.controller('ExistingDevicesCtrl'
  , ['$scope', '$rootScope', 'UIEvents', 'NewButtonService', 'DeviceService'
  , function($scope, $rootScope, UIEvents, NewButtonService, DeviceService) {

    $scope.DeviceType = NewButtonService.Type;
    $scope.ExistingDevices = [];


    $scope.LoadDevices = function() {
      if ($scope.DeviceType) {
        $scope.ExistingDevices = DeviceService.GetDeviceByType($scope.DeviceType);
      }
    };


    $scope.$watch('DeviceType', function() {

      $scope.LoadDevices();

    });


}]);
