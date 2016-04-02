var lib = require("../");
var propDel = lib.propDel;
var turnToFastProp = lib.turnToFastProp;
var propAdd = lib.propAdd;
var assert = require("chai").assert;

// Create sample objects
var obj1 = function(){return {'bar': 1}};
var obj2 = function(){return {'bar': {'foo': 'bar'}}};
var obj3 = function(){return {'0': 0}};

var obj;
console.info('\n');
console.info('Running Mocha tests:');

describe('Turning objects to fast property mode', function() {

  describe('Removing object property forcing fast property mode', function () {

    it('should remove a property', function () {
      obj = obj1();
      propDel(obj, 'bar');
      assert.notProperty(obj, 'bar');
      assert.isTrue(%HasFastProperties(obj));
    });

    it('should not remove a non existing property', function () {
      obj = obj1();
      propDel(obj, 'baar');
      assert.property(obj, 'bar');
      assert.isTrue(%HasFastProperties(obj));
    });

    it('should remove a property nested inside any other property', function () {
      obj = obj2();
      propDel(obj.bar, 'foo');
      assert.notProperty(obj.bar, 'foo');
      assert.isTrue(%HasFastProperties(obj));
    });

    it('should remove a property named 0', function () {
      obj = obj3();
      propDel(obj, 0);
      assert.notProperty(obj, 0);
      assert.isTrue(%HasFastProperties(obj));
    });

  });

  describe('Checking object fast property mode', function () {

    it('should convert an object to fast property mode', function () {
      obj = obj2();
      assert.isTrue(%HasFastProperties(obj));
      delete obj.bar;
      assert.isNotTrue(%HasFastProperties(obj));
      turnToFastProp(obj);
      assert.isTrue(%HasFastProperties(obj));
    });

  });

  describe('Adding a property to an object forcing fast property mode', function () {

    it('should add a property to a object', function () {
      obj = obj1();
      propAdd(obj, 'bar2', 'foo2');
      assert.property(obj, 'bar2');
      assert.isTrue(%HasFastProperties(obj));
    });

  });

});
