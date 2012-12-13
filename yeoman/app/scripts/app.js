'use strict';

var yeomanApp = angular.module('yeomanApp', [])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
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
  '$rootScope', '$location', 'UIEvents', 'NinjaService', 'UserService', 'PusherService', 'DeviceService'
  ,function($rootScope, $location, UIEvents, NinjaService, UserService, PusherService,  DeviceService) {


  /**
   * Global Set Route routine. Used by nav.
   * Sets the location to the specified route
   * @param {string} route Location route as specified in $routeProvider
   */
  $rootScope.setRoute = function(route) {
    $location.path(route);
  };


  // Only initialize route change watches once the user status has been determined
  $rootScope.$on(UIEvents.UserStatusChecked, function() {
    // console.log("Status Checked");
    $rootScope.$on('$routeChangeStart', function(eventObj, next, current) {
      // console.log("route change: ", UserService.IsLoggedIn, next, current);
    });


    $rootScope.$on('$routeChangeSuccess', function(eventObj, current, previous) {
      // console.log('route success', current, previous);
    });
  });

  /**
   * Automatically get the user login status
   */
  UserService.GetLoginStatus();


}]);
