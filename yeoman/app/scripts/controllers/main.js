'use strict';

yeomanApp.controller('MainCtrl'
  , ['$scope', 'UIEvents', 'UserStore'
  , function($scope, UIEvents, UserStore) {

    $scope.ConfigureMode = false;

    $scope.Buttons = UserStore.Data.Buttons;


    $scope.$on(UIEvents.SetConfigureMode, function(event, modeSwitch) {
      $scope.ConfigureMode = modeSwitch;
    });



}]);