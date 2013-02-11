'use strict';

function <%= classname %>Ctrl($scope) {
    $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Testacular'
    ];
}

angular.module('<%= modulename %>').controller(<%= classname %>Ctrl);
