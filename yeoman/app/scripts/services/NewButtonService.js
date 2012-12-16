'use strict';

yeomanApp.factory('NewButtonService'
  , ['Button'
  , function() {

  var newButton = {
    Type: '',

    Button: null,

    Device: null,

    Reset: function() {
      this.Button = null;
      this.Type = '';
    }

  };

  return newButton;

}]);
