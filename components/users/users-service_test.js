var assert = chai.assert;

describe('Users Service', function () {

    it('should be correctly defined', function(){
        var $injector = angular.injector(['donuts'])
            , user = $injector.get('User');

        assert.isDefined(user);
        assert.isFunction(user.get);
        assert.isFunction(user.update);
        assert.isFunction(user.save);
        assert.isFunction(user.query);
    });

    it('should return an array of objects for query', function (done){
        var $injector = angular.injector(['donuts'])
            , user = $injector.get('User')
            , query;

        query = user.query(function(){
          assert.isArray(query);
          assert.isObject(query[0]);
          done();
        });
    });
});
