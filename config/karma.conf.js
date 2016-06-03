module.exports = function (config) {
    'use strict';

    config.set({
        basePath: '../',

        files: [
          //source files
          'lib/angular/angular.min.js',
          'lib/angular-resource/angular-resource.min.js',
          'lib/angular-route/angular-route.min.js',
          'lib/angular-mocks/angular-mocks.js',
          'lib/spring-security-csrf-token-interceptor/src/spring-security-csrf-token-interceptor.js',

          //main app module
          'app.js',

          //everything else
          'components/**/*.js',
          'build/generated/ngtemplates.js'
        ],

        browsers: ['PhantomJS'],
        frameworks: ['mocha', 'chai'],
        reporters: ['spec'],
        port: 9876,
        colors: true,
        autoWatch: true
    });
};
