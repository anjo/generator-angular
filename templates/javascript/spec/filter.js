'use strict';

describe('Filter: <%= camelname %>', function() {

    beforeEach(module('<%= modulename %>'));

    var <%= camelname %>;
    beforeEach(inject(function($filter) {
        <%= camelname %> = $filter('<%= camelname %>');
    }));

    it('should return the input prefixed with "<%= camelname %> filter:"', function() {
        var text = 'angularjs';
        expect(<%= camelname %>(text)).toBe('<%= camelname) %> filter: ' + text);
    });

});
