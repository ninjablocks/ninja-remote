'use strict';

yeomanApp.factory('UserStore'
  , ['$rootScope', '$http', 'UIEvents', 'UserStoreUrl', 'Button', 'Guid'
  , function($rootScope, $http, UIEvents, UserStoreUrl, Button, Guid) {

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
          console.log("GetData response", this.Data);
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
       * Adds a button's configuration to the Data.buttons array
       * @param {[type]} button [description]
       */
      AddButtonConfig: function(button) {
        
        var buttonConfig = {
          name: button.Options.name,
          color: button.Options.color,
          value1: button.Options.value1,
          value2: button.Options.value2,
          deviceGuid: button.GetDevice().GUID()
        };

        buttonConfig.id = Guid();
        // console.log(buttonConfig);
        this.Data.Buttons.push(buttonConfig);
      },


      /**
       * Retrieves a specific button config by Guid
       * @param {string} guid Guid to search for
       */
      GetButtonConfig: function(guid) {
        var config = null;

        for (var i=0; i<this.Data.Buttons.length; i ++) {

          var buttonConfig = this.Data.Buttons[i];
          if (buttonConfig.id === guid) {
            config = buttonConfig;
            break;
          }
        
        }

        return config;
      },


      /**
       * Remoces a ButtonConfig from the Data.Buttons array
       * @param {Button} button Button to remove
       */
      RemoveButton: function(button) {
        var buttonConfig = this.GetButtonConfig(button.GetDevice().GUID());
        var removeIndex = this.Data.Buttons.indexOf(buttonConfig);
        this.Data.splice(removeIndex, 1);
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


    $rootScope.$on(UIEvents.ButtonRemoving, function(event, button) {
      userStore.RemoveButton(button);
      debugger;
    })


    return userStore;
}]);
