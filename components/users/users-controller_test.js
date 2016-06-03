var assert = chai.assert;

describe('User Controller', function () {
    beforeEach(module('donuts'));

    it('should have a save all function', inject(function($rootScope, $controller){
        var scope = $rootScope.$new()
            , ctrl = $controller('UserController', {$scope: scope});


        assert.isFunction(scope.saveAll);
    }));
});
