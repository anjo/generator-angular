'use strict';

describe('Controller: <%= classname %>Ctrl', function() {

  // load the controller's module
  beforeEach(module('<%= modulename %>'));

  var <%= classname %>Ctrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller) {
    scope = {};
    <%= classname %>Ctrl = $controller('<%= classname %>Ctrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function() {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
