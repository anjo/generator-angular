'use strict';

describe('Directive: <%= camelname %>', function() {

    beforeEach(module('<%= modulename %>'));

    var element;

    it('should make hidden element visible', inject(function($rootScope, $compile) {
        element = angular.element('<<%= directivename %>></<%= directivename %>>');
        element = $compile(element)($rootScope);
        expect(element.text()).toBe('this is the <%= camelname %> directive');
    }));
});
