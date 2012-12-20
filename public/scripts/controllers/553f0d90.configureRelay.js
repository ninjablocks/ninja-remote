'use strict';

yeomanApp.controller('ConfigureRelayCtrl'
  , ['$scope', '$rootScope', 'UIEvents', 'NewButtonService', 'UserStore'
  , function($scope, $rootScope, UIEvents, NewButtonService, UserStore) {

    /**
     * Turn off ConfigureMode
     */
    $rootScope.$broadcast(UIEvents.SetConfigureMode, false);


    $scope.ButtonName = NewButtonService.Button.Options.name;

    NewButtonService.Button.Options.value1 = "1";
    NewButtonService.Button.Options.value2 = "0";

    $scope.CheckDevice = function() {
      if (NewButtonService.Button.GetDevice() === null) {
        $scope.setRoute('/selectButton');
      }
    };
    $scope.CheckDevice();


    $scope.Save = function() {
      if ($scope.configureRelay.$valid) {

        NewButtonService.Button.Options.name = $scope.ButtonName;

        UserStore.AddButtonConfig(NewButtonService.Button);
        UserStore.Save();

        $scope.setRoute('/');
      }
    };

    $scope.Test = function(valueProperty) {
      var emitValue = NewButtonService.Button.Options[valueProperty];
      NewButtonService.Button.GetDevice().Emit(emitValue);
    };

}]);
