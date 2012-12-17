'use strict';

yeomanApp.controller('ConfigureDeviceRelayCtrl'
  , ['$scope', '$rootScope', 'UIEvents', 'NewButtonService', 'UserStore'
  , function($scope, $rootScope, UIEvents, NewButtonService, UserStore) {

    $scope.ButtonName = '';

    $scope.CheckDevice = function() {
      if (NewButtonService.Button.GetDevice() === null) {
        $scope.setRoute('/selectButton');
      }
    };
    $scope.CheckDevice();


    $scope.Save = function() {
      NewButtonService.Button.Options.name = $scope.ButtonName;
      NewButtonService.Button.Options.value1 = "1";
      NewButtonService.Button.Options.value2 = "0";
      UserStore.AddButtonConfig(NewButtonService.Button);
      UserStore.Save();
    };

}]);
