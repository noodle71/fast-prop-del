module.exports = {
  'propDel': propDel,
  'turnToFastProp': turnToFastProp,
  'propAdd': propAdd
};

function removeProp(obj, prop){
  if(prop in obj){
    obj[prop] = null;
    delete obj[prop];
  }
}

function propDel (obj, prop) {
  if (obj != null) {
    if(Array.isArray(prop)){//Removes a list of properties
      var i = prop.length;
      while (i--) {
        removeProp(obj, prop[i]);
      }
    }else{//Removes a single property
      removeProp(obj, prop);
    }
    turnToFastProp(obj);
  } else throw new Error('Invalid object');
}

function propAdd (obj, prop, val) {
  if (obj != null) {
    if(typeof prop == 'object' && prop != null){//Mix two objects
      for(var k in prop){
        if(prop.hasOwnProperty(k)) obj[k] = prop[k];
      }
    }else{//Add one property
      obj[prop] = val;
    }
    turnToFastProp(obj);
  } else throw new Error('Invalid object');
}

function turnToFastProp(obj){
  function f(){};
  f.prototype = obj;
  return obj;
}
