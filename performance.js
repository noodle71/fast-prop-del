var propDel = require("./");

function getLargeObj(){
  return {
    'a':'',
    'b':'',
    'c':'',
    'd':'',
    'e':'',
    'f':'',
    'g':'',
    'h':'',
    'i':'',
    'j':'',
    'k':'',
    'l':'',
    'm':'',
    'n':'',
    'a':'',
    'o':'',
    'p':'',
    'q':'',
    'r':'',
    's':'',
    't':'',
    'u':'',
    'v':'',
    'w':'',
    'x':'',
    'y':'',
    'z':'',
    'zz': ''
  };
}

function iterateProps(obj){
  for(var k in obj){
    obj[k] = k;
  }
}

function test(iterations, obj, testName){
  console.time(testName);
  while (iterations--) {
    iterateProps(obj);
  }
  console.timeEnd(testName);
}

var dictionary = getLargeObj();
var fastProp = getLargeObj();
var normalObject = getLargeObj();
delete dictionary.zz;
fastProp = propDel(fastProp,'zz');

console.info(
  '\n',
  'Object dictionary has fast properties: ', %HasFastProperties(dictionary),
  '\n',
  'Object fastProp has fast properties: ', %HasFastProperties(fastProp),
  '\n'
);

var testIterations = 100000;
test(testIterations, dictionary, 'Iterate dictionary');
test(testIterations, fastProp, 'Iterate fastProp');
