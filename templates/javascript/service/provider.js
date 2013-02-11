'use strict';

function <%= camelname %>Provider() {

    // Private variables
    var salutation = 'Hello';

    // Private constructor
    function Greeter() {
        this.greet = function() {
            return salutation;
        };
    }

    // Public API for configuration
    this.setSalutation = function(s) {
        salutation = s;
    };

    // Method for instantiating
    this.$get = function() {
        return new Greeter();
    };
}

angular.module('<%= modulename %>').provider('<%= camelname %>', <%= camelname %>Provider);
