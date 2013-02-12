'use strict';

angular.module('<%= _.camelize(appname) %>App', [])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
        .when('/', {
            templateUrl: 'scripts/views/main/main.html',
        controller: 'MainCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
  }]);
