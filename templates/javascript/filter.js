'use strict';

function <%= camelname %>Filter() {
    return function(input) {
        return '<%= camelname %> filter: ' + input;
    };
}

angular.module('<%= modulename %>').filter('<%= camelname %>', <%= camelname %>Filter);

