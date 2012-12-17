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


      this.GetDevice = function() {
        return this.Options.device;
      }.bind(this);

      this.SetDevice = function(device) {
        this.Options.device = device;
        return true;
      }.bind(this);

    };
  }]);