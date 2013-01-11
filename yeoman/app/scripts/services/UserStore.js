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
          if (response) {
            this.Data = response;
          }

          if (callback) {
            callback(response);
          }
          if (DEBUG) console.log("GetData response", this.Data);
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

      /**
       * Initialize the Data store structure
       */
      InitData: function() {
        this.Data = {
          Buttons: []
        };
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

        if (button.Options.hasOwnProperty("id") && button.Options.id.length > 0) {
          // Update Existing Button
          buttonConfig.id = button.Options.id;
          var existingButton = this.GetButtonConfig(buttonConfig.id);
          var existingIndex = this.Data.Buttons.indexOf(existingButton);
          this.Data.Buttons[existingIndex] = buttonConfig;
          if (DEBUG) console.log("Button Config Updated:", buttonConfig);
        } else {
          // Create New Button
          buttonConfig.id = Guid();
          
          if (!this.Data || !this.Data.Buttons) {
            this.InitData();
          }
          if (DEBUG) console.log("DataStore:", this.Data, this.Data.Buttons);
          this.Data.Buttons.push(buttonConfig);
        }

      },


      /**
       * Retrieves a specific button config by Guid
       * @param {string} id id to search for
       */
      GetButtonConfig: function(id) {
        var config = null;

        for (var i=0; i<this.Data.Buttons.length; i ++) {

          var buttonConfig = this.Data.Buttons[i];
          if (buttonConfig.id === id) {
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
        var buttonConfig = this.GetButtonConfig(button.Options.id);
        var removeIndex = this.Data.Buttons.indexOf(buttonConfig);
        this.Data.Buttons.splice(removeIndex, 1);
        if (DEBUG) console.log("Removing Button", removeIndex, this.Data.Buttons);
        $rootScope.$broadcast(UIEvents.ButtonRemoved, button);

        this.Save();
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

        var hasButtons = buttons.length > 0;
        $rootScope.$broadcast(UIEvents.HasButtons, hasButtons);

        return buttons;
      }

    };


    $rootScope.$on(UIEvents.ButtonRemoving, function(event, button) {
      userStore.RemoveButton(button);
    });


    return userStore;
}]);
