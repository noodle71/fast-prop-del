module.exports = {
  'propDel': propDel,
  'turnToFastProp': turnToFastProp,
  'propAdd': propAdd
};

function propDel (obj, prop) {
  if (obj && (prop || prop == 0) && prop in obj) {
    obj[prop] = null;
    delete obj[prop];
    turnToFastProp(obj);
  }
}

function propAdd (obj, prop, val) {
  if (obj && (prop || prop == 0)) {
    obj[prop] = val;
    turnToFastProp(obj);
  }
}

function turnToFastProp(obj){
  function f(){};
  f.prototype = obj;
  return obj;
}
