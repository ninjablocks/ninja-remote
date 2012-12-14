yeomanApp.factory('Button',
  [ 'NinjaUtilities'
  , function(NinjaUtilities) {
    return function(options) {

      this.Options = {
        name: '',
        color: '',
        device: null
      };
      this.Options = NinjaUtilities.ObjectMerge(this.Options, options);

    };
  }]);