'use strict';

describe('Service: <%= camelname %>', function () {

  // load the service's module
  beforeEach(module('<%= modulename %>'));

  // instantiate service
  var <%= camelname %>;
  beforeEach(inject(function(_<%= camelname %>_) {
    <%= camelname %> = _<%= camelname %>_;
  }));

  it('should do something', function () {
    expect(!!<%= camelname %>).toBe(true);
  });

});
