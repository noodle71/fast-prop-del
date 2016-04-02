## fast-prop-del

Fast property delete.

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

+ Iterate dictionary: 260ms
+ Iterate fastProp: 71ms

Almost 4 times faster

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
$ node --allow-natives-syntax performance.js
```
---

## Usage

```js
propDel = require('fast-prop-del')

propDel({'bar': 'foo'}, 'bar');
// => {}

propDel(({'bar': {'foo': 'bar'}}).bar, 'foo');
// => {'bar': null}
