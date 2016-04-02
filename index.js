module.exports = propDel;

function propDel (obj, prop) {
  function f(){};
  if (obj && (prop || prop == 0) && prop in obj) {
    obj[prop] = null;
    delete obj[prop];
    f.prototype = obj;
  }
  return obj;
}
