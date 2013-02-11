'use strict';

function <%= camelname %>Service() {
    // AngularJS will instantiate a singleton by calling "new" on this function
}

angular.module('<%= modulename %>').service('<%= camelname %>', <%= camelname %>Service);
