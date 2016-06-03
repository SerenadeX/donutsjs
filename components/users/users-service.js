/* user service */
angular.module('donuts').factory('User', function($resource){
    'use strict';

    return $resource('user/:id', {id: '@id'}, {
        //Angular does a POST by default for create and update
        //this adds an $update method that will do a PUT
        update: {method: 'PUT'}
    });
});
