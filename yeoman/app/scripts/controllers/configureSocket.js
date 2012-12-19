'use strict';

yeomanApp.controller('ConfigureSocketCtrl'
  , ['$scope', '$rootScope', 'UIEvents', 'DeviceService', 'NewButtonService', 'UserStore'
  , function($scope, $rootScope, UIEvents, DeviceService, NewButtonService, UserStore) {

  $scope.ButtonName = NewButtonService.Button.Options.name;
  $scope.ButtonDevice = NewButtonService.Button.GetDevice();
  $scope.ButtonValue1 = NewButtonService.Button.Options.value1;
  $scope.ButtonValue2 = NewButtonService.Button.Options.value2;

  $scope.IsListening = false;
  $scope.ListenEntries = [];
  $scope.ListenTarget = null;

  /**
   * Handle Listening events
   */
  $rootScope.$on(UIEvents.PusherData, function(event, data) {
    $scope.$apply(function() {
      if ($scope.IsListening) {
        if ($scope.ButtonDevice && data.GUID === $scope.ButtonDevice.GUID()) {
          // console.log("Pusher: ", data);
          var existingEntry = $scope.FindEntry(data.DA);
          if (existingEntry) {
            // Existing
            var updateIndex = $scope.ListenEntries.indexOf(existingEntry);
            $scope.ListenEntries[updateIndex].Count ++;
            
            var detectedValue = $scope.GetDetectedValueFromEntries();
            if (detectedValue) {
              $scope[$scope.ListenTarget] = detectedValue.DA;
              $scope.Stop();
            }

          } else {
            // New
            var entry = {
              DA: data.DA,
              Count: 1
            };

            $scope.ListenEntries.push(entry);
          }
        }
      }
    });
  });

  /**
   * Finds a listened dataString within the ListenEntries
   * @param {string} dataString DataString to search for
   */
  $scope.FindEntry = function(dataString) {
    for (var i=0; i<$scope.ListenEntries.length; i++) {
      var entry = $scope.ListenEntries[i];
      if (entry.DA === dataString) {
        return entry;
      }
    }
  };

  /**
   * Removes a complete entry object from the ListenEntries
   * @param {object} entry Entry object to remove
   */
  $scope.RemoveEntry = function(entry) {
    var index = $scope.ListenEntries.indexOf(entry);
    $scope.ListenEntries.splice(index, 1);
  };

  /**
   * Removes an entry by dataString from the ListenEntries
   * @param {string} dataString DataString to search for
   */
  $scope.RemoveEntryByDataString = function(dataString) {

    for (var i=0; i<$scope.ListenEntries.length; i++) {
      var entry = $scope.ListenEntries[i];
      if (entry.DA === dataString) {
        $scope.RemoveEntry(entry);
        break;
      }

    }
  };

  /**
   * Determines if there is a selected value within the ListenEntries
   */
  $scope.GetDetectedValueFromEntries = function() {

    for (var i=0; i<$scope.ListenEntries.length; i++) {
      var entry = $scope.ListenEntries[i];
      if (entry.Count >= 3 ) {
        return entry;
      }
    }
  };


  $scope.ButtonIsListening = function(buttonTarget) {
    if ($scope[buttonTarget] && $scope.IsListening) {
      return true;
    } else {
      return ($scope.IsListening && $scope.ListenTarget === buttonTarget);
    }
  };




  /**
   * Activates RF433 Listening Mode
   */
  $scope.Listen = function(targetValue) {
    $scope.ListenTarget = targetValue;
    $scope.IsListening = true;
  };

  /**
   * Stops RF433 Listening Mode
   */
  $scope.Stop = function() {
    $scope.IsListening = false;
    $scope.ListenEntries = [];
    $scope.ListenTarget = null;
  };

  /**
   * Clears the specified $scope variable
   * @param {string} targetValue $scope variable to clear
   */
  $scope.Clear = function(targetValue) {
    $scope[targetValue] = null;
  };

  /**
   * Saves current Button state to UserStore
   */
  $scope.Save = function() {
    if ($scope.configureSocket.$valid) {

      NewButtonService.Button.Options.name = $scope.ButtonName;
      NewButtonService.Button.Options.value1 = $scope.ButtonValue1;
      NewButtonService.Button.Options.value2 = $scope.ButtonValue2;
      UserStore.AddButtonConfig(NewButtonService.Button);
      UserStore.Save();

      $scope.setRoute('/');
      
    }
  };

}]);

