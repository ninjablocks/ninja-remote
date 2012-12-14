'use strict';

describe('Service: NewButtonService', function () {

  // load the service's module
  beforeEach(module('yeomanApp'));

  // instantiate service
  var NewButtonService;
  beforeEach(inject(function(_NewButtonService_) {
    NewButtonService = _NewButtonService_;
  }));

  it('should do something', function () {
    expect(!!NewButtonService).toBe(true);
  });

});
