'use strict';

function <%= camelname %>Directive() {
    return {
        template: '<div></div>',
        templateUrl: '<%= viewfilename %>',
        restrict: 'AE',
        link: function (scope, element, attrs) {
            element.text('this is the <%= camelname %> directive');
        }
    };
}

angular.module('<%= modulename %>').directive('<%= camelname %>', <%= camelname %>Directive);
