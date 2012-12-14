'use strict';

yeomanApp.factory('UserStore'
  , ['$http', 'UserStoreUrl', 'Button'
  , function($http, UserStoreUrl, Button) {

    var userStore = {

      Data: {},

      /**
       * Get User Store data
       * @param {Function} callback Callback function
       */
      GetData: function(callback) {

        $http.get(UserStoreUrl).success(function(response) {
          this.Data = response;

          if (callback) {
            callback(response);
          }
        }.bind(this));
      },

      /**
       * Set the User Store data
       * @param {object}   data     Data to save
       * @param {Function} callback Callback function
       */
      SetData: function(data, callback) {
        
        $http.put(UserStoreUrl, data).success(function(response) {
          if (callback) {
            callback(response);
          }
        });

      },

      Save: function(callback) {
        this.SetData(this.Data, callback);
      },

      /**
       * Extracts buttons form the Data
       * @param {object} data Optional data object to look into
       * @return {array} Array of Button objects
       */
      GetButtons: function(data) {
        var buttons = [];
        var buttonData = (data) ? data : this.Data;

        if (buttonData && buttonData.buttons) {
          for(var i=0; i<buttonData.buttons.length; i++) {
            var buttonConfig = buttonData.buttons[i];
            var button = new Button(buttonConfig);
            buttons.push(button);
          }
        }

        return buttons;
      }

    };

    return userStore;
}]);
