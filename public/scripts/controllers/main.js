'use strict';

yeomanApp.controller('MainCtrl'
  , ['$scope', '$rootScope', 'UIEvents', 'UserStore', 'NewButtonService'
  , function($scope, $rootScope, UIEvents, UserStore, NewButtonService) {

    $scope.ConfigureMode = false;

    $scope.Buttons = UserStore.GetButtons();

    /**
     * Edits an existing Button
     * @param {[type]} button [description]
     */
    $scope.EditButton = function(button) {
      var type = button.GetDevice().Options.type;
      console.log("Editing Button ", type);

      NewButtonService.Button = button;

      switch (type) {
        case Ninja.DeviceTypes.RGBLED:
          $scope.setRoute('/configureLed');
          break; 
        case Ninja.DeviceTypes.RELAY:
          $scope.setRoute('/configureRelay');
          break;
        case Ninja.DeviceTypes.RF433:
          $scope.setRoute('/configureSocket');
          break;
      }
    };

    // Watch for changes to the Buttons array
    $scope.$watch('UserStore.Data.Buttons', function() {
      $scope.Buttons = UserStore.GetButtons();
      // console.log('UserStore.Data.Buttons: changed', $scope.Buttons);
    });

    $scope.$on(UIEvents.SetConfigureMode, function(event, modeSwitch) {
      $scope.ConfigureMode = modeSwitch;
    });

    $rootScope.$on(UIEvents.ButtonRemoved, function(event, removedButton) {
      $scope.Buttons = UserStore.GetButtons();
      // console.log("Post-Removed", $scope.Buttons);
    });

}]);