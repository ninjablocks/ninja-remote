'use strict';

var yeomanApp = angular.module('yeomanApp', [])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/selectButton', {
        templateUrl: 'views/selectButton.html',
        controller: 'SelectButtonCtrl'
      })
      .when('/existingDevices', {
        templateUrl: 'views/existingDevices.html',
        controller: 'ExistingDevicesCtrl'
      })
      .when('/configureDeviceLed', {
        templateUrl: 'views/configureDeviceLed.html',
        controller: 'ConfigureDeviceLedCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }])
  .config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode(false);
  }]);

/**
 * Initialization
 */
yeomanApp.run([
  '$rootScope', '$location', 'UIEvents', 'NinjaService', 'UserService', 'PusherService', 'DeviceService', 'UserStore', 'Button'
  ,function($rootScope, $location, UIEvents, NinjaService, UserService, PusherService,  DeviceService, UserStore, Button) {


  /**
   * Global Set Route routine. Used by nav.
   * Sets the location to the specified route
   * @param {string} route Location route as specified in $routeProvider
   */
  $rootScope.setRoute = function(route) {
    $location.path(route);
  };

  /**
   * Automatically get the user login status
   */
  UserService.GetLoginStatus();

  /**
   * Automatically get the user store
   */
  UserStore.GetData(function(data) {
    console.log("UserStore:",data);

  });
  UserStore.SetData({Buttons: []});
  DeviceService.LoadUserDevices(function() {

  });



  

  // UserStore.SetData({ buttons: [ {name: 'button1'}, {name: 'button2'}] });


  $rootScope.$on(UIEvents.SetDeviceType, function(event, deviceType) {
    
  });




}]);


yeomanApp.value('UserStoreUrl', '/user/store');