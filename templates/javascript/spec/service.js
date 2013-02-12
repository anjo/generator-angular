'use strict';

describe('Service: <%= camelname %>', function () {

    beforeEach(module('<%= modulename %>'));

    var <%= camelname %>;
    beforeEach(inject(function(_<%= camelname %>_) {
        <%= camelname %> = _<%= camelname %>_;
    }));

    it('should do something', function () {
        expect(!!<%= camelname %>).toBe(true);
    });

});
