var assert = chai.assert;

describe('version filter tests', function () {
  beforeEach(module('donuts'));

  it('should replace %VERSION% in a string with the version number', inject(function ($filter, $injector) {
      var filter = $filter('interpolate')
          , version = $injector.get('version');

      assert.isDefined(filter);
      assert.strictEqual(filter('%VERSION%'), version);
      assert.strictEqual(filter('This is the %VERSION%'), 'This is the ' + version);
      assert.strictEqual(filter('%VERSION% is the version'), version + ' is the version');
      assert.strictEqual(filter('Some %VERSION% is the version'), 'Some ' + version + ' is the version');
  }));
});
