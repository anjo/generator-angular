'use strict';

angular.module('<%= _.camelize(appname) %>App', ['templates']);

angular.module('<%= _.camelize(appname) %>App').config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            redirectTo: '/main'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);
