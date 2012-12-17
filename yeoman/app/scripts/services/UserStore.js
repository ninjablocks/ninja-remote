'use strict';

yeomanApp.factory('UserStore'
  , ['$http', 'UserStoreUrl', 'Button', 'Guid'
  , function($http, UserStoreUrl, Button, Guid) {

    var userStore = {

      Data: {
        Buttons: []
      },

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
       * Adds a button to the Data.buttons array
       * @param {[type]} button [description]
       */
      AddButton: function(button) {
        
        var buttonConfig = {
          name: button.Options.name,
          color: button.Options.color,
          deviceGuid: button.GetDevice().GUID()
        };

        buttonConfig.id = Guid();
        console.log(buttonConfig);
        this.Data.Buttons.push(buttonConfig);
      },



      /**
       * Extracts buttons form the Data
       * @param {object} data Optional data object to look into
       * @return {array} Array of Button objects
       */
      GetButtons: function(data) {
        var buttons = [];
        var buttonData = (data) ? data : this.Data;

        if (buttonData && buttonData.Buttons) {
          for(var i=0; i<buttonData.Buttons.length; i++) {
            var buttonConfig = buttonData.Buttons[i];
            var button = new Button(buttonConfig);
            buttons.push(button);
          }
        }

        return buttons;
      }

    };

    return userStore;
}]);
