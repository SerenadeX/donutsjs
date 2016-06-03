/* Declare app module that has dependency on ngResource */
angular.module('donuts', ['ngResource', 'ngRoute', 'ngMockE2E', 'spring-security-csrf-token-interceptor'])
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $location){
        'use strict';

        $location.html5Mode(true);
        //setup URL routes
        $routeProvider.when('/users', {templateUrl: 'components/users/users-template.html', controller: 'UserController'});
        $routeProvider.when('/version', {templateUrl: 'components/version/version-template.html', controller: 'VersionController'});
        $routeProvider.otherwise({redirectTo: '/'});
      }])

    //Everything below this is to stub out a bogus backend so you can get this up and
    //  running really easily without an application server
    .run(function($httpBackend){
        'use strict';

        var users = [
                    {name: 'Frodo', id: 1}
                    , {name: 'Samwise', id: 2}
                    , {name: 'Merry', id: 3}
                    , {name: 'Pippin', id: 4}
                  ]
            , getUser = function(id){
                var i = 0;

                for(i = 0; i < users.length; i++){
                    if(users[i].id === id){
                        return users[i];
                    }
                }
            };

        //pass through template requests
        $httpBackend.whenGET(/^\/components/).passThrough();

        $httpBackend.whenGET('user').respond(users);
        $httpBackend.whenPUT(/^\/user\/[0-9]/).respond(function(method, url , dataIn){
            var data = angular.fromJson(dataIn)
                , user = getUser(data.id);

            user.name = data.name;

            return user;
        });

        //this passes through any template requests... obey the naming
        //  convention dawg.
        $httpBackend.whenGET(/\-template\.html$/).passThrough();
    });
