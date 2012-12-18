'use strict';

yeomanApp.factory('NewButtonService'
  , ['Button'
  , function(Button) {

  var newButton = {
    Type: '',

    Button: new Button(),

    Reset: function() {
      this.Button = new Button();
      this.Type = '';
    }

  };

  newButton.Reset();
  
  return newButton;

}]);
