'use strict';

yeomanApp.controller('ConfigureLedCtrl'
  , ['$scope', '$rootScope', 'UIEvents', 'NewButtonService', 'UserStore'
  , function($scope, $rootScope, UIEvents, NewButtonService, UserStore) {

    /**
     * Turn off ConfigureMode
     */
    $rootScope.$broadcast(UIEvents.SetConfigureMode, false);

    $scope.Device = NewButtonService.Button.GetDevice();
    $scope.ButtonName = NewButtonService.Button.Options.name;
    $scope.ButtonValue = NewButtonService.Button.Options.value1;

    /**
     * This page requires a device to be preselected
     */
    $scope.CheckDevice = function() {
      if (NewButtonService.Button.GetDevice() === null) {
        $scope.setRoute('/selectButton');
      }
    };
    $scope.CheckDevice();

    /**
     * Sets the color for the button to actuate
     * @param {[type]} hexColor [description]
     */
    $scope.SetColor = function(hexColor) {
      // $scope.ButtonValue = hexColor;
      NewButtonService.Button.Options.value1 = hexColor;
    };

    /**
     * Test the button
     */
    $scope.Test = function() {
      NewButtonService.Button.GetDevice().Emit($scope.ButtonValue);
      if (DEBUG) console.log($scope.configureLed);
    };


    /**
     * Save the button to the control panel
     */
    $scope.Save = function() {
      if ($scope.configureLed.$valid) {
        NewButtonService.Button.Options.name = $scope.ButtonName;
        NewButtonService.Button.Options.value1 = $scope.ButtonValue;
        UserStore.AddButtonConfig(NewButtonService.Button);
        UserStore.Save();

        $scope.setRoute('/');
      }

    };

    $rootScope.$on(UIEvents.SetLEDColor, function(event, hex) {
      $scope.$apply(function() {
        $scope.ButtonValue = hex;
      });
    });


    $scope.$watch('NewButtonService.Button.Options.value1', function() {
      if (DEBUG) console.log("Watching NewButton Value", NewButtonService.Button.Options.value1);
      $scope.ButtonValue = NewButtonService.Button.Options.value1;
    });

}]);







