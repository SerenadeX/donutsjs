var assert = chai.assert;

describe('Version Controller Tests', function(){
  beforeEach(module('donuts'));

  it('Should be defined', inject(function ($rootScope, $controller) {
    var scope = $rootScope.$new()
        , ctrl = $controller('VersionController', {$scope: scope});

    assert.isDefined(ctrl);
  }));

  it('should compute longestName property', inject(function ($rootScope, $controller) {
    var scope = $rootScope.$new()
        , ctrl = $controller('VersionController', {$scope: scope});

    assert.isFunction(scope.longestName);
    assert.strictEqual(scope.longestName(), 'Jimmies');
    scope.people.push('Jimmyjim');
    assert.strictEqual(scope.longestName(), 'Jimmyjim');
  }));

  it('Should have an array called people', inject(function ($rootScope, $controller) {
    var scope = $rootScope.$new()
        , ctrl = $controller('VersionController', {$scope: scope});

    assert.isArray(scope.people);
  }));

  it('Should let us pass in whatever we like', inject(function ($rootScope, $controller) {
    var scope = $rootScope.$new()
        , versionNumber =  '9.9.9'
        , ctrl = $controller('VersionController', {$scope: scope, version: versionNumber});

    assert.isDefined(scope.version);
    assert.strictEqual(scope.version, versionNumber + '!');
  }));
});
