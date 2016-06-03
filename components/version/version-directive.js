/* Example directive */

angular.module('donuts').directive('appVersion', function(version) {
    'use strict';

    return function(scope, elem) {
        elem.text(version);
    };
});
