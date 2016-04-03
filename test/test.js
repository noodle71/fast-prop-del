var lib = require("../");
var propDel = lib.propDel;
var turnToFastProp = lib.turnToFastProp;
var propAdd = lib.propAdd;
var assert = require("chai").assert;
var colors = require('colors');

// Create sample objects
var obj1 = function(){
  return {
    'bar': 1
  };
};
var obj2 = function(){
  return {
    'bar': {
      'foo': 'bar'
    }
  };
};
var obj3 = function(){
  return {
    '0': 0
  };
};
var obj4 = function(){
  return {
    'a': 'a',
    'b': 'b',
    'c': 'c',
    'd': 'd'
  };
};

var obj;
console.info('\n');
console.info('Running Mocha tests:'.underline.inverse);

describe('Turning objects to fast property mode. ', function() {

  describe('Removing object property forcing fast property mode. ', function () {

    it('Should throw an error when object is null. ', function () {
      var fun = function(){
        propDel(null, 'bar');
      };
      assert.throws(fun, Error, "Invalid object");
    });

    it('Should not throw an error when property is null. ', function () {
      obj = obj1();
      propDel(obj, null);
      assert.property(obj, 'bar');
      assert.isTrue(%HasFastProperties(obj));

      obj = obj1();
      propDel(obj);
      assert.property(obj, 'bar');
      assert.isTrue(%HasFastProperties(obj));
    });

    it('Should remove an existing property.', function () {
      obj = obj1();
      propDel(obj, 'bar');
      assert.notProperty(obj, 'bar');
      assert.isTrue(%HasFastProperties(obj));
    });

    it('Should do nothing trying to remove a property of an empty object.', function () {
      obj = obj1();
      propDel(obj, 'baar');
      assert.notProperty(obj, 'baar');
      assert.isTrue(%HasFastProperties(obj));
    });

    it('Should do nothing trying to remove a non existing property.', function () {
      obj = obj1();
      propDel(obj, 'baar');
      assert.notProperty(obj, 'baar');
      assert.property(obj, 'bar');
      assert.isTrue(%HasFastProperties(obj));
    });

    it('Should remove a property nested inside any other property.', function () {
      obj = obj2();
      propDel(obj.bar, 'foo');
      assert.notProperty(obj.bar, 'foo');
      assert.isTrue(%HasFastProperties(obj));
    });

    it('Should remove a property named 0.', function () {
      obj = obj3();
      propDel(obj, 0);
      assert.notProperty(obj, 0);
      assert.isTrue(%HasFastProperties(obj));
    });

    it('Should remove a property named 0 of an array and length should be the same.', function () {
      obj = [1];
      propDel(obj, 0);
      assert.isUndefined(obj[0]);
      assert.lengthOf(obj, 1, 'array has length of 1');
      assert.isTrue(%HasFastProperties(obj));
    });

  });

  describe('Removing several object properties forcing fast property mode. ', function () {
    it('Should remove several properties.', function () {
      obj = obj4();
      propDel(obj, ['a', 'b', 'c']);
      assert.notProperty(obj, 'a');
      assert.notProperty(obj, 'b');
      assert.notProperty(obj, 'c');
      assert.isTrue(%HasFastProperties(obj));
    });

    it('Should do nothing trying to remove several non existing properties.', function () {
      obj = obj4();
      propDel(obj, ['a', 'bar1', 'bar2']);
      assert.notProperty(obj, 'a');
      assert.notProperty(obj, 'bar1');
      assert.notProperty(obj, 'bar2');
      assert.property(obj, 'b');
      assert.property(obj, 'c');
      assert.property(obj, 'd');
      assert.isTrue(%HasFastProperties(obj));
    });

  });

  describe('Checking object fast property mode. ', function () {

    it('Should convert an object to fast property mode.', function () {
      obj = obj2();
      assert.isTrue(%HasFastProperties(obj));
      delete obj.bar;
      assert.isNotTrue(%HasFastProperties(obj));
      turnToFastProp(obj);
      assert.isTrue(%HasFastProperties(obj));
    });

  });

  describe('Adding a property to an object forcing fast property mode. ', function () {

    it('Should throw an error when object is null.', function () {
      var fun = function(){
        propAdd(null, 'bar', 'bar');
      };
      assert.throws(fun, Error, "Invalid object");
    });

    it('Should not throw an error when property is null or undefined.', function () {
      obj = obj1();
      propAdd(obj, null);
      assert.property(obj, 'bar');

      obj = obj1();
      propAdd(obj);
      assert.property(obj, 'bar');
      assert.isTrue(%HasFastProperties(obj));
    });

    it('Should add a property to an object.', function () {
      obj = obj1();
      propAdd(obj, 'bar2', 'foo2');
      assert.property(obj, 'bar2');
      assert.isTrue(%HasFastProperties(obj));
    });

    it('Should add a property to an object with a null or undefined value.', function () {
      obj = obj1();
      propAdd(obj, 'bar2');
      assert.property(obj, 'bar2');
      assert.isTrue(%HasFastProperties(obj));
    });

  });

  describe('Adding several properties to an object forcing fast property mode. ', function () {

    it('Should add properties of another object into base object (Mix objects).', function () {
      obj = obj1();
      var objToMix = {
        'a': 'a',
        'b': null,
        'c': 0,
        'd': ''
      };
      propAdd(obj, objToMix);
      assert.property(obj, 'a');
      assert.property(obj, 'b');
      assert.property(obj, 'c');
      assert.property(obj, 'd');
      assert.isTrue(%HasFastProperties(obj));
    });

    it('Should do nothing trying to add properties of an empty object.', function () {
      obj = obj1();
      var objToMix = {};
      propAdd(obj, objToMix);
      assert.property(obj, 'bar');
      assert.isTrue(%HasFastProperties(obj));
    });

  });

});
