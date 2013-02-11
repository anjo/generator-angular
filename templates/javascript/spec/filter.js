'use strict';

describe('Filter: <%= camelname %>', function() {

  // load the filter's module
  beforeEach(module('<%= modulename %>'));

  // initialize a new instance of the filter before each test
  var <%= camelname %>;
  beforeEach(inject(function($filter) {
    <%= camelname %> = $filter('<%= camelname %>');
  }));

  it('should return the input prefixed with "<%= camelname %> filter:"', function() {
    var text = 'angularjs';
    expect(<%= camelname %>(text)).toBe('<%= camelname) %> filter: ' + text);
  });

});
