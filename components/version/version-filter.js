/* Example filter */

angular.module('donuts').
  filter('interpolate', function(version) {
        'use strict';

        return function(text) {
            return String(text).replace(/\%VERSION\%/mg, version);
        };
    });
