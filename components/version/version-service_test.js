var assert = chai.assert;

describe('version service', function(){
    beforeEach(module('donuts'));

    it('should return current version', inject(function($rootScope) {
        var $injector = angular.injector(['donuts'])
            , version = $injector.get('version');

        assert.strictEqual(version, '0.3.0');
    }));
});
