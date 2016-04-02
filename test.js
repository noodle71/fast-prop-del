var propDel = require("./");
var assert = require("chai").assert;

// Example objects
var obj1 = function(){return {'bar': 1}};
var obj2 = function(){return {'bar': 'foo'}};
var obj3 = function(){return {'bar': {'foo': 'bar'}}};

assert.notProperty(propDel(obj1(), 'bar'), 'bar');
assert.property(propDel(obj1(), 'baar'), 'bar');

assert.notProperty(propDel(obj2(), 'bar'), 'bar');
assert.property(propDel(obj2(), 'baar'), 'bar');

assert.notProperty(propDel({}, 'bar'), 'bar');

assert.property(propDel(obj3(), 'bar.foo'), 'bar');
assert.property(propDel(obj3(), 'bar.foo').bar, 'foo');

assert.notProperty(propDel(obj3().bar, 'foo'), 'foo');
assert.property(propDel(obj3().bar, 'bar'), 'foo');

assert.equal(propDel(obj1(), 'bar')['bar'], null);
assert.equal(propDel(obj2(), 'bar')['bar'], null);
assert.equal(propDel(obj3().bar, 'foo')['foo'], undefined)

//Main difference:
var before = 'Object has fast properties before ';
var after = 'Object has fast properties before ';
console.info('Testing fast properties');

var notFastProperties = obj1();
console.info(before + 'delete', %HasFastProperties(notFastProperties));
delete notFastProperties.bar;
console.info(after + 'delete', %HasFastProperties(notFastProperties));

var fastProperties = obj1();
console.info(before + 'propDel', %HasFastProperties(fastProperties));
propDel(fastProperties, 'bar');
console.info(after + 'propDel', %HasFastProperties(fastProperties));
