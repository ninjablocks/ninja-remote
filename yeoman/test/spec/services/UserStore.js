'use strict';

describe('Service: UserStore', function () {

  // load the service's module
  beforeEach(module('yeomanApp'));

  // instantiate service
  var UserStore;
  beforeEach(inject(function(_UserStore_) {
    UserStore = _UserStore_;
  }));

  it('should do something', function () {
    expect(!!UserStore).toBe(true);
  });

});
