'use strict';

yeomanApp.controller('ConfigureDeviceLedCtrl'
  , ['$scope', '$rootScope', 'UIEvents', 'NewButtonService', 'UserStore'
  , function($scope, $rootScope, UIEvents, NewButtonService, UserStore) {


    $scope.ButtonName = '';

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
      NewButtonService.Button.GetDevice().Options.value = hexColor;
    };

    /**
     * Test the button
     */
    $scope.Test = function() {
      NewButtonService.Button.GetDevice().Emit(NewButtonService.Button.GetDevice().Options.value);
    };


    /**
     * Save the button to the control panel
     */
    $scope.Save = function() {
      NewButtonService.Button.Options.name = $scope.ButtonName
      UserStore.AddButton(NewButtonService.Button);
      UserStore.Save();
    };



}]);
