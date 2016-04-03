var propDel = require("../").propDel;
var colors = require('colors');

function getLargeObj(){
  return {
    'a':'',
    'b':'',
    'c':'',
    'd':''
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
delete dictionary.d;
propDel(fastProp,'d');

console.info('Running performance test:'.underline.inverse);

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

function testAddPropTillDictionary(obj){
  var i = 0;
  var str;
  while(%HasFastProperties(obj)){
    i++;
    str = getRandomString();
    obj[str]=[str]
  }
  return i;
}

//From: http://stackoverflow.com/questions/1349404/generate-a-string-of-5-random-characters-in-javascript
function getRandomString(b){
  for(var a=(Math.random()*eval("1e"+~~(50*Math.random()+50))).toString(36).split(""),c=3;c<a.length;c++)c==~~(Math.random()*c)+1&&a[c].match(/[a-z]/)&&(a[c]=a[c].toUpperCase());a=a.join("");a=a.substr(~~(Math.random()*~~(a.length/3)),~~(Math.random()*(a.length-~~(a.length/3*2)+1))+~~(a.length/3*2));if(24>b)return b?a.substr(a,b):a;a=a.substr(a,b);if(a.length==b)return a;for(;a.length<b;)a+=epicRandomString();return a.substr(0,b);
}

console.info('\n');
console.info('Number of keys added to an object till it converts into dictionary mode:'.underline.inverse);

console.info(
  '\n',
  'Empty object needs ' + testAddPropTillDictionary({}) + ' properties to convert into dictionary mode',
  '\n'
);
