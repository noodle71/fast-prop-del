## fast-prop-del

Fast property delete.

With this library you can delete object properties and then turn the object to fast property mode. Aditionally, you can turn common objects to fast property mode or add new properties to an object forcing the object to be fast property mode.

In v8 engine an object has two ways of representation:
+ Dictionary mode (also known as normalized objects)
+ Fast property mode

### How do I know if an object is Dictionary or Fast property mode?

When you use your object as if it was a hash table your object may turn to dictionary mode. For example, when you add several properties dinamically or when you delete a property.

This makes the object have worse performance inside for-in loops.

You can learn more:
+ [ref 1](https://stackoverflow.com/questions/24987896/how-does-bluebirds-util-tofastproperties-function-make-an-objects-properties/24989927#24989927)
+ [ref 2](https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#52-the-object-being-iterated-is-not-a-simple-enumerable)
+ [ref 3](http://stackoverflow.com/questions/23455678/pros-and-cons-of-dictionary-mode)
+ [ref 4](http://s3.mrale.ph/nodecamp.eu/#1)
+ [ref 5](http://s3.mrale.ph/jsconf2012.pdf)

You can try the performance using as example performance.js

+ Iterate dictionary: 57ms
+ Iterate fastProp: 9ms

6 times faster!

---

## Install

```bash
$ npm install fast-prop-del
```
---

## Test

```bash
$ npm install
$ npm test
```
---

## Check performance

```bash
$ npm install
$ node --allow-natives-syntax test/performance.js
```
---

## Usage

### Remove property

```js
propDel = require('fast-prop-del').propDel;

var obj = {'bar': 'foo'};
propDel(obj, 'bar');
// obj => {}

var obj = {'bar': {'foo': 'bar'}};
propDel(obj.bar, 'foo');
// obj => {'bar': null}
```

### Turn object to fast properties

```js
propDel = require('fast-prop-del').turnToFastProp;

var obj = {'bar': 'foo'};
delete obj.bar;
turnToFastProp(obj);
```
### Adding properties turning object to fast properties

```js
propAdd = require('fast-prop-del').propAdd;

var obj = {'bar': 'foo'};
propAdd(obj, 'bar2', 'foo2');
// obj => {'bar': 'foo', 'bar2': 'foo2'}
```
