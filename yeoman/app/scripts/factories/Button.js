yeomanApp.factory('Button',
  [ 'NinjaService', 'NinjaUtilities'
  , function(NinjaService, NinjaUtilities) {
    return function(options) {

      this.Options = {
        name: '',
        color: '',
        device: null,
        value1: null,
        value2: null
      };
      this.Options = NinjaUtilities.ObjectMerge(this.Options, options);

      this.Construct = function() {
        if (this.Options.hasOwnProperty('deviceGuid')) {
          var device = new NinjaService.Device({ guid: this.Options.deviceGuid });
          this.Options.device = device;
        }
      };


      this.GetDevice = function() {
        return this.Options.device;
      }.bind(this);


      this.SetDevice = function(device) {
        this.Options.device = device;
        return true;
      }.bind(this);


      this.Actuate = function() {
        console.log("Button.Actuate()");

        this.Options.device.Emit(GetActuateValue.call(this));
      };

      var nextValue = 'value1';

      var GetActuateValue = function() {
        if (this.Options.value1 && this.Options.value2) {
          // Toggle between the two values
          var value = this.Options[nextValue];
          if (nextValue == 'value1') {
            nextValue = 'value2';
          } else {
            nextValue = 'value1';
          }
          return value;

        } else {
          return this.Options.value1;
        }
      };

      this.Construct();
    };
  }]);