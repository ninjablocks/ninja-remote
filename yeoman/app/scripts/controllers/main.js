'use strict';

yeomanApp.controller('MainCtrl'
  , ['$scope', 'UIEvents', 'UserStore'
  , function($scope, UIEvents, UserStore) {

    $scope.ConfigureMode = false;

    $scope.Buttons = [];

    // Watch for changes to the Buttons array
    $scope.$watch('UserStore.Data.Buttons', function() {
      $scope.Buttons = UserStore.GetButtons();
      console.log('UserStore.Data.Buttons: changed', $scope.Buttons);
    });

    $scope.$on(UIEvents.SetConfigureMode, function(event, modeSwitch) {
      $scope.ConfigureMode = modeSwitch;
    });



}]);