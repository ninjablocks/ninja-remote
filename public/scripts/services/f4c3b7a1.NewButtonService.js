'use strict';

yeomanApp.factory('NewButtonService'
  , ['Button'
  , function(Button) {

  var newButton = {
    Type: '',

    Types: [],

    Button: new Button(),

    Reset: function() {
      this.Button = new Button();
      this.Type = '';
      this.Types = [];
    }

  };

  newButton.Reset();
  
  return newButton;

}]);
