'use strict';

yeomanApp.controller('MainCtrl'
  , ['$scope', 'UIEvents'
  , function($scope, UIEvents) {

    $scope.ConfigureMode = false;


    $scope.$on(UIEvents.SetConfigureMode, function(event, modeSwitch) {
      $scope.ConfigureMode = modeSwitch;
    });



}]);