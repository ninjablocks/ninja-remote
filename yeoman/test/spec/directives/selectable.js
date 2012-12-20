'use strict';

describe('Directive: selectable', function() {
  beforeEach(module('yeomanApp'));

  var element;

  it('should make hidden element visible', inject(function($rootScope, $compile) {
    element = angular.element('<selectable></selectable>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the selectable directive');
  }));
});
